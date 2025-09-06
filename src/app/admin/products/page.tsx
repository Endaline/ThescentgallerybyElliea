/* eslint-disable @typescript-eslint/no-explicit-any */
import { getAllBrand } from "@/app/actions/brand.action";
import Product from "./_component/product";
import { getAllProducts, productCounter } from "@/app/actions/product.action";

export default async function AdminProductsPage(props: {
  searchParams: Promise<{
    page: string;
    name: string;
    brand: string;
  }>;
}) {
  const searchParams = await props.searchParams;

  const page = Number(searchParams.page) || 1;
  const searchText = searchParams.name || "";
  const brand = searchParams.brand || "";

  const [productsResult, brandResult, counts] = await Promise.all([
    getAllProducts({
      query: searchText,
      page,
      brand,
    }),
    getAllBrand(),
    productCounter(),
  ]);

  const products = productsResult
    ? {
        ...productsResult,
        data: productsResult.data.map((product: any) => ({
          ...product,
          // Extract brand info if needed or flatten the structure
          brandName: product.brand?.name,
          brandId: product.brandId,
          // Include all other product properties as needed
        })),
      }
    : {
        data: [],
        totalPages: 0,
        currentPage: 1,
        totalCount: 0,
      };

  const brandList = brandResult?.data || [];
  const productCounts = counts || 0;

  return (
    <Product products={products} brands={brandList} counts={productCounts} />
  );
}
