import { auth } from "@/services/auth";
import LoginForm from "../_components/login-form";
import { redirect } from "next/navigation";

const LoginPage = async (props: {
  searchParams: Promise<{
    callbackUrl: string;
  }>;
}) => {
  const { callbackUrl } = await props.searchParams;

  const session = await auth();

  if (session) {
    return redirect(callbackUrl || "/");
  }

  return <LoginForm />;
};

export default LoginPage;
