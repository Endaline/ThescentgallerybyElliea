"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Plus, Minus, Loader } from "lucide-react";
import { useTransition } from "react";
import { CartItem } from "@/lib/validators";
import { toast } from "sonner";
import { addItemToCart, removeItemFromCart } from "@/app/actions/cart.actions";
import { GenCart } from "@/lib/types/type";
import { cn } from "@/lib/utils";

const AddToCart = ({
  item,
  isBuy,
  isCartPage,
  cart,
}: {
  item: CartItem;
  isBuy?: boolean;
  isCartPage?: boolean;
  cart: GenCart | undefined;
}) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const existItem = cart?.items.find((x) => x.productId === item.productId);

  const handleAddToCart = async () => {
    startTransition(async () => {
      const res = await addItemToCart(item);

      if (!res.success) {
        toast.error(res.message);
        return;
      } else {
        if (isBuy) {
          router.push("/checkout");
        } else {
          router.push("/cart");
        }
      }
    });
  };

  // Handle remove from cart
  const handleRemoveFromCart = async () => {
    startTransition(async () => {
      const res = await removeItemFromCart(item.productId);

      if (!res.success) {
        toast.error(res.message);
        return;
      }

      return;
    });
  };

  return existItem ? (
    <div
      className={cn(
        "flex items-center justify-center",
        !isCartPage ? "w-full" : ""
      )}
    >
      <Button type="button" variant="outline" onClick={handleRemoveFromCart}>
        {isPending ? (
          <Loader className="w-4 h-4 animate-spin" />
        ) : (
          <Minus className="w-4 h-4" />
        )}
      </Button>
      <span className="px-2">{existItem.qty}</span>
      <Button type="button" variant="outline" onClick={handleAddToCart}>
        {isPending ? (
          <Loader className="w-4 h-4 animate-spin" />
        ) : (
          <Plus className="w-4 h-4" />
        )}
      </Button>
    </div>
  ) : (
    <Button
      size="lg"
      type="button"
      disabled={isPending}
      className={cn(
        "flex-1 border  h-12 cursor-pointer w-full",
        isBuy
          ? " border-[#9b59b6] hover:bg-[#9b59b6]/90 bg-white hover:text-white text-[#512260]"
          : "bg-[#9b59b6] hover:border-[#9b59b6] hover:text-slate-700 hover:bg-white text-white "
      )}
      onClick={handleAddToCart}
    >
      {isPending && <Loader className="w-4 h-4 animate-spin" />}
      {isBuy ? "Buy it now" : "Add to Cart"}
    </Button>
  );
};

export default AddToCart;
