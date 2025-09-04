import { auth } from "@/services/auth";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
// import { getMyCart } from "@/actions/cart.actions";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const cart = await getMyCart();
  const session = await auth();

  return (
    <div>
      <Navigation session={session} cartCount={0} />
      {children}
      <Footer />
    </div>
  );
}
