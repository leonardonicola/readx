import React from "react";

import Footer from "./footer";
import Navbar from "./navbar";

export default function BaseTemplate(props: { children: React.ReactNode }) {
  return (
    <div className="flex h-dvh w-full flex-col items-center gap-4">
      <Navbar className="w-full" />
      <main className="h-full w-full max-w-screen-lg px-4">
        {props.children}
      </main>
      <Footer className="w-full" />
    </div>
  );
}
