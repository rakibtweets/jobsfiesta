import { headers } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

import { auth } from "@/lib/auth";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session?.user) {
    redirect("/");
  }

  return <>{children}</>;
};

export default Layout;
