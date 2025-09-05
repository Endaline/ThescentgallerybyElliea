import { removeTotallyFromCart } from "@/app/actions/cart.actions";
import { Button } from "@/components/ui/button";
import React, { useTransition } from "react";
import { toast } from "sonner";
import { Loader, X } from "lucide-react";

const RemoveBtn = ({ id }: { id: string }) => {
  const [isPending, startTransition] = useTransition();
  return (
    <Button
      disabled={isPending}
      variant="outline"
      type="button"
      onClick={() =>
        startTransition(async () => {
          const res = await removeTotallyFromCart(id);

          if (!res.success) {
            toast.error(res.message);
          }
        })
      }
    >
      {isPending ? (
        <Loader className="w-4 h-4 animate-spin" />
      ) : (
        <X className="h-4 w-4" />
      )}
    </Button>
  );
};

export default RemoveBtn;
