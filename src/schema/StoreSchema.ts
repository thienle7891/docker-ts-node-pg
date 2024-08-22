import { z } from "zod";

export const createStoreSchema = z.object({
  body: z.object({
    store_name: z
      .string()
      .min(1, { message: "Name must be greater than 1 characters!" }),
    password: z
      .string()
      .min(4, { message: "Password must be greater than 4 characters!" }),
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
