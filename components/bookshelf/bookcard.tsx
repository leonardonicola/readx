"use client";
import { deleteBookFromBookshelf } from "@/app/(app)/(user)/bookshelf/actions";
import { BookUser, Trash } from "lucide-react";
import { useState, useTransition } from "react";

import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "../ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { useToast } from "../ui/use-toast";

export interface CardProps {
  id: string;
  title: string;
  author: string;
  releaseDate: Date;
}

export default function BookCard({
  id,
  title,
  author,
  releaseDate
}: CardProps) {
  const [isPopoverOpen, setPopoverOpen] = useState(false);
  const [pending, startTransition] = useTransition();
  const { toast } = useToast();

  function handleDelete() {
    startTransition(async () => {
      const { errors, message } = await deleteBookFromBookshelf(id);
      if (errors) {
        toast({ variant: "destructive", title: message });
        return;
      }
    });
    setPopoverOpen(false);
  }
  return (
    <div className="relative w-full min-w-min">
      <Popover open={isPopoverOpen} onOpenChange={setPopoverOpen}>
        <PopoverTrigger className="absolute -right-2 -top-2 z-10" asChild>
          <Button size="icon" variant="reverse" disabled={pending}>
            <Trash />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="space-y-4">
          <small className="block">
            Você não receberá mais propostas de troca para este livro.
          </small>
          <Button
            onClick={handleDelete}
            disabled={pending}
            variant="reverse"
            size="sm"
          >
            Remover
          </Button>
        </PopoverContent>
      </Popover>
      <Card>
        <CardHeader>
          <CardTitle>
            <BookUser className="h-8 w-8" />
          </CardTitle>
          <CardDescription>{author}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-xl font-bold">{title}</p>

            <p>Lançamento: {releaseDate.toLocaleDateString("pt-BR")}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
