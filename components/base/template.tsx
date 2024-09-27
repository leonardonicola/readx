import React from "react";

import Footer from "./footer";
import Navbar from "./navbar";

export default function BaseTemplate(props: { children: React.ReactNode }) {
  return (
    <div className="flex h-dvh w-full flex-col items-center">
      <Navbar className="w-full" />
      <main className="h-full w-full">{props.children}</main>
      <Footer className="w-full" />
    </div>
  );
}
