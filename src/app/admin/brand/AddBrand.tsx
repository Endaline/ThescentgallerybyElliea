"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import z from "zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { cn, formatError } from "@/lib/utils";
import { createBrand } from "@/app/actions/brand.action";
import { addBrand, AddBrandType } from "./schema";

interface Props {
  isDashboard?: boolean;
}

const AddBrand = ({ isDashboard = false }: Props) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const form = useForm<AddBrandType>({
    resolver: zodResolver(addBrand),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof addBrand>> = async (values) => {
    setLoading(true);

    try {
      const res = await createBrand({
        ...values,
      });
      if (!res.success) {
        setLoading(false);
        toast.error(res.message);
      } else {
        setOpen(false);
        form.reset();
        router.push("/auth/brand");
        setLoading(false);
        toast.success(res.message);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error(formatError(error));
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={() => {
        setOpen(!open);
      }}
    >
      <DialogTrigger>
        <button
          className={cn(
            "px-4 cursor-pointer flex-gap gap-2 py-[6px] text-sm rounded font-semibold",
            isDashboard
              ? "rounded bg-transparent border border-sec-main text-sec-main"
              : "bg-burgundy hover:bg-burgundy/90 text-purple-900 cursor-pointer"
          )}
        >
          <Plus className="w-4 h-4" />
          Add Brand
        </button>
      </DialogTrigger>

      <DialogContent
        className="p-0 bg-gray-200 dark:bg-ligth-main min-w-sm"
        // id="small-modal"
      >
        <DialogHeader className="">
          <DialogTitle className="border-b dark:bg-dark-light px-3 py-4 rounded-t-[10px]">
            Add Brand
          </DialogTitle>
          <DialogDescription className="dark:bg-dark-color -mt-2"></DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            method="POST"
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid bg-gray-100 dark:bg-dark-main -mt-5 py-5 dark:bg-dark-color px-5"
          >
            <div className="w-full">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter Brand name"
                        {...field}
                        className="bg-white dark:bg-ligth-main border-none rounded w-full"
                      />
                    </FormControl>
                    <FormMessage className="text-xs -mt-1" />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-end my-8 gap-4 items-center">
              <Button
                type="button"
                onClick={() => setOpen(false)}
                className="bg-transparent rounded border border-sec text-sec dark:text-white"
              >
                Cancel
              </Button>
              <Button
                disabled={loading}
                className="dark:text-white  bg-sec-main rounded"
              >
                {loading ? "Submitting..." : "Submit"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddBrand;
