import { removeItemFromCart } from "@/app/actions/cart.actions";
import { Button } from "@/components/ui/button";
import { Loader, Minus } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";

export default function DecreaseButton({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition();
  return (
    <Button
      disabled={isPending}
      variant="outline"
      type="button"
      onClick={() =>
        startTransition(async () => {
          const res = await removeItemFromCart(id);

          if (!res.success) {
            toast.error(res.message);
          }
        })
      }
    >
      {isPending ? (
        <Loader className="w-4 h-4 animate-spin" />
      ) : (
        <Minus className="w-4 h-4" />
      )}
    </Button>
  );
}
