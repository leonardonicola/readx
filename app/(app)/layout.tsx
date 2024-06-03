import { ptBR } from "@clerk/localizations";
import { ClerkProvider } from "@clerk/nextjs";
import { neobrutalism } from "@clerk/themes";
import React from "react";

export default function AppLayout(props: { children: React.ReactNode }) {
  return (
    <ClerkProvider localization={ptBR} appearance={{ baseTheme: neobrutalism }}>
      {props.children}
    </ClerkProvider>
  );
}
