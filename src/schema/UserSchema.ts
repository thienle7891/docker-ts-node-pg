import { z } from "zod";

export const createUserSchema = z.object({
  body: z.object({
    username: z
      .string()
      .min(1, { message: "Name must be greater than 1 characters!" }),
    password: z
      .string()
      .min(4, { message: "Descrition must be greater than 4 characters!" }),
    store_id: z.number(),
  }),
});

export const updateUserSchema = z.object({
  params: z.object({ id: z.string() }),
  body: z
    .object({
      username: z
        .string()
        .min(1, { message: "Name must be greater than 1 characters!" }),
      password: z
        .string()
        .min(4, { message: "Descrition must be greater than 4 characters!" }),
    })
    .partial(),
});
