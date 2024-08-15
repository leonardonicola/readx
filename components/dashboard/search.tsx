"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { searchSchema } from "@/lib/schemas/search";

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
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="search"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input
                  className="h-12 w-full text-lg"
                  placeholder="Procure sua nova experiência..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
