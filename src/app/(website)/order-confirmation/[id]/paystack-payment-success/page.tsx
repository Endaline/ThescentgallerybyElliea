import { getOrderById } from "@/app/actions/order.actions";
import { prisma } from "@/app/db/prismadb";
import { Button } from "@/components/ui/button";
import { PaymentResult } from "@/lib/types/type";
import { ShippingAddressSchema } from "@/lib/validators";
import { sendPurchaseReceipt } from "@/services/email";
import { paystack } from "@/services/paystack";
import { motion } from "framer-motion";
import { Check, CheckCircle } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import ConfirmationInfo from "./confirmation-info";

const PaystackSuccessPage = async ({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: Promise<{ reference?: string }>;
}) => {
  const { id } = await params;
  const { reference } = await searchParams;

  // Fetch order
  const order = await getOrderById(id);
  if (!order) notFound();

  if (!reference) {
    return (
      <div className="bg-gray-100 dark:bg-ligth-main">
        <div className="page-wrapper py-40 ">
          <div className="max-w-2xl mx-auto mt-8 p-6">
            <h1 className="text-2xl font-bold text-red-600 mb-4">
              Payment Error
            </h1>
            <p className="mb-4">No payment reference found.</p>
            <Button asChild>
              <Link href={`/order/${id}`}>Return to Order</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  try {
    // Verify payment with Paystack
    const paymentResult = await paystack.handleWebhook(reference);

    if (paymentResult.status === "COMPLETED") {
      // Update order in database if not already paid
      if (!order.isPaid) {
        const updatedOrder = await prisma.order.update({
          where: { id: order.id },
          data: {
            isPaid: true,
            paidAt: new Date(),
            paymentResult: paymentResult,
          },
          include: {
            orderitems: true,
            user: {
              select: { name: true, email: true, phone: true, image: true },
            },
          },
        }); // Send purchase receipt email
        await sendPurchaseReceipt({
          order: {
            ...updatedOrder,
            shippingAddress:
              updatedOrder.shippingAddress as ShippingAddressSchema,
            paymentResult: updatedOrder.paymentResult as PaymentResult,
          },
        });
      }

      return (
        <main className="min-h-screen bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <ConfirmationInfo
              order={order}
              reference={reference}
              paymentResult={paymentResult}
            />
          </div>
        </main>
      );
    } else {
      return (
        <div className="bg-gray-100 dark:bg-ligth-main">
          <div className="page-wrapper py-40">
            <div className="max-w-2xl mx-auto mt-8 p-4 md:p-6">
              <h1 className="text-2xl font-bold text-red-600 mb-4">
                Payment Failed
              </h1>
              <p className="mb-4">
                Your payment could not be verified. Please try again or contact
                support.
              </p>
              <Button asChild>
                <Link href={`/order/${id}`}>Return to Order</Link>
              </Button>
            </div>
          </div>
        </div>
      );
    }
  } catch (error) {
    console.error("Payment verification error:", error);
    return (
      <div className="bg-gray-100 dark:bg-ligth-main">
        <div className="page-wrapper py-40">
          <div className="max-w-2xl mx-auto mt-8 p-6">
            <h1 className="text-2xl font-bold text-red-600 mb-4">
              Payment Verification Error
            </h1>
            <p className="mb-4">
              There was an error verifying your payment. Please contact support
              with reference: {reference}
            </p>
            <Button asChild>
              <Link href={`account/order/${id}`}>Return to Order</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }
};

export default PaystackSuccessPage;
