import { auth } from "@/services/auth";
import { redirect } from "next/navigation";
import RegisterForm from "../_components/register-form";

const RegisterPage = async (props: {
  searchParams: Promise<{
    callbackUrl: string;
  }>;
}) => {
  const { callbackUrl } = await props.searchParams;

  const session = await auth();

  if (session) {
    return redirect(callbackUrl || "/");
  }

  return <RegisterForm />;
};

export default RegisterPage;
