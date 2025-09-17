import { auth } from "@/services/auth";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { getMyCart } from "@/app/actions/cart.actions";
import Whatsapp from "@/components/whatsapp";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cart = await getMyCart();
  const session = await auth();

  return (
    <div>
      <Navigation session={session} cartCount={cart?.items.length || 0} />
      <Whatsapp />
      {children}
      <Footer />
    </div>
  );
}
