"use client";
import { searchSchema } from "@/lib/schemas/search";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from "../ui/form";
import { Input } from "../ui/input";

export default function Search() {
  const router = useRouter();
  const form = useForm<z.output<typeof searchSchema>>({
    resolver: zodResolver(searchSchema),
    mode: "all",
    defaultValues: {
      search: ""
    }
  });

  function handleSubmit({ search }: z.infer<typeof searchSchema>) {
    const encodedSearch = encodeURIComponent(search);
    router.push(`/trades?search=${encodedSearch}`);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex items-start gap-4"
      >
        <FormField
          control={form.control}
          name="search"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input
                  className="h-12 w-full rounded-none text-lg shadow-light"
                  placeholder="Procure sua nova experiência..."
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-start italic text-black" />
            </FormItem>
          )}
        />
        <Button type="submit" variant="neutral" className="h-12 rounded-none">
          PROCURAR
        </Button>
      </form>
    </Form>
  );
}
