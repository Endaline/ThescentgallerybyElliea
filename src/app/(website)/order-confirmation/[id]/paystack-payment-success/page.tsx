/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from "@/app/db/prismadb";
import ConfirmationInfo from "./confirmation-info";
import { PaymentResult } from "@/lib/types/type";

export default async function PaystackSuccessPage(props: {
  params: Promise<{ id: any }>;
  searchParams: Promise<{ orderId: string }>;
}) {
  const { id } = await props.params;

  const order = await prisma.order.findUnique({
    where: { id: id },
    include: {
      orderitems: { include: { product: true } },
      user: true,
    },
  });

  if (!order) return <div>Order not found</div>;

  return (
    <div>
      <h1>Payment {order.isPaid ? "Successful ✅" : "Pending ⏳"}</h1>
      <p>Order ID: {order.id}</p>
      <ConfirmationInfo
        order={order}
        reference={""}
        paymentResult={order.paymentResult as PaymentResult}
      />
    </div>
  );
}
