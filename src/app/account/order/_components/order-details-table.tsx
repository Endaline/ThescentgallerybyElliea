"use client";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { formatCurrency, formatDateTime, formatId } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { useTransition } from "react";
import { GenOrder } from "@/lib/types/type";
import { CheckCheckIcon } from "lucide-react";
import { toast } from "sonner";
import {
  deliverOrder,
  updateOrderToPaidCOD,
} from "@/app/actions/order.actions";

const OrderDetailsTable = ({
  order,
  isAdmin,
}: {
  order: Omit<GenOrder, "paymentResult">;
  isAdmin: boolean;
}) => {
  const {
    id,
    shippingAddress,
    orderitems,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
    paymentMethod,
    isDelivered,
    isPaid,
    paidAt,
    deliveredAt,
    createdAt,
  } = order;

  // Button to mark order as paid
  const MarkAsPaidButton = () => {
    const [isPending, startTransition] = useTransition();

    return (
      <Button
        type="button"
        disabled={isPending}
        onClick={() =>
          startTransition(async () => {
            const res = await updateOrderToPaidCOD(order.id);
            toast(res.message);
          })
        }
      >
        {isPending ? "processing..." : "Mark As Paid"}
      </Button>
    );
  };

  // Button to mark order as delivered
  const MarkAsDeliveredButton = () => {
    const [isPending, startTransition] = useTransition();

    return (
      <Button
        type="button"
        className="cursor-pointer"
        disabled={isPending}
        onClick={() =>
          startTransition(async () => {
            const res = await deliverOrder(order.id);
            toast(res.message);
          })
        }
      >
        {isPending ? "processing..." : "Mark As Delivered"}
      </Button>
    );
  };

  return (
    <div className="bg-gray-100 mx-auto px-4 sm:px-6 lg:px-8 py-8 ">
      <div className="">
        <div className="flex-gap flex-col md:flex-row gap-4">
          <h1 className="py-4 uppercase font-semibold text-xl">
            Order #{formatId(id)}
          </h1>

          <p className="bg-[#770a10]/60 w-fit text-white px-3 py-0.5 rounded font-semibold text-xs">
            {paymentMethod}
          </p>
        </div>

        <div className="grid py-10 md:grid-cols-3 gap-7 lg:gap-0 relative">
          <div className="border-t hidden md:block absolute top-12 left-0 w-full"></div>
          <div className="flex items-center relative md:items-start flex-col gap-2">
            <div className="p-1 bg-[#770a10] rounded-full">
              <CheckCheckIcon className="w-4 h-4 text-white" />
            </div>

            <div className="">
              <p className="text-center font-semibold">Payment Method</p>
              <p className="text-xs font-semibold">{paymentMethod}</p>

              <div className="mt-2">
                {isPaid ?
                  <Badge variant="secondary" className="text-xs">
                    Paid at {formatDateTime(paidAt!).dateTime}
                  </Badge>
                : <Badge
                    variant="destructive"
                    className="text-xs text-red-500 bg-red-50"
                  >
                    Not paid
                  </Badge>
                }
              </div>
            </div>
          </div>

          <div className="flex items-center relative flex-col gap-2">
            <div className="p-1 bg-[#770a10] rounded-full">
              <CheckCheckIcon className="w-4 h-4 text-white" />
            </div>

            <div className="">
              <p className="text-center font-semibold">Order Date</p>
              <p className="text-xs font-semibold">
                {formatDateTime(createdAt).dateTime}
              </p>
            </div>
          </div>

          <div className="flex items-center relative md:items-end flex-col gap-2">
            <div className="p-1 bg-[#770a10] rounded-full">
              <CheckCheckIcon className="w-4 h-4 text-white" />
            </div>

            <div className="">
              <p className="text-center md:text-end font-semibold">Address</p>
              <p className="text-xs font-semibold  text-end">
                {" "}
                {shippingAddress.city}
                {shippingAddress.postalCode}, {shippingAddress.country}
              </p>
              <div className="mt-2">
                {isDelivered ?
                  <Badge variant="secondary">
                    Delivered at {formatDateTime(deliveredAt!).dateTime}
                  </Badge>
                : <Badge
                    variant="destructive"
                    className="text-xs text-red-500 bg-red-50"
                  >
                    Not Delivered
                  </Badge>
                }
              </div>
            </div>
          </div>
        </div>

        <div className="mx-content padding-x mt-4  rounded dark:bg-dark-main bg-white">
          <div className="col-span-2 space-4-y overlow-x-auto">
            <Card className="border-none bg-transparent">
              <CardContent className="p-4 gap-4">
                <h2 className="text-xl pb-4">Order Items</h2>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Item</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>Price</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orderitems.map((item) => (
                      <TableRow key={item.slug}>
                        <TableCell>
                          <Link
                            href={`/product/{item.slug}`}
                            className="flex items-center"
                          >
                            <Image
                              src={item.imageId || ""}
                              alt={item.name}
                              width={50}
                              height={50}
                            />
                            <span className="px-2">{item.name}</span>
                          </Link>
                        </TableCell>
                        <TableCell>
                          <span className="px-2">{item.qty}</span>
                        </TableCell>
                        <TableCell className="text-start">
                          ₦{item.price}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
          <div>
            <Card className="border-none bg-transparent text-sm px-4">
              <CardContent className="p-4 grid grid-cols-4 border-t gap-4 space-y-4">
                {/* <div className="flex justify-between"> */}
                <div className="font-semibold col-span-2 text-end md:col-span-3">
                  Items :
                </div>
                <div className="text-end">{formatCurrency(itemsPrice)}</div>
                {/* </div> */}
                {/* <div className="flex justify-between"> */}
                <div className="font-semibold col-span-2 text-end md:col-span-3">
                  Tax :
                </div>
                <div className="text-end">{formatCurrency(taxPrice)}</div>
                {/* </div> */}
                {/* <div className="flex justify-between"> */}
                <div className="font-semibold col-span-2 text-end md:col-span-3">
                  Shipping :
                </div>
                <div className="text-end">{formatCurrency(shippingPrice)}</div>
                {/* </div> */}
                {/* <div className="flex justify-between"> */}
                <div className="font-semibold col-span-2 text-end md:col-span-3">
                  Total :
                </div>
                <div className="text-end">{formatCurrency(totalPrice)}</div>
                {/* </div> */}

                {/* Cash On Delivery */}
                {isAdmin && !isPaid && paymentMethod === "CashOnDelivery" && (
                  <MarkAsPaidButton />
                )}
                {isAdmin && isPaid && !isDelivered && <MarkAsDeliveredButton />}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsTable;
