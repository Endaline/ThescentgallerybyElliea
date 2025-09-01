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

  const products = await getAllProducts({
    query: searchText,
    page,
    brand,
  });

  const brandList = (await getAllBrand()).data;
  const counts = await productCounter();

  console.log(products, brandList, counts);

  return <Product />;
}
