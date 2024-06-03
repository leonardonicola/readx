import React from "react";

import BaseTemplate from "@/components/base/template";

export default function Layout(props: { children: React.ReactNode }) {
  return <BaseTemplate>{props.children}</BaseTemplate>;
}
