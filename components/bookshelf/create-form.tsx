"use client";
import { maskitoDateOptionsGenerator } from "@maskito/kit";
import { useMaskito } from "@maskito/react";

import { Genres } from "@/app/(app)/(user)/bookshelf/page";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "../ui/form";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "../ui/select";
import { FormProtocol } from "./create-modal";

interface FormProps {
  form: FormProtocol;
  genres: Genres;
}

export default function CreateBookForm({ genres, form }: FormProps) {
  const options = maskitoDateOptionsGenerator({
    mode: "dd/mm/yyyy",
    separator: "/"
  });
  const maskedInputRef = useMaskito({ options });

  return (
    <>
      <FormField
        control={form.control}
        name="title"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Título</FormLabel>
            <FormControl>
              <Input
                {...field}
                disabled={form.formState.isSubmitting}
                placeholder="Título"
              />
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
              <Input
                {...field}
                disabled={form.formState.isSubmitting}
                placeholder="Autor"
              />
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
              disabled={form.formState.isSubmitting}
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
                disabled={form.formState.isSubmitting}
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
    </>
  );
}
