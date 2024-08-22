import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import { EditEmail } from "@/components/profile/edit-email";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

async function UserProfilePage() {
  const userFromClerk = await currentUser();
  if (!userFromClerk) redirect("/login");

  const { firstName, fullName, imageUrl, primaryEmailAddress } = userFromClerk;

  if (!primaryEmailAddress) redirect("/login");

  return (
    <>
      <div className="h-full min-h-fit w-full rounded-xl border-2">
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
          <p className="text-sm text-darkBg/70">Atualize seu perfil aqui.</p>
          <Separator className="my-8 h-0.5 bg-darkBg/10" />
          <div className="flex flex-1 flex-col gap-8">
            <div className="flex w-full flex-col justify-start md:w-5/6 md:flex-row">
              <div className="w-full md:w-1/2">
                <h4 className="text-base font-semibold">Endereço de email</h4>
                <p className="text-sm text-darkBg/70">
                  Será seu e-mail principal.
                </p>
              </div>
              <div className="flex w-full items-center justify-between md:w-1/2">
                <p className="font-semibold">
                  {primaryEmailAddress.emailAddress}
                </p>
                <EditEmail currEmail={primaryEmailAddress.emailAddress} />
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default UserProfilePage;
