"use server";

import { formatError } from "@/lib/utils";
import { prisma } from "@/app/db/prismadb";
import { revalidatePath } from "next/cache";
import { Prisma, ProductImage } from "@prisma/client";
import { MainProduct } from "@/lib/types/type";

export async function createProduct(data: MainProduct) {
  try {
    const {
      name,
      slug,
      brand,
      description,
      stock,
      price,
      img,
      baseNotes,
      concentration,
      dimensions,
      featured,
      limitedEdition,
      longevity,
      middleNotes,
      newArrival,
      originalPrice,
      shortDescription,
      sillage,
      sku,
      status,
      topNotes,
      volume,
      weight,
    } = data;

    let images: ProductImage[] = [];

    if (img.length > 0) {
      images = await Promise.all(
        img.map(
          async (el) =>
            await prisma.productImage.create({
              data: { key: el.key, name: el.imageName, url: el.image },
            })
        )
      );
    }

    await prisma.product.create({
      data: {
        name,
        slug,
        brandId: brand,
        description,
        stock: Number(stock),
        price: Number(price),
        baseNotes,
        concentration,
        dimensions,
        featured,
        limitedEdition,
        longevity,
        middleNotes,
        newArrival,
        originalPrice: Number(originalPrice),
        shortDescription,
        sillage,
        sku,
        status,
        topNotes,
        volume,
        weight,
        images,
      },
    });

    revalidatePath("/auth/products");

    return {
      success: true,
      message: "Product created successfully",
    };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}

export async function checkIfSlugExists(slug: string) {
  const product = await prisma.product.findUnique({ where: { slug } });

  if (product) {
    throw new Error("Slug already exists");
  }
}

interface GetAllProductsParams {
  query?: string;
  limit?: number;
  page?: number;
  brand?: string;
  price?: string;
  sort?: "lowest" | "highest" | "newest";
}

export async function getAllProducts({
  query = "",
  limit = 10,
  page = 1,
  brand,
  price,
  sort = "newest",
}: GetAllProductsParams) {
  try {
    const filters: Prisma.ProductWhereInput = {};

    // Search filter
    if (query && query !== "all") {
      filters.name = {
        contains: query,
        mode: "insensitive",
      };
    }

    // brand filter
    if (brand && brand !== "all") {
      filters.brand = {
        is: {
          name: {
            equals: brand,
            mode: "insensitive",
          },
        },
      };
    }

    // Price filter
    if (price && price !== "all") {
      const [min, max] = price.split("-").map(Number);
      filters.price = {
        gte: min,
        lte: max,
      };
    }

    // Rating filter
    // if (rating && rating !== "all") {
    //   filters.rating = {
    //     gte: Number(rating),
    //   };
    // }

    // Sorting
    let orderBy: Prisma.ProductOrderByWithRelationInput = { createdAt: "desc" };

    switch (sort) {
      case "lowest":
        orderBy = { price: "asc" };
        break;
      case "highest":
        orderBy = { price: "desc" };
        break;
      default:
        orderBy = { createdAt: "desc" };
    }

    // Pagination
    const skip = (page - 1) * limit;

    const [products, totalCount] = await prisma.$transaction([
      prisma.product.findMany({
        where: filters,
        orderBy,
        skip,
        take: limit,
        include: {
          brand: {
            select: { id: true, name: true },
          },
        },
      }),
      prisma.product.count({
        where: filters,
      }),
    ]);

    const totalPages = Math.ceil(totalCount / limit);

    return {
      data: products,
      totalPages,
      currentPage: page,
      totalCount,
    };
  } catch (error) {
    console.error("[getAllProducts]", error);
    // throw new Error("Failed to fetch products.");
  }
}

export async function getAllFeaturedProducts({
  query = "",
}: {
  query?: string;
}) {
  try {
    const filters: Prisma.ProductWhereInput = {};

    if (query && query !== "all") {
      filters.name = {
        contains: query,
        mode: "insensitive",
      };
    }
    filters.featured = true;

    const products = await prisma.product.findMany({
      where: filters,
    });
    return products;
  } catch (error) {
    console.error("[getAllFeaturedProducts]", error);
    throw new Error("Failed to fetch featured products.");
  }
}

export async function getProductBySlug(slug: string) {
  return await prisma.product.findFirst({
    where: { slug: slug },
    include: {
      brand: {
        select: { id: true, name: true },
      },
    },
  });
}

export async function productCounter() {
  const [totalCount, activeCount, lowCount, outCount] =
    await prisma.$transaction([
      prisma.product.count(),
      prisma.product.count({ where: { status: "active" } }),
      prisma.product.count({
        where: {
          stock: {
            lt: 5,
          },
        },
      }),
      prisma.product.count({
        where: {
          stock: {
            lt: 0,
          },
        },
      }),
    ]);

  return {
    counts: { totalCount, activeCount, lowCount, outCount },
  };
}

export async function getHighestPricedProduct() {
  try {
    const product = await prisma.product.findFirst({
      orderBy: {
        price: "desc",
      },
    });

    if (!product) {
      throw new Error("No products found.");
    }

    return product.price;
  } catch (error) {
    console.error("[getHighestPricedProduct]", error);
  }
}

type UpdateProductType = MainProduct & {
  id: string;
};

export async function updateProduct(
  data: UpdateProductType,
  deletedImages: ProductImage[]
) {
  try {
    const {
      name,
      slug,
      brand,
      description,
      stock,
      price,
      img,
      baseNotes,
      concentration,
      dimensions,
      featured,
      limitedEdition,
      longevity,
      middleNotes,
      newArrival,
      originalPrice,
      shortDescription,
      sillage,
      sku,
      status,
      topNotes,
      volume,
      weight,
      id,
    } = data;

    const productExists = await prisma.product.findFirst({
      where: { id: id },
    });

    if (!productExists) throw new Error("Product not found");

    if (deletedImages.length > 0) {
      await prisma.productImage.deleteMany({
        where: { id: { in: deletedImages.map((img) => img.id) } },
      });
    }

    let images: ProductImage[] = [];

    if (img.length > 0) {
      images = await Promise.all(
        img.map(
          async (el) =>
            await prisma.productImage.create({
              data: { key: el.key, name: el.imageName, url: el.image },
            })
        )
      );
    }

    const getNotDeletedImages = await prisma.productImage.findMany({
      where: { id: { notIn: deletedImages.map((img) => img.id) } },
    });

    const newImages = [...getNotDeletedImages, ...images];

    await prisma.product.update({
      where: { id: id },
      data: {
        name,
        slug,
        brandId: brand,
        description,
        stock: Number(stock),
        price: Number(price),
        baseNotes,
        concentration,
        dimensions,
        featured,
        limitedEdition,
        longevity,
        middleNotes,
        newArrival,
        originalPrice: Number(originalPrice),
        shortDescription,
        sillage,
        sku,
        status,
        topNotes,
        volume,
        weight,
        images: newImages,
      },
    });

    revalidatePath("/dashboard/products");

    return {
      success: true,
      message: "Product updated successfully",
    };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}
