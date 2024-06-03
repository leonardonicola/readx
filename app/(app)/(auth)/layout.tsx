import { Book } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function AuthLayout(props: { children: React.ReactNode }) {
  return (
    <div className="flex h-dvh w-dvw justify-center items-center relative">
      <Link href="/">
        <Book className="absolute top-10 left-10 h-8 w-8" />
      </Link>
      <main>{props.children}</main>
    </div>
  );
}
