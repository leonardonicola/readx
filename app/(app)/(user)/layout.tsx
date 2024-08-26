import BaseTemplate from "@/components/base/template";
import React from "react";

export default function Layout(props: { children: React.ReactNode }) {
  return <BaseTemplate>{props.children}</BaseTemplate>;
}
