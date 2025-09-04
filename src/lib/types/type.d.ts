import { Order, Product } from "@prisma/client";

type GenProduct = Product & {
  brand: {
    id: string;
    name: string;
  };
};

type MainProduct = {
  baseNotes: string[];
  brand: string;
  //   category: string;
  concentration: string;
  description: string;
  dimensions: string;
  featured: boolean;
  limitedEdition: boolean;
  longevity: string;
  middleNotes: string[];
  name: string;
  newArrival: boolean;
  originalPrice: string;
  price: string;
  shortDescription: string;
  sillage: string;
  sku: string;
  status: ProductStatus;
  stock: string;
  topNotes: string[];
  volume: string;
  weight: string;
  slug: string;
  img: {
    key: string;
    imageName: string;
    image: string;
  }[];
};

type ProductStatus = "active" | "inactive" | "draft";
