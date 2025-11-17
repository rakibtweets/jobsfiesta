import React from "react";

import Footer from "@/components/footer";
import Header from "@/components/header";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-background min-h-screen">
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
