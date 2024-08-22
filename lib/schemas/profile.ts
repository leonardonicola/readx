import { MaskitoOptions } from "@maskito/core";
import { z } from "zod";

export const brazilPhoneMask = {
  mask: [
    "+",
    "5",
    "5",
    " ",
    "(",
    /\d/,
    /\d/,
    ")",
    " ",
    "9",
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    "-",
    /\d/,
    /\d/,
    /\d/,
    /\d/
  ]
} as MaskitoOptions;

export const emailEdit = z.object({
  email: z
    .string({ required_error: "Obrigatório caso queira mudar né!" })
    .email("E-mail inválido")
});

export const emailAddressSchema = z.object({
  emailAddress: z
    .string({ required_error: "E-mail obrigatório" })
    .email("E-mail inválido"),
  id: z.string({ required_error: "ID do e-mail obrigatório" })
});

export const phoneEdit = z.object({
  phone: z
    .literal("")
    .or(
      z
        .string()
        .regex(new RegExp(/^\+55 \(\d{2}\) 9\d{4}-\d{4}$/), "Telefone inválido")
    )
});

export const pinSchema = z.object({
  pin: z.string().min(6, {
    message: "Pin incorreto!"
  })
});
