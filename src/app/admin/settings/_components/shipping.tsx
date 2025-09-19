"use client";

import React, { useState } from "react";
import { Loader, Truck, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { deleteShippingInfo } from "@/app/actions/shipping.action";
import type { Shipping } from "@prisma/client";
import { nigeriaData } from "@/app/(website)/contact";
import { MultiSelect } from "@/components/ui/multi-select";
import AddShipping from "./add-shipping";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import EditShipping from "./edit-shipping";

const Shipping = ({ info }: { info: Shipping[] | null | undefined }) => {
  const [isPending, startTransition] = useTransition();

  const handleDelete = (id: string) => {
    if (typeof id === "string" && id.trim() !== "") {
      startTransition(async () => {
        const { success, message } = await deleteShippingInfo(id);
        if (success) {
          toast.success(message);
        } else {
          toast.error(message);
        }
      });
    }
  };

  const containsDefault = (record?: Shipping | null | undefined) =>
    record?.state.includes("Default");

  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <div>
          <CardTitle className="flex items-center">
            <Truck className="w-5 h-5 mr-2" />
            Shipping Options
          </CardTitle>
          <CardDescription>
            Configure shipping rates and tax per state
          </CardDescription>
        </div>
        <AddShipping isDashboard />
      </CardHeader>

      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>States</TableHead>
              <TableHead>Shipping Rate (₦)</TableHead>
              <TableHead>Tax Rate (%)</TableHead>
              <TableHead className="">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {info && info.length > 0 ? (
              info.map((record) => (
                <TableRow key={record.id ?? record.state.join(",")}>
                  <TableCell>{record.state.join(", ")}</TableCell>
                  <TableCell>{record.shippingRate}</TableCell>
                  <TableCell>{record.taxRate}</TableCell>
                  <TableCell className="text-right grid grid-cols-2 w-fit gap-2 ">
                    <EditShipping info={record} />
                    {containsDefault(record) ? null : (
                      <Button
                        variant="destructive"
                        size="icon"
                        disabled={isPending}
                        onClick={() => handleDelete(record.id ?? "")}
                      >
                        {isPending ? (
                          <Loader className="w-4 h-4 animate-spin" />
                        ) : (
                          <Trash2 className="w-4 h-4" />
                        )}
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="text-center text-sm text-gray-500"
                >
                  No shipping records yet
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default Shipping;
