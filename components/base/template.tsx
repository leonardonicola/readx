import React from "react";

import Navbar from "./navbar";

export default function BaseTemplate(props: { children: React.ReactNode }) {
  return (
    <div className="space-y-4 min-h-dvh">
      <Navbar />
      <main className="max-w-screen-lg px-4 mx-auto">{props.children}</main>
      <footer className="border-t border-gray-300 py-8 text-center text-sm sticky top-[100dvh]">
        © Copyright {new Date().getFullYear()} Readx.
      </footer>
    </div>
  );
}
