"use server"

import { revalidateTag } from "next/cache"
import { db } from "@/db"
import { photo } from "@/db/schema"
import { eq } from "drizzle-orm"

import { UploadPhotoSchema } from "./validation"

export const uploadNewPhoto = async (input: UploadPhotoSchema) => {
  try {
    await db
      .insert(photo)
      .values({
        ...input,
        width: parseInt(input.width),
        height: parseInt(input.height),
      })
      .returning()
    revalidateTag("photo")
  } catch (err) {
    return err
  }
}

export const deletePhoto = async (id: string) => {
  await db.delete(photo).where(eq(photo.id, id)).returning()

  revalidateTag("photo")
}
