import { z } from "zod"

export const uploadPhoto = z.object({
  storageKey: z.string(),
  width: z.string(),
  height: z.string(),
  tweetUrl: z.string().startsWith("https://twitter.com/"),
  authorName: z.string(),
  authorHandle: z.string().startsWith("@"),
})

export type UploadPhotoSchema = z.infer<typeof uploadPhoto>
