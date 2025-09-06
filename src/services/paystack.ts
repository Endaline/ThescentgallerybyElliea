type PaymentResult = {
  status: string;
  id: string;
  email_address: string;
  pricePaid: string;
};
const PAYSTACK_API_URL = "https://api.paystack.co";

interface PaystackPaymentData {
  orderId: string;
  amount: number;
  email: string;
  currency?: string;
}

interface PaystackTransactionResponse {
  status: boolean;
  message: string;
  data: {
    authorization_url: string;
    access_code: string;
    reference: string;
  };
}

interface PaystackVerificationResponse {
  status: boolean;
  message: string;
  data: {
    id: number;
    domain: string;
    status: string;
    reference: string;
    amount: number;
    message: string;
    gateway_response: string;
    paid_at: string;
    created_at: string;
    channel: string;
    currency: string;
    ip_address: string;
    metadata: {
      orderId?: string;
    };
    authorization: {
      authorization_code: string;
      bin: string;
      last4: string;
      exp_month: string;
      exp_year: string;
      channel: string;
      card_type: string;
      bank: string;
      country_code: string;
      brand: string;
      reusable: boolean;
      signature: string;
    };
    customer: {
      id: number;
      first_name: string;
      last_name: string;
      email: string;
      customer_code: string;
      phone: string;
    };
  };
}

class PaystackService {
  private secretKey: string;
  private isDevelopmentMode: boolean;

  constructor() {
    const secretKey = process.env.PAYSTACK_SECRET_KEY;
    this.isDevelopmentMode =
      secretKey === "sk_test_demo_key_for_development" ||
      secretKey?.includes("demo_key_for_development") ||
      process.env.NODE_ENV === "development";

    if (!secretKey || secretKey.includes("your_paystack_secret_key_here")) {
      throw new Error(
        "PAYSTACK_SECRET_KEY is not properly configured. Please set a valid Paystack secret key in your environment variables."
      );
    }
    this.secretKey = secretKey;
  }

  private async makeRequest(endpoint: string, options: RequestInit = {}) {
    const response = await fetch(`${PAYSTACK_API_URL}${endpoint}`, {
      ...options,
      headers: {
        Authorization: `Bearer ${this.secretKey}`,
        "Content-Type": "application/json",
        ...options.headers,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Paystack API request failed");
    }

    return data;
  }
  async initializePayment(
    paymentData: PaystackPaymentData
  ): Promise<PaystackTransactionResponse> {
    // Development mode simulation
    if (this.isDevelopmentMode) {
      const reference = `demo_${paymentData.orderId}_${Date.now()}`;
      // Create a local demo payment URL instead of using Paystack's checkout
      const demoUrl = `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/demo-payment?reference=${reference}&orderId=${paymentData.orderId}&amount=${paymentData.amount}&email=${encodeURIComponent(paymentData.email)}`;

      console.log(
        "🔧 Demo Mode: Redirecting to local demo payment page:",
        demoUrl
      );

      return {
        status: true,
        message: "Authorization URL created (Demo Mode)",
        data: {
          authorization_url: demoUrl,
          access_code: `demo_access_${Date.now()}`,
          reference: reference,
        },
      };
    }

    const body = {
      email: paymentData.email,
      amount: Math.round(paymentData.amount * 100), // Convert to kobo (smallest currency unit)
      currency: paymentData.currency || "NGN",
      reference: `order_${paymentData.orderId}_${Date.now()}`,
      metadata: {
        orderId: paymentData.orderId,
      },
    };

    return this.makeRequest("/transaction/initialize", {
      method: "POST",
      body: JSON.stringify(body),
    });
  }
  async verifyPayment(
    reference: string
  ): Promise<PaystackVerificationResponse> {
    // Development mode simulation
    if (this.isDevelopmentMode) {
      return {
        status: true,
        message: "Verification successful (Demo Mode)",
        data: {
          id: Math.floor(Math.random() * 1000000),
          domain: "test",
          status: "success",
          reference: reference,
          amount: 100000, // Demo amount in kobo
          message: "Demo payment successful",
          gateway_response: "Successful (Demo)",
          paid_at: new Date().toISOString(),
          created_at: new Date().toISOString(),
          channel: "card",
          currency: "NGN",
          ip_address: "127.0.0.1",
          metadata: {
            orderId: reference.split("_")[1] || "demo-order",
          },
          authorization: {
            authorization_code: "AUTH_demo_code",
            bin: "408408",
            last4: "4081",
            exp_month: "12",
            exp_year: "2030",
            channel: "card",
            card_type: "visa DEBIT",
            bank: "Test Bank",
            country_code: "NG",
            brand: "visa",
            reusable: true,
            signature: "SIG_demo_signature",
          },
          customer: {
            id: 123456,
            first_name: "Demo",
            last_name: "User",
            email: "demo@example.com",
            customer_code: "CUS_demo_customer",
            phone: "+2341234567890",
          },
        },
      };
    }

    return this.makeRequest(`/transaction/verify/${reference}`);
  }
  async processPayment(
    orderId: string,
    amount: number,
    email: string,
    currency: string = "NGN"
  ): Promise<{
    success: boolean;
    payment_url?: string;
    reference?: string;
    message?: string;
  }> {
    try {
      const response = await this.initializePayment({
        orderId,
        amount,
        email,
        currency,
      });

      if (response.status) {
        return {
          success: true,
          payment_url: response.data.authorization_url,
          reference: response.data.reference,
        };
      } else {
        return {
          success: false,
          message: response.message || "Payment initialization failed",
        };
      }
    } catch (error) {
      return {
        success: false,
        message:
          error instanceof Error ? error.message : "Payment processing failed",
      };
    }
  }

  async handleWebhook(reference: string): Promise<PaymentResult> {
    try {
      const verification = await this.verifyPayment(reference);

      if (verification.status && verification.data.status === "success") {
        return {
          id: verification.data.reference,
          status: "COMPLETED",
          email_address: verification.data.customer.email,
          pricePaid: verification.data.amount.toString(), // Convert from kobo to main currency

          // pricePaid: (verification.data.amount / 100).toString(), // Convert from kobo to main currency
        };
      } else {
        return {
          id: reference,
          status: "FAILED",
          email_address: verification.data.customer?.email || "",
          pricePaid: "0",
        };
      }
    } catch {
      return {
        id: reference,
        status: "FAILED",
        email_address: "",
        pricePaid: "0",
      };
    }
  }
}

export const paystack = new PaystackService();
