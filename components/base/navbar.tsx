import { cn } from "@/lib/utils";
import { SignOutButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { Book, BookIcon, MenuIcon } from "lucide-react";
import Link from "next/link";

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
        "bg-secondary flex h-20 w-full items-center justify-center border-b-2 border-black py-4",
        className
      )}
    >
      <div className="flex h-full w-full max-w-screen-lg items-center px-4">
        <Sheet>
          <SheetTrigger asChild>
            <Button size="icon" className="lg:hidden">
              <MenuIcon className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle>
                <figure className="flex items-center gap-2">
                  <Book className="h-8 w-8" />
                  <h2>READX</h2>
                </figure>
              </SheetTitle>
            </SheetHeader>
            <div className="grid gap-2 py-6">
              <SheetClose asChild>
                <Button variant="link" asChild className="w-fit">
                  <Link
                    href="/"
                    className="text-xl font-semibold"
                    prefetch={false}
                  >
                    HOME
                  </Link>
                </Button>
              </SheetClose>
            </div>
          </SheetContent>
        </Sheet>
        <Button asChild className="hidden font-bold lg:flex">
          <Link href="/" prefetch={false}>
            <BookIcon />
          </Link>
        </Button>
        <nav className="ml-auto flex items-center gap-6">
          <Button asChild variant="neutral" className="hidden lg:block">
            <Link href="/" className="font-semibold">
              HOME
            </Link>
          </Button>
          {!user?.id ? (
            <Button asChild variant="neutral">
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
                <DropdownMenuItem asChild>
                  <Link href="/chat">Chats</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/bookshelf">Estante</Link>
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
