import { Order, Product } from "@prisma/client";
import { CartItem } from "@/lib/validators";
import { ShippingAddressSchema } from "@/lib/validators";

type GenProduct = Product & {
  brand: {
    id: string;
    name: string;
  };
};

type GenCart = {
  items: CartItem[];
  itemsPrice: number;
  totalPrice: number;
  shippingPrice: number;
  taxPrice: number;
  id: string;
  createdAt: Date;
  userId: string | null;
  sessionCartId: string;
};

type MainBrand = {
  name: string;
};

type MainCompanyInfo = {
  storeName: string;
  storeDescription: string;
  contactEmail: string;
  supportEmail: string;
  phone: string;
  address: string;
};

type MainShipping = {
  shippingRate: number;
  taxRate: number;
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

type GenOrder = Order & {
  user: {
    name: string | null;
    email: string;
    phone: string | null;
    image: string | null;
  };
  orderitems: {
    name: string;
    id: string;
    productId: string;
    slug: string;
    qty: number;
    price: number;
    orderId: string;
    imageId: string | null;
    price: number;
  }[];
  shippingAddress: ShippingAddressSchema;
  paymentResult: PaymentResult | null;
};

type PaymentResult = {
  status: string;
  id: string;
  email_address: string;
  pricePaid: string;
};

type SalesDataType = {
  month: string;
  totalSales: number;
}[];
