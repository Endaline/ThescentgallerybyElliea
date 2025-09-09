"use server";

import { prisma } from "@/app/db/prismadb";
import { convertToPlainObject, formatError } from "@/lib/utils";
import { auth } from "@/services/auth";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { getMyCart } from "./cart.actions";
import { getUserById } from "./user.actions";
import {
  CartItem,
  CheckoutSchema,
  ShippingAddressSchema,
} from "@/lib/validators";
import { GenOrder, PaymentResult, SalesDataType } from "@/lib/types/type";
import { sendPurchaseReceipt } from "@/services/email";

// Get all orders
export async function getAllOrders({
  limit = 10,
  page,
  query,
}: {
  limit?: number;
  page: number;
  query: string;
}) {
  const queryFilter: Prisma.OrderWhereInput =
    query && query !== "all"
      ? {
          user: {
            name: {
              contains: query,
              mode: "insensitive",
            } as Prisma.StringFilter,
          },
        }
      : {};

  const orders = await prisma.order.findMany({
    where: {
      ...queryFilter,
    },
    orderBy: { createdAt: "desc" },
    take: limit,
    skip: (page - 1) * limit,
    include: {
      user: {
        select: {
          name: true,
          email: true,
          phone: true,
          image: true,
        },
      },
      orderitems: true, // ✅ include order items
    },
  });
  const data: GenOrder[] = orders.map((order) => ({
    ...order,
    paymentResult:
      typeof order.paymentResult === "string"
        ? JSON.parse(order.paymentResult) // if stored as stringified JSON
        : (order.paymentResult as PaymentResult | null),
    shippingAddress: order.shippingAddress as ShippingAddressSchema,
  }));

  const dataCount = await prisma.order.count();

  return {
    data,
    totalPages: Math.ceil(dataCount / limit),
    totalCount: dataCount,
  };
}

export async function getSales() {
  const orders = await prisma.order.findMany({
    where: {
      isPaid: true,
    },
    include: {
      orderitems: true,
    },
  });

  const sales = orders.reduce((acc, order) => acc + order.totalPrice, 0);

  return sales;
}

export async function getMonthlyOrders() {
  const orders = await prisma.order.findMany({
    select: {
      createdAt: true,
    },
  });

  // Create a map to count orders by month
  const monthMap: { [key: string]: number } = {};

  orders.forEach((order) => {
    const date = new Date(order.createdAt);
    const monthName = date.toLocaleString("default", { month: "long" });

    if (!monthMap[monthName]) {
      monthMap[monthName] = 0;
    }

    monthMap[monthName]++;
  });

  // Format the data as needed for charts
  const chartData = Object.entries(monthMap).map(([month, count]) => ({
    month,
    desktop: count,
  }));

  // Optional: sort by month order
  const monthOrder = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  chartData.sort(
    (a, b) => monthOrder.indexOf(a.month) - monthOrder.indexOf(b.month)
  );

  return chartData;
}

