"use client";

import { modifyName } from "@/app/(app)/(user)/profile/[[...profile]]/actions";
import { nameEditSchema } from "@/lib/schemas/profile";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckIcon, XIcon } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "../ui/form";
import { Input } from "../ui/input";
import { useToast } from "../ui/use-toast";

export function EditNameInput(props: {
  fullName: string;
  onCancel: () => void;
  onSuccess: (name: string) => void;
}) {
  const { toast } = useToast();
  const { executeAsync, isExecuting } = useAction(modifyName);

  const form = useForm<z.output<typeof nameEditSchema>>({
    resolver: zodResolver(nameEditSchema),
    mode: "onSubmit",
    defaultValues: {
      name: props.fullName ?? ""
    }
  });

  async function editName(payload: z.output<typeof nameEditSchema>) {
    if (payload.name === props.fullName) {
      props.onCancel();
      return;
    }

    const res = await executeAsync(payload);

    if (res?.data?.error) {
      toast({
        title: "Oopps...",
        description: res.data.error
      });
      return;
    }

    if (res?.data?.data) {
      toast({
        variant: "success",
        title: "Sucesso!",
        description: res.data.data
      });
    }
    props.onSuccess(payload.name);
  }

  return (
    <Form {...form}>
      <form
        className={cn([
          "flex w-full justify-between gap-6",
          form.formState.errors.name ? "items-center" : "items-end"
        ])}
        onSubmit={form.handleSubmit(editName)}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input
                  disabled={isExecuting}
                  placeholder="Seu nome completo aqui..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-center gap-2">
          <Button
            size="icon"
            type="button"
            className="min-w-10"
            onClick={props.onCancel}
            disabled={isExecuting}
          >
            <XIcon></XIcon>
          </Button>
          <Button size="icon" className="min-w-10" disabled={isExecuting}>
            <CheckIcon></CheckIcon>
          </Button>
        </div>
      </form>
    </Form>
  );
}
