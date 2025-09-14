import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { orderId, email, amount } = await req.json();

    if (!orderId || !email || !amount) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Call Paystack initialize endpoint
    const response = await fetch(
      "https://api.paystack.co/transaction/initialize",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          amount: Math.round(amount * 100), // Paystack expects kobo
          reference: `order_${orderId}_${Date.now()}`,
          callback_url: `${process.env.NEXT_PUBLIC_BASE_URL}/order-confirmation/${orderId}/paystack-payment-success`,
          metadata: { orderId },
        }),
      }
    );

    const data = await response.json();

    if (!data.status) {
      return NextResponse.json(
        { error: data.message ?? "Paystack init failed" },
        { status: 400 }
      );
    }

    return NextResponse.json({
      authorizationUrl: data.data.authorization_url,
    });
  } catch (err: any) {
    console.error("Paystack init error:", err);
    return NextResponse.json(
      { error: "Failed to initialize transaction" },
      { status: 500 }
    );
  }
}
