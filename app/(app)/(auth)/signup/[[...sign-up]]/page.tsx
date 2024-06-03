import { SignUp } from "@clerk/nextjs";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cadastro",
  description: "Comece agora mesmo a compartilhar suas experiências."
};

export default function Page() {
  return <SignUp />;
}
