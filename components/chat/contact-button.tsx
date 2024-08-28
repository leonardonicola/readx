"use client";

import { cn } from "@/lib/utils";
import { UserCircle2Icon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface ContactButtonProps {
  chatId: string;
  contactName: string;
  lastMessage: string;
}

export function ContactButton({
  chatId,
  contactName,
  lastMessage
}: ContactButtonProps) {
  const pathname = usePathname();

  return (
    <Link
      href={`/chat/${chatId}`}
      className={cn(
        "flex h-fit w-full cursor-pointer gap-4 rounded-xl p-4 text-center transition-colors",
        pathname === `/chat/${chatId}` ? "bg-gray-200" : "hover:bg-gray-200"
      )}
    >
      <UserCircle2Icon className="h-8 w-8" />
      <p className="font-bold">{contactName}</p>
      <p className="text-sm font-light">{lastMessage}</p>
    </Link>
  );
}
