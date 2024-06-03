import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

import BaseTemplate from "@/components/base/template";

export default function GuestLayout(props: { children: React.ReactNode }) {
  const { userId } = auth();

  if (userId) redirect("/dashboard");
  return <BaseTemplate>{props.children}</BaseTemplate>;
}
