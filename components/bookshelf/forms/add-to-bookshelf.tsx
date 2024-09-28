"use client";
import { addBookToBookshelfAction as addBookToBookshelf } from "@/app/(app)/(user)/bookshelf/actions";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from "@/components/ui/command";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import { useToast } from "@/components/ui/use-toast";
import { addToBookshelfSchema, searchSchema } from "@/lib/schemas/bookshelf";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useHookFormActionErrorMapper } from "@next-safe-action/adapter-react-hook-form/hooks";
import debounce from "lodash.debounce";
import { Check, ChevronsUpDown } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface Option {
  value: string;
  label: string;
}

export function AddToBookshelfForm({
  toggleOpen
}: {
  toggleOpen: (state: boolean) => void;
}) {
  const [options, setOptions] = useState<Option[]>([]);
  const { toast } = useToast();
  const { result, executeAsync, isExecuting } = useAction(addBookToBookshelf);

  const { hookFormValidationErrors } = useHookFormActionErrorMapper<
    typeof addToBookshelfSchema
  >(result.validationErrors);

  const form = useForm<z.output<typeof addToBookshelfSchema>>({
    resolver: zodResolver(addToBookshelfSchema),
    errors: hookFormValidationErrors,
    mode: "all",
    defaultValues: {
      bookId: ""
    }
  });

  async function onAddToBookshelf(
    values: z.output<typeof addToBookshelfSchema>
  ) {
    const res = await executeAsync(values);
    if (res?.data?.error) {
      toast({
        variant: "default",
        title: "Oopps...",
        description: res?.data?.error
      });
      return;
    }
    if (res?.data?.data) {
      toast({
        variant: "success",
        title: "Sucesso!",
        description: res.data.data
      });
      toggleOpen(false);
    }
    form.reset(form.getValues());
  }
  const [pending, startTransition] = useTransition();

  const makeSearch = debounce((search: string) => {
    startTransition(async () => {
      if (!search.length) {
        return;
      }
      await searchQuery(search);
    });
  }, 500);

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
      form.setError("bookId", { message: "Pesquisa inválida!" });
      return;
    }

    const newOptions = parsedData.result
      .map((book) => {
        return {
          value: book.id,
          label: `${book.title} - ${book.author}`
        };
      })
      .filter((book) => book.value !== form.getValues("bookId"));
    setOptions((prevOptions) => {
      const selectedOption = prevOptions.find(
        (option) => option.value === form.getValues("bookId")
      );
      if (!selectedOption) return newOptions;
      return [selectedOption, ...newOptions];
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onAddToBookshelf)}
        className="flex flex-col items-end gap-4 [&>div]:w-full"
      >
        <FormField
          control={form.control}
          name="bookId"
          render={({ field }) => (
            <FormItem>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="noShadow"
                      role="combobox"
                      className="w-full justify-between"
                    >
                      {field.value
                        ? options.find((option) => option.value === field.value)
                            ?.label
                        : "Selecione ou pesquise..."}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent
                  className="popover-w-100 p-0"
                  side="bottom"
                  align="start"
                >
                  <Command shouldFilter={false}>
                    <CommandInput
                      placeholder="Pesquise..."
                      onValueChange={(search) => makeSearch(search.trim())}
                    />
                    <CommandList>
                      {pending && (
                        <div className="p-4 text-sm">Procurando...</div>
                      )}
                      {!pending && (
                        <CommandEmpty>Nenhuma opção encontrada</CommandEmpty>
                      )}
                      <CommandGroup>
                        {!pending &&
                          options.map((option) => (
                            <CommandItem
                              value={option.label}
                              key={option.value}
                              onSelect={() => {
                                form.setValue("bookId", option.value);
                              }}
                              className="my-2 cursor-pointer"
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  field.value === option.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              {option.label}
                            </CommandItem>
                          ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </FormItem>
          )}
        />
        <Button size="sm" className="mt-4" disabled={isExecuting}>
          Adicionar
        </Button>
      </form>
    </Form>
  );
}