// Delete an order
export async function deleteOrder(id: string) {
  try {
    await prisma.order.delete({ where: { id } });

    revalidatePath("/admin/orders");

    return {
      success: true,
      message: "Order deleted successfully",
    };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}

export async function createOrder(data: {
  data: CheckoutSchema;
  isPaid?: boolean;
  paidAt?: Date;
  paymentResult?: PaymentResult;
}) {
  try {
    const session = await auth();
    if (!session) throw new Error("User is not authenticated");

    const cart = await getMyCart();
    const userId = session?.user?.id;
    if (!userId) throw new Error("User not found");

    const user = await getUserById(userId);

    if (!cart || cart.items.length === 0) {
      return {
        success: false,
        message: "Your cart is empty",
        redirectTo: "/cart",
      };
    }

    if (!user.address && !data.data.address) {
      return {
        success: false,
        message: "No shipping address",
        redirectTo: "/shipping-address",
      };
    }

    if (!user.paymentMethod && !data.data.paymentMethod) {
      return {
        success: false,
        message: "No payment method",
        redirectTo: "/payment-method",
      };
    }
    let updatedUser;
    if (data.data.address || data.data.paymentMethod) {
      updatedUser = await prisma.user.update({
        where: { id: userId },
        data: {
          phone: data.data.phone,
          address: data.data.address,
          paymentMethod: data.data.paymentMethod,
        },
      });
    }

    // Create order object
    const order = {
      userId: user.id,
      shippingAddress: updatedUser?.address || data.data.address,
      paymentMethod: updatedUser?.paymentMethod || data.data.paymentMethod,
      itemsPrice: cart.itemsPrice,
      shippingPrice: cart.shippingPrice,
      taxPrice: cart.taxPrice,
      totalPrice: cart.totalPrice,
      isPaid: data.isPaid ?? false,
      paidAt: data.paidAt,
    };

    // Create a transaction to create order and order items in database
    const insertedOrderId = await prisma.$transaction(async (tx) => {
      // Create order
      const insertedOrder = await tx.order.create({ data: order });

      // Create order items from the cart items
      for (const item of cart.items as CartItem[]) {
        const { qty, name, slug, image, price, productId } = item;

        const insertedOrderItem = await tx.orderItem.create({
          data: {
            productId,
            qty,
            name,
            slug,
            imageId: image || null,
            price,
            orderId: insertedOrder.id,
          },
        });

        if (!insertedOrderItem) throw new Error("Order not created");
      }
      // Clear cart
      await tx.cart.update({
        where: { id: cart.id },
        data: {
          items: [],
          totalPrice: 0,
          taxPrice: 0,
          shippingPrice: 0,
          itemsPrice: 0,
        },
      });

      return insertedOrder.id;
    });

    if (!insertedOrderId) throw new Error("Order not created");

    return {
      success: true,
      message: "Order created",
      redirectTo: `/order/${insertedOrderId}`,
      id: insertedOrderId,
    };
  } catch (error) {
    // Handle redirect errors by re-throwing them
    if (
      error &&
      typeof error === "object" &&
      "digest" in error &&
      typeof error.digest === "string" &&
      error.digest.startsWith("NEXT_REDIRECT")
    ) {
      throw error;
    }
    return { success: false, message: formatError(error) };
  }
}

export async function getOrderById(orderId: string) {
  const data = await prisma.order.findFirst({
    where: {
      id: orderId,
    },
    include: {
      orderitems: true,
      user: { select: { name: true, email: true, phone: true, image: true } },
    },
  });

  return convertToPlainObject(data);
}

export async function updateOrderToPaid({
  orderId,
  paymentResult,
}: {
  orderId: string;
  paymentResult?: PaymentResult;
}) {
  // Get order from database
  const order = await prisma.order.findFirst({
    where: {
      id: orderId,
    },
    include: {
      orderitems: true,
    },
  });

  if (!order) throw new Error("Order not found");

  if (order.isPaid) throw new Error("Order is already paid");

  // Transaction to update order and account for product stock
  await prisma.$transaction(async (tx) => {
    // Iterate over products and update stock
    for (const item of order.orderitems) {
      await tx.product.update({
        where: { id: item.productId },
        data: { stock: { increment: -item.qty } },
      });
    }

    // Set the order to paid
    await tx.order.update({
      where: { id: orderId },
      data: {
        isPaid: true,
        paidAt: new Date(),
        paymentResult,
      },
    });
  });

  // Get updated order after transaction
  const updatedOrder = await prisma.order.findFirst({
    where: { id: orderId },
    include: {
      orderitems: true,
      user: { select: { name: true, email: true, phone: true, image: true } },
    },
  });

  if (!updatedOrder) throw new Error("Order not found");

  sendPurchaseReceipt({
    order: {
      ...updatedOrder,
      shippingAddress: updatedOrder.shippingAddress as ShippingAddressSchema,
      paymentResult: updatedOrder.paymentResult as PaymentResult,
    },
  });
}

export async function updateOrderToPaidCOD(orderId: string) {
  try {
    await updateOrderToPaid({ orderId });

    revalidatePath(`/order/${orderId}`);

    return { success: true, message: "Order marked as paid" };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}

export async function deliverOrder(orderId: string) {
  try {
    const order = await prisma.order.findFirst({
      where: {
        id: orderId,
      },
    });

    if (!order) throw new Error("Order not found");
    if (!order.isPaid) throw new Error("Order is not paid");

    await prisma.order.update({
      where: { id: orderId },
      data: {
        isDelivered: true,
        deliveredAt: new Date(),
      },
    });

    revalidatePath(`/order/${orderId}`);

    return {
      success: true,
      message: "Order has been marked delivered",
    };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}

export async function getMyOrders({
  limit = 10,
  page,
}: {
  limit?: number;
  page: number;
}) {
  const session = await auth();
  if (!session) throw new Error("User is not authorized");

  const orders = await prisma.order.findMany({
    where: { userId: session?.user?.id },
    orderBy: { createdAt: "desc" },
    take: limit,
    skip: (page - 1) * limit,
    include: {
      orderitems: true,
      user: { select: { name: true, email: true, phone: true, image: true } },
    },
  });

  const data: GenOrder[] = orders.map((order) => ({
    ...order,
    paymentResult:
      typeof order.paymentResult === "string"
        ? JSON.parse(order.paymentResult) // if stored as stringified JSON
        : (order.paymentResult as PaymentResult | null), // if stored as actual JSON
    shippingAddress: order.shippingAddress as ShippingAddressSchema,
  }));

  const dataCount = await prisma.order.count({
    where: { userId: session?.user?.id },
  });

  return {
    data,
    totalPages: Math.ceil(dataCount / limit),
  };
}

export async function orderCounter() {
  const [totalCount, deliveredCount, paidCount, unpaidCount] =
    await prisma.$transaction([
      prisma.order.count(),
      prisma.order.count({ where: { isDelivered: true } }),
      prisma.order.count({
        where: {
          isPaid: true,
        },
      }),
      prisma.order.count({
        where: {
          isPaid: false,
        },
      }),
    ]);

  return {
    counts: { totalCount, deliveredCount, paidCount, unpaidCount },
  };
}

export async function getOrderSummary() {
  const [ordersCount, productsCount, usersCount] = await prisma.$transaction([
    prisma.order.count(),
    prisma.product.count(),
    prisma.user.count(),
  ]);

  // Total sales
  const totalSales = await prisma.order.aggregate({
    _sum: { totalPrice: true },
  });

  // Monthly sales using groupBy
  const salesDataRaw = await prisma.order.groupBy({
    by: ["createdAt"], // we need to group, but Mongo doesn’t have SQL-like month extraction
    _sum: { totalPrice: true },
  });

  // You’ll need to map createdAt → month string manually
  const salesData: SalesDataType = salesDataRaw.map((entry) => {
    const date = new Date(entry.createdAt as Date);
    const month = `${date.getMonth() + 1}/${date.getFullYear().toString().slice(-2)}`;
    return {
      month,
      totalSales: Number(entry._sum.totalPrice ?? 0),
    };
  });

  // Latest sales
  const latestSales = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    include: { user: { select: { name: true } } },
    take: 6,
  });

  const recentOrders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    include: { user: { select: { name: true } } },
    take: 10,
  });

  const topProducts = await prisma.product.findMany({
    orderBy: { stock: "desc" },
    take: 10,
  });

  return {
    ordersCount,
    productsCount,
    usersCount,
    totalSales,
    latestSales,
    salesData,
    recentOrders,
    topProducts,
  };
}
