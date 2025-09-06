import { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { auth } from "@/services/auth";
import { getOrderById } from "@/app/actions/order.actions";
import OrderDetailsTable from "../_components/order-details-table";
import { ShippingAddressSchema } from "@/lib/validators";

export const metadata: Metadata = {
  title: "Order Details",
};

const OrderDetailsPage = async (props: {
  params: Promise<{
    id: string;
  }>;
}) => {
  const { id } = await props.params;

  const order = await getOrderById(id);
  if (!order) notFound();

  const session = await auth();

  // Redirect the user if they don't own the order
  if (order.userId !== session?.user.id && session?.user.role !== "admin") {
    return redirect("/unauthorized");
  }

  return (
    <OrderDetailsTable
      order={{
        ...order,
        shippingAddress: order.shippingAddress as ShippingAddressSchema,
      }}
      isAdmin={session?.user?.role === "admin" || false}
    />
  );
};

export default OrderDetailsPage;
