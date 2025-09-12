/* eslint-disable @typescript-eslint/no-explicit-any */
import AdminDashboard from "./_components/dashboard";
import { getOrderSummary } from "@/app/actions/order.actions";
import { requireAdmin } from "@/services/auth-guard";

interface OrderSummary {
  ordersCount: number;
  productsCount: number;
  usersCount: number;
  totalSales: { _sum: { totalPrice: number } };
  latestSales: Array<{
    id: string;
    totalPrice: number;
    isPaid: boolean;
    paymentMethod: string;
    createdAt: Date; // Changed from string to Date
    user: any;
  }>;
  recentOrders: Array<{
    id: string;
    totalPrice: number;
    isPaid: boolean;
    paymentMethod: string;
    createdAt: Date; // Changed from string to Date
    user: any;
  }>;
  topProducts: Array<{
    id: string;
    name: string;
    price: number;
    images: string[];
  }>;
  salesData?: any; // Added optional salesData property that appears in actual data
}

const page = async () => {
  await requireAdmin();

  const summary = await getOrderSummary();

  const mappedSummary: OrderSummary = {
    ...summary,
    totalSales: {
      ...summary.totalSales,
      _sum: {
        ...summary.totalSales._sum,
        totalPrice: summary.totalSales._sum.totalPrice ?? 0,
      },
    },
  };

  console.log("Mapped Summary:", mappedSummary);

  return <AdminDashboard summary={mappedSummary} />;
};

export default page;
