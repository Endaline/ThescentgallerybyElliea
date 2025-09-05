import {
  getAllProducts,
  getHighestPricedProduct,
} from "@/app/actions/product.action";
import ProductList from "./_components/product-list";
import { getAllBrand } from "@/app/actions/brand.action";
import Hero from "./_components/hero";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
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

  const cart = await getMyCart();
  return (
    <section className="min-h-screen ">
      {/* Header */}
      <Hero />
      <div className="max-content padding-x py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <div className="md:col-span-1 w-full h-full space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="font-bold font-serif text-lg">Filters</h1>
              <Link href={"/products"}>
                <Button className="text-white hover:text-white/80 hover:bg-[#512260]/80 bg-[#512260] cursor-pointer">
                  Clear All Filters
                </Button>
              </Link>
            </div>
            <Card className="bg-slate-100 text-slate-900">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Brand</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {allBrandList.map((item, index) => {
                  return (
                    <Link
                      href={getFilterUrl({ b: item.toLowerCase() })}
                      key={index}
                      className="flex items-center space-x-2"
                    >
                      <div
                        className={cn(
                          "rounded-full border",
                          brand === item.toLowerCase()
                            ? "border-[#512260]"
                            : "border-neutral-400"
                        )}
                      >
                        <div
                          className={cn(
                            "h-2 w-2 rounded-full m-0.5",
                            brand === item.toLowerCase()
                              ? "bg-[#512260]"
                              : "bg-transparent border border-neutral-400"
                          )}
                        ></div>
                      </div>

                      <p
                        className={`text-sm hover:text-[#512260] transition-all ${
                          brand === item.toLowerCase() &&
                          "font-bold text-[#512260]"
                        }`}
                      >
                        {item}
                      </p>
                    </Link>
                  );
                })}
              </CardContent>
            </Card>
            <Card className="bg-slate-100 text-slate-900">
              <CardHeader className="">
                <CardTitle className="text-base">Price Range</CardTitle>
              </CardHeader>
              <CardContent>
                {priceList.map((item, index) => {
                  return (
                    <Link
                      href={getFilterUrl({ p: item.value })}
                      key={index}
                      className="flex items-center space-x-2"
                    >
                      <div
                        className={cn(
                          "rounded-full border",
                          price === item.value
                            ? "border-[#512260]"
                            : "border-neutral-400"
                        )}
                      >
                        <div
                          className={cn(
                            "h-2 w-2 rounded-full m-0.5",
                            price === item.value
                              ? "bg-[#512260]"
                              : "bg-transparent border border-neutral-400"
                          )}
                        ></div>
                      </div>
                      <p
                        className={`text-sm hover:text-[#512260] transition-all ${
                          price === item.value && "font-bold text-[#512260]"
                        }`}
                      >
                        {item.label}
                      </p>
                    </Link>
                  );
                })}
              </CardContent>
            </Card>
            <Card className="bg-slate-100 text-slate-900">
              <CardHeader className="">
                <CardTitle className="text-base">Sort</CardTitle>
              </CardHeader>
              <CardContent>
                {sortList.map((item, index) => {
                  return (
                    <Link
                      key={index}
                      href={getFilterUrl({ s: item.toLowerCase() })}
                      className="flex items-center space-x-2"
                    >
                      <div
                        className={cn(
                          "rounded-full border",
                          sort === item
                            ? "border-[#512260]"
                            : "border-neutral-400"
                        )}
                      >
                        <div
                          className={cn(
                            "h-2 w-2 rounded-full m-0.5",
                            sort === item
                              ? "bg-[#512260]"
                              : "bg-transparent border border-neutral-400"
                          )}
                        ></div>
                      </div>
                      <p
                        className={`text-sm hover:text-[#512260] transition-all ${
                          sort === item && "font-bold text-[#512260]"
                        }`}
                      >
                        {item}
                      </p>
                    </Link>
                  );
                })}
              </CardContent>
            </Card>
          </div>
          <ProductList
            products={products?.data ?? []}
            query={query}
            cart={cart}
          />
        </div>
      </div>
    </section>
  );
}
