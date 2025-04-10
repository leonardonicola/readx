import { UserDetails } from "@/components/profile/details";
import { EditEmail } from "@/components/profile/edit-email";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { currentUser } from "@clerk/nextjs/server";
import { EditIcon } from "lucide-react";
import { redirect } from "next/navigation";

async function UserProfilePage() {
  const userFromClerk = await currentUser();
  if (!userFromClerk) redirect("/login");

  const { firstName, fullName, imageUrl, primaryEmailAddress } = userFromClerk;

  if (!primaryEmailAddress) redirect("/login");

  return (
    <div className="mx-auto mt-12 h-fit w-full max-w-screen-lg rounded-xl border-2 duration-500 animate-in fade-in">
      <header className="relative h-72 min-h-fit w-full">
        <div className="h-2/5 w-full bg-main/10 md:h-1/2"></div>
        <div
          className={cn(
            "flex w-full flex-col items-center md:w-fit",
            "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform gap-4",
            "md:left-4 md:translate-x-0 md:flex-row md:items-end md:justify-start"
          )}
        >
          <Avatar className="h-40 w-40 shadow-xl">
            <AvatarImage
              src={imageUrl}
              alt={firstName ?? "Avatar do usuário"}
            ></AvatarImage>
            <AvatarFallback>
              {(firstName ?? "R")[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <figcaption className="pb-4">
            <h1 className="block text-3xl font-bold leading-none">
              {fullName}
            </h1>

            <span className="text-sm text-darkBg/90">
              {primaryEmailAddress.emailAddress}
            </span>
          </figcaption>
        </div>
      </header>
      <section className="flex h-2/3 flex-col px-4 pb-24">
        <h3 className="text-2xl font-bold">Detalhes</h3>
        <Separator className="my-8 h-0.5 bg-darkBg/10" />
        <UserDetails />
      </section>
    </div>
  );
}

export default UserProfilePage;
