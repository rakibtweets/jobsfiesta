import React from "react";

// import FooterSection from '@/components/shared/Footer';
// import Navbar from '@/components/shared/Navbar';

const Layout = async ({ children }: { children: React.ReactNode }) => {
  return <div className="relative">{children}</div>;
};

export default Layout;
