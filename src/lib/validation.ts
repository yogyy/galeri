import { z } from "zod"

export const authentication = z.object({
  username: z
    .string()
    .regex(new RegExp(/^[a-z0-9_-]+$/), "symbols not allowed")
    .min(4, {
      message: "username must be at least 4 characters",
    }),
  password: z.string().min(6, {
    message: "password must be at least 6 characters",
  }),
})

export type AuthSchema = z.infer<typeof authentication>
