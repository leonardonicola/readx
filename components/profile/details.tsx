"use client";

import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import { EditIcon } from "lucide-react";
import { useState } from "react";

import { EditEmail } from "./edit-email";
import { EditNameInput } from "./edit-name";

export function UserDetails() {
  const { user } = useUser();
  const [isEditingName, setIsEditingName] = useState(false);

  if (!user) {
    return <p>Tivemos problemas ao carregar os detalhes do seu perfil</p>;
  }

  async function toggleNameInput() {
    setIsEditingName(!isEditingName);
  }

  async function changeName(name: string) {
    user?.reload();
    setIsEditingName(false);
  }

  return (
    <div className="flex flex-1 flex-col gap-8">
      <div className="flex w-full flex-col justify-start md:w-5/6 md:flex-row">
        <div className="w-full md:w-1/2">
          <h4 className="text-base font-semibold">Nome</h4>
        </div>
        <div className="flex w-full items-center justify-between md:w-1/2">
          {isEditingName ? (
            <EditNameInput
              user={user}
              onCancel={toggleNameInput}
              onSuccess={changeName}
            />
          ) : (
            <>
              <p className="font-semibold">{user.fullName}</p>
              <Button size="icon" onClick={toggleNameInput}>
                <EditIcon />
              </Button>
            </>
          )}
        </div>
      </div>
      <div className="flex w-full flex-col justify-start md:w-5/6 md:flex-row">
        <div className="w-full md:w-1/2">
          <h4 className="text-base font-semibold">Endereço de email</h4>
          <p className="text-sm text-darkBg/70">
            Será seu e-mail utilizado para login e notificações.
          </p>
        </div>
        <div className="flex w-full items-center justify-between md:w-1/2">
          {user.primaryEmailAddress ? (
            <>
              <p className="font-semibold">
                {user.primaryEmailAddress.emailAddress}
              </p>
              <EditEmail currEmail={user.primaryEmailAddress?.emailAddress} />
            </>
          ) : (
            <p>Nenhum email cadastrado</p>
          )}
        </div>
      </div>
    </div>
  );
}
