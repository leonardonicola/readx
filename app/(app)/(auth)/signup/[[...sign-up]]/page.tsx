import { SignUp } from "@clerk/nextjs";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Readx",
  description: "Comece uma nova jornada na Readx!"
};

export default function Page() {
  return <SignUp signInUrl="/login" />;
}
