"use client";
import { Genres } from "@/app/(app)/(user)/bookshelf/page";
import { createBookSchema } from "@/lib/schemas/bookshelf";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";

import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "../ui/dialog";
import { Separator } from "../ui/separator";
import { AddToBookshelfForm } from "./forms/add-to-bookshelf";
import { CreateBookForm } from "./forms/create-book";

export type FormProtocol = UseFormReturn<z.output<typeof createBookSchema>>;

interface ModalProps {
  genres: Genres;
}

export default function CreateBookModal({ genres }: ModalProps) {

  const [isOpen, toggleOpen] = useState<boolean>(false)

  return (
    <Dialog open={isOpen} onOpenChange={(open) => toggleOpen(open)}>
      <DialogTrigger asChild>
        <Button className="mb-12">
          <PlusCircle className="mr-2 h-4 w-4" /> Adicionar livro
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Adicione um novo livro a sua estante virtual
          </DialogTitle>
          <DialogDescription>
            Livros adicionados aqui, estarão disponíveis para troca
          </DialogDescription>
        </DialogHeader>
        <div className="w-full space-y-4">
          <p className="font-medium">Adicione um livro existente</p>
          <AddToBookshelfForm  toggleOpen={toggleOpen}/>
          <div className="relative">
            <Separator />
            <p className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-bg px-2 font-bold">
              OU
            </p>
          </div>
          <p className="font-medium">
            Crie um novo registro de livro em nosso sistema!
          </p>
          <CreateBookForm toggleOpen={toggleOpen} genres={genres} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
