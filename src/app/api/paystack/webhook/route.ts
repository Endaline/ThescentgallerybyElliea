import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { paystack } from "@/services/paystack";
import { prisma } from "@/app/db/prismadb";

export async function POST(req: NextRequest) {
  const secret = process.env.PAYSTACK_SECRET_KEY!;
  const body = await req.text(); // must be raw text
  const signature = req.headers.get("x-paystack-signature");

  // ✅ Verify webhook signature
  const hash = crypto.createHmac("sha512", secret).update(body).digest("hex");

  if (hash !== signature) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  const event = JSON.parse(body);

  if (event.event === "charge.success") {
    const reference = event.data.reference;

    // ✅ Double-check with Paystack (important!)
    const payment = await paystack.verifyPayment(reference);

    if (payment.status && payment.data.status === "success") {
      const orderId = payment.data.metadata?.orderId;
      console.log("payment", payment);

      if (orderId) {
        try {
          await prisma.$transaction(async (tx) => {
            // Deduct stock sequentially
            const order = await tx.order.findUnique({
              where: { id: orderId },
              include: { orderitems: true },
            });

            if (!order) throw new Error("Order not found");

            if (!order.isPaid) {
              for (const item of order.orderitems) {
                await tx.product.update({
                  where: { id: item.productId },
                  data: { stock: { decrement: item.qty } },
                });
              }

              await tx.order.update({
                where: { id: orderId },
                data: {
                  isPaid: true,
                  paidAt: new Date(),
                  paymentResult: {
                    id: payment.data.reference,
                    status: "COMPLETED",
                    email_address: payment.data.customer.email,
                    pricePaid: (payment.data.amount / 100).toString(),
                  },
                },
              });
            }
          });
        } catch (err) {
          console.error("DB update error:", err);
          return NextResponse.json(
            { error: "Database update failed" },
            { status: 500 }
          );
        }
      }
    }
  }

  return NextResponse.json({ received: true }, { status: 200 });
}
