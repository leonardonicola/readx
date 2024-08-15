import { SignIn } from "@clerk/nextjs";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Readx",
  description: "Bem vindo de volta!"
};

export default function Page() {
  return <SignIn />;
}
