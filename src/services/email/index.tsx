import { Resend } from "resend";
import dotenv from "dotenv";
import { APP_NAME, SENDER_EMAIL } from "@/lib/constants";
import PurchaseReceiptEmail from "./purchase-receipt";
import { GenOrder } from "@/lib/types/type";

dotenv.config();
const resend = new Resend(process.env.RESEND_API_KEY as string);

export const sendPurchaseReceipt = async ({ order }: { order: GenOrder }) => {
  await resend.emails.send({
    from: `${APP_NAME} <${SENDER_EMAIL}>`,
    to: order.user.email,
    subject: `Order Confirmation ${order.id}`,
    react: <PurchaseReceiptEmail order={order} />,
  });
};
