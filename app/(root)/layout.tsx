import React from "react";

import Footer from "@/components/footer";
import Header from "@/components/header";
import { getServerSession } from "@/lib/get-session";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const data = await getServerSession();
  return (
    <section className="bg-background min-h-screen">
      <Header
        name={data?.user?.name}
        email={data?.user.email}
        image={data?.user?.image as string}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        role={(data?.user as any)?.role}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        accountType={(data?.user as any)?.accountType}
      />
      {children}
      <Footer />
    </section>
  );
};

export default Layout;
