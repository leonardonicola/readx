"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import { SubmitHandler, useForm, UseFormReturn } from "react-hook-form";
import { z } from "zod";

import {
  addBookToBookshelf,
  createBook
} from "@/app/(app)/(user)/bookshelf/actions";
import { Genres } from "@/app/(app)/(user)/bookshelf/page";
import { createBookSchema, searchSchema } from "@/lib/schemas/bookshelf";

import { Button } from "../ui/button";
import { Combobox, Options } from "../ui/combobox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "../ui/dialog";
import { Form } from "../ui/form";
import { Separator } from "../ui/separator";
import { useToast } from "../ui/use-toast";
import CreateBookForm from "./create-form";

export type FormProtocol = UseFormReturn<z.output<typeof createBookSchema>>;

interface ModalProps {
  genres: Genres;
}

export default function CreateBookModal({ genres }: ModalProps) {
  const [selectedBookId, setBookId] = useState<string | null>(null);
  const [options, setOptions] = useState<Options>([]);
  const [isModalOpen, setModalOpen] = useState<boolean>(false);

  const { toast } = useToast();
  const form = useForm<z.output<typeof createBookSchema>>({
    resolver: zodResolver(createBookSchema),
    mode: "all",
    defaultValues: {
      title: "",
      author: "",
      genre_id: "",
      release_date: ""
    }
  });
  async function handleSelectBook() {
    const { error, message } = await addBookToBookshelf(
      selectedBookId as string
    );
    if (error) {
      toast({
        variant: "destructive",
        title: message
      });
      return;
    }

    toast({ variant: "success", title: message });
  }

  const handleSubmit: SubmitHandler<z.output<typeof createBookSchema>> = async (
    values
  ) => {
    const { book, error } = await createBook(values);
    if (error) {
      toast({ variant: "destructive", title: error });
      return;
    }
    const { message, error: bkError } = await addBookToBookshelf(book!.id);
    if (bkError) {
      toast({ variant: "destructive", title: message });
      return;
    }
    toast({ variant: "success", title: message });
    setModalOpen(false);
  };
  async function searchQuery(search: string) {
    const searchParam = new URLSearchParams({ search });
    const res = await fetch("/bookshelf/api?" + searchParam, { method: "GET" });
    const data = await res.json();
    const { error, data: parsedData } = searchSchema.safeParse(data);

    if (error) {
      toast({
        variant: "destructive",
        title: "Pesquisa inválida!",
        description: <pre>{error.message}</pre>
      });
      return;
    }
    const options = parsedData.result.map((book) => {
      return {
        value: book.id,
        label: `${book.title} - ${book.author}`
      };
    });
    setOptions((prevOptions) => {
      const selectedOption = prevOptions.find(
        (option) => option.value === selectedBookId
      );
      if (!selectedOption) return options;
      return [selectedOption, ...options];
    });
  }
  return (
    <Dialog open={isModalOpen} onOpenChange={(open) => setModalOpen(open)}>
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
          <section className="flex flex-col items-end gap-2">
            <Combobox
              selectedOption={selectedBookId}
              onSearch={searchQuery}
              onSelect={(val) => setBookId(val)}
              options={options}
            />
            <Button
              size="sm"
              className="mt-4"
              onClick={handleSelectBook}
              disabled={!selectedBookId?.length}
            >
              Adicionar
            </Button>
          </section>
          <div className="relative">
            <Separator />
            <p className="bg-bg absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 px-2 font-bold">
              OU
            </p>
          </div>
          <section className="space-y-4">
            <p className="font-medium">
              Crie um novo registro de livro em nosso sistema!
            </p>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="flex flex-col items-end gap-4 [&>div]:w-full"
              >
                <CreateBookForm genres={genres} form={form} />
                <Button
                  size="sm"
                  type="submit"
                  disabled={
                    !!selectedBookId?.length || form.formState.isSubmitting
                  }
                >
                  Criar e adicionar
                </Button>
              </form>
            </Form>
          </section>
        </div>
      </DialogContent>
    </Dialog>
  );
}
