import {
  getAllProducts,
  getHighestPricedProduct,
} from "@/app/actions/product.action";
import ProductList from "./_components/product-list";
import { getAllBrand } from "@/app/actions/brand.action";
import { getMyCart } from "@/app/actions/cart.actions";

export async function generateMetadata(props: {
  searchParams: Promise<{
    query: string;
    brand: string;
    price: string;
  }>;
}) {
  const {
    query = "all",
    brand = "all",
    price = "all",
  } = await props.searchParams;

  const isQuerySet = query && query !== "all" && query.trim() !== "";
  const isBrandSet = brand && brand !== "all" && brand.trim() !== "";
  const isPriceSet = price && price !== "all" && price.trim() !== "";

  if (isQuerySet || isBrandSet || isPriceSet) {
    return {
      title: `
      Search NGN{isQuerySet ? query : ''} 
      ${isBrandSet ? `: Brand NGN{brand}` : ""}
      ${isPriceSet ? `: Price NGN{price}` : ""}`,
    };
  } else {
    return {
      title: "Our Products",
    };
  }
}

export default async function ProductsPage(props: {
  searchParams: Promise<{
    page: string;
    query: string;
    brand: string;
    price: string;
    sort?: string;
  }>;
}) {
  const {
    query = "all",
    brand = "all",
    price = "all",
    sort = "newest",
    page = "1",
  } = await props.searchParams;

  const getFilterUrl = ({
    b,
    p,
    s,
    pg,
  }: {
    b?: string;
    p?: string;
    s?: string;
    pg?: string;
  }) => {
    const params = { query, brand, price, sort, page };

    if (b) params.brand = b;
    if (p) params.price = p;
    if (s) params.sort = s;
    if (pg) params.page = pg;

    return `/products?${new URLSearchParams(params).toString()}`;
  };

  const products = await getAllProducts({
    query,
    page: Number(page),
    brand,
    price,
    sort: sort as "newest" | "lowest" | "highest",
  });

  const brandList = (await getAllBrand()).data;

  const cart = await getMyCart();

  const allBrandList = [...(brandList?.map((item) => item.name) ?? [])];

  const sortList = ["newest", "lowest", "highest"];

  const highestPrice = (await getHighestPricedProduct()) ?? 0;

  const priceList = Array.from({ length: 5 }, (_, index) => {
    const base = 1000;
    const min = base * 5 ** index;
    const max = min * 5;

    if (min > highestPrice) return null;

    return { label: `NGN${min} - NGN${max}`, value: `${min}-${max}` };
  }).filter(Boolean) as { label: string; value: string }[];
  return (
    <section className="min-h-screen ">
      {/* Header */}
      <div className=" border-b ">
        <div className="max-content padding-x py-20">
          <div className="text-center mb-8">
            <h1 className="font-serif text-4xl font-bold text-charcoal mb-4">
              Our Fragrances
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover our complete collection of luxury perfumes, each crafted
              with the finest ingredients.
            </p>
          </div>
        </div>
      </div>
      <div className="max-content padding-x py-20">
        <ProductList products={products?.data ?? []} brands={allBrandList} />
      </div>
    </section>
  );
}
