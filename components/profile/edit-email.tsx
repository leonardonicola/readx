"use client";
import { modifyEmail } from "@/app/(app)/(user)/profile/[[...profile]]/actions";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { emailEdit, pinSchema } from "@/lib/schemas/profile";
import { useUser } from "@clerk/nextjs";
import { isClerkAPIResponseError } from "@clerk/nextjs/errors";
import { EmailAddressResource } from "@clerk/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import { EditIcon } from "lucide-react";
import { useState } from "react";
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
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";
import { Tabs, TabsContent } from "../ui/tabs";
import { useToast } from "../ui/use-toast";
export function EditEmail({ currEmail }: { currEmail: string }) {
  const [currStep, setCurrStep] = useState<"form" | "confirmation">("form");
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [emailObj, setEmailObj] = useState<EmailAddressResource | undefined>();
  const { user } = useUser();
  const { toast } = useToast();

  const form = useForm<z.output<typeof emailEdit>>({
    resolver: zodResolver(emailEdit),
    mode: "onBlur",
    defaultValues: {
      email: currEmail
    }
  });

  const otpForm = useForm<z.output<typeof pinSchema>>({
    resolver: zodResolver(pinSchema),
    mode: "all",
    defaultValues: {
      pin: ""
    }
  });
  async function onNextStep({ email }: z.output<typeof emailEdit>) {
    try {
      const emailResource = await user?.createEmailAddress({ email });
      await emailResource?.prepareVerification({ strategy: "email_code" });
      setEmailObj(emailResource);
      setCurrStep("confirmation");
    } catch (error) {
      // If email is linked to other user acccount
      if (
        isClerkAPIResponseError(error) &&
        error.errors[0].code === "form_identifier_exists"
      ) {
        form.setError("email", { message: "Email em uso!" });
        return;
      }
      toast({
        title: "Ooops..",
        description:
          "Não conseguimos prosseguir a alteração de seu e-mail por algum erro!",
        variant: "destructive"
      });
    }
  }

  async function verifyEmail({ pin }: z.output<typeof pinSchema>) {
    try {
      // Verify that the code entered matches the code sent to the user
      const emailVerifyAttempt = await emailObj?.attemptVerification({
        code: pin
      });

      // If any code but verified, throw error
      if (emailVerifyAttempt?.verification.status !== "verified") {
        toast({
          title: "Oops...",
          variant: "destructive",
          description:
            "Não foi possível alterar seu e-mail! Aparentemente um erro com nosso parceiro!"
        });
        otpForm.reset(otpForm.getValues());
        return;
      }

      // We need to modify in our e-mail
      const { emailAddress, id } = emailVerifyAttempt!;
      const { error, message } = await modifyEmail({ emailAddress, id });
      if (error) {
        // If error on db update, destroy email verify attempt
        await emailVerifyAttempt.destroy();
        toast({
          title: "Oops...",
          variant: "destructive",
          description: error
        });
        otpForm.reset(otpForm.getValues());
        return;
      }
      toast({
        title: "Sucesso!",
        description: message,
        variant: "success"
      });
      setModalOpen(false);
    } catch (error) {
      // Check if code is incorrect!
      if (isClerkAPIResponseError(error)) {
        if (error.errors[0].code === "form_code_incorrect") {
          otpForm.setError("pin", { message: "Pin incorreto!" });
        }
      }
    }
  }

  function handleModalChange(open: boolean) {
    setModalOpen(open);
    setCurrStep("form");
    otpForm.reset(otpForm.getValues());
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={handleModalChange}>
      <DialogTrigger asChild>
        <Button size="icon" variant="reverse">
          <EditIcon />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Por aqui você altera seu email.</DialogTitle>
          <DialogDescription>Siga as instruções</DialogDescription>
        </DialogHeader>
        <Tabs value={currStep} defaultValue={currStep}>
          <TabsContent value={"form" satisfies "form" | "confirmation"}>
            <Form {...form}>
              <form
                className="flex flex-col items-end gap-12"
                onSubmit={form.handleSubmit(onNextStep)}
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          disabled={form.formState.isSubmitting}
                          placeholder="Seu melhor e-mail..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  variant="neutral"
                  className="w-fit"
                  disabled={
                    !form.formState.isValid ||
                    form.formState.isSubmitting ||
                    form.getValues("email") === currEmail
                  }
                >
                  Continuar
                </Button>
              </form>
            </Form>
          </TabsContent>
          <TabsContent value={"confirmation" satisfies "form" | "confirmation"}>
            <Form {...otpForm}>
              <form
                onSubmit={otpForm.handleSubmit(verifyEmail)}
                className="flex w-full flex-col items-end gap-12"
              >
                <FormField
                  control={otpForm.control}
                  name="pin"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>
                        Digite o código que chegou em seu novo e-mail:
                      </FormLabel>
                      <FormControl>
                        <InputOTP
                          maxLength={6}
                          pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                          {...field}
                        >
                          <InputOTPGroup>
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                            <InputOTPSlot index={2} />
                            <InputOTPSlot index={3} />
                            <InputOTPSlot index={4} />
                            <InputOTPSlot index={5} />
                          </InputOTPGroup>
                        </InputOTP>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  variant="neutral"
                  disabled={
                    otpForm.formState.isSubmitting || !otpForm.formState.isValid
                  }
                >
                  Confirmar
                </Button>
              </form>
            </Form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
