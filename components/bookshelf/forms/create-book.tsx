"use client";

import { addBookToBookshelfWhileCreating } from "@/app/(app)/(user)/bookshelf/actions";
import { maskitoDateOptionsGenerator } from "@maskito/kit";
import { useMaskito } from "@maskito/react";

import { Genres } from "@/app/(app)/(user)/bookshelf/page";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { createBookSchema } from "@/lib/schemas/bookshelf";
import { zodResolver } from "@hookform/resolvers/zod";
import { useHookFormActionErrorMapper } from "@next-safe-action/adapter-react-hook-form/hooks";
import dayjs from "dayjs";
import { useAction } from "next-safe-action/hooks";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useBookshelfModalStore } from "../store";

export function CreateBookForm({ genres }: { genres: Genres }) {
  const { toast } = useToast();
  const { toggleOpen } = useBookshelfModalStore();
  const { result, executeAsync, isExecuting, reset } = useAction(
    addBookToBookshelfWhileCreating
  );

  const { hookFormValidationErrors } = useHookFormActionErrorMapper<
    typeof createBookSchema
  >(result.validationErrors, { joinBy: "\n" });

  const form = useForm<z.output<typeof createBookSchema>>({
    resolver: zodResolver(createBookSchema),
    errors: hookFormValidationErrors,
    mode: "onBlur",
    defaultValues: {
      title: "",
      author: "",
      genre_id: "",
      release_date: ""
    }
  });
  const options = maskitoDateOptionsGenerator({
    mode: "dd/mm/yyyy",
    separator: "/",
    min: dayjs("1200-01-01").toDate()
  });
  const maskedInputRef = useMaskito({ options });

  async function onBookCreate(values: z.output<typeof createBookSchema>) {
    const res = await executeAsync(values);
    if (res?.serverError) {
      toast({
        variant: "destructive",
        title: "Oopps...",
        description: res.serverError
      });
      return;
    }
    if (res?.data?.message) {
      toast({
        variant: "success",
        title: "Sucesso!",
        description: res.data.message
      });
      toggleOpen(false);
    }
    reset();
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onBookCreate)}
        className="flex flex-col items-end gap-4 [&>div]:w-full"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Título</FormLabel>
              <FormControl>
                <Input {...field} disabled={isExecuting} placeholder="Título" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="author"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Autor</FormLabel>
              <FormControl>
                <Input {...field} disabled={isExecuting} placeholder="Autor" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="genre_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Gênero</FormLabel>
              <Select
                disabled={isExecuting}
                defaultValue={field.value}
                onValueChange={field.onChange}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um gênero" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {genres.map((genre) => (
                    <SelectItem key={genre.id} value={genre.id.toString()}>
                      {genre.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="release_date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Data de lançamento</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  disabled={isExecuting}
                  placeholder="DD/MM/AAAA"
                  ref={maskedInputRef}
                  onInput={(evt) => {
                    form.setValue("release_date", evt.currentTarget.value);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button size="sm" type="submit" disabled={isExecuting}>
          Criar e adicionar
        </Button>
      </form>
    </Form>
  );
}
