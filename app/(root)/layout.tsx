import React from "react";

import Footer from "@/components/footer";
import Header from "@/components/header";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="bg-background min-h-screen">
      <Header />
      {children}
      <Footer />
    </section>
  );
};

export default Layout;
