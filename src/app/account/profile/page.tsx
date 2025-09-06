import React from "react";
import { auth } from "@/services/auth";
import { getUserById } from "@/app/actions/user.actions";
import UserProfile from "./components/UserProfile";

const page = async () => {
  const session = await auth();

  if (!session) {
    return <div>Loading...</div>;
  }

  if (!session?.user?.id) {
    return <div>Loading...</div>;
  }

  const user = await getUserById(session?.user?.id);
  return <UserProfile user={user} />;

  // return <>hi</>;
};

export default page;
