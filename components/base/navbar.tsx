import { SignOutButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { Book, MenuIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

import { cn } from "@/lib/utils";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "../ui/dropdown-menu";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "../ui/sheet";

interface NavbarProps {
  className?: string;
}

export default async function Navbar({ className }: NavbarProps) {
  const user = await currentUser();
  return (
    <header
      className={cn(
        "w-full border-b-2 bg-secondary border-black h-20 shrink-0 items-center",
        className
      )}
    >
      <div className="flex max-w-screen-lg items-center h-full mx-auto px-4">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="lg:hidden">
              <MenuIcon className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <SheetHeader>
              <SheetTitle>
                <figure className="flex gap-2 items-center">
                  <Book className="h-8 w-8" />
                  <h2>Readx</h2>
                </figure>
              </SheetTitle>
            </SheetHeader>
            <div className="grid gap-2 py-6">
              <SheetClose asChild>
                <Link
                  href="/"
                  className="text-lg font-semibold"
                  prefetch={false}
                >
                  HOME
                </Link>
              </SheetClose>
            </div>
          </SheetContent>
        </Sheet>
        <Button variant="ghost" size="icon" asChild>
          <Link href="/" className="hidden lg:flex" prefetch={false}>
            <Book className="h-6 w-6" />
          </Link>
        </Button>
        <nav className="ml-auto hidden lg:flex gap-6">
          <Button asChild variant="ghost">
            <Link href="/" className="font-semibold">
              HOME
            </Link>
          </Button>
          {!user?.id ? (
            <Button asChild variant="ghost">
              <Link href="/login" className="font-semibold">
                LOGIN
              </Link>
            </Button>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar>
                  <AvatarImage src={user.imageUrl} alt={user.firstName ?? ""} />
                  <AvatarFallback>{(user.firstName ?? "R")[0]}</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Olá, {user.firstName}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/profile">Perfil</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <SignOutButton>Sair</SignOutButton>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </nav>
      </div>
    </header>
  );
}
