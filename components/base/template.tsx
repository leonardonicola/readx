import React from "react";

import Footer from "./footer";
import Navbar from "./navbar";

export default function BaseTemplate(props: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh w-dvw space-y-4">
      <Navbar />
      <main className="mx-auto max-w-screen-lg px-4">{props.children}</main>
      <Footer />
    </div>
  );
}
