"use server"

import { revalidateTag } from "next/cache"
import { db } from "@/db"
import { photo } from "@/db/schema"
import { eq } from "drizzle-orm"

import { generateRandId } from "@/lib/utils"

import { UploadPhotoSchema } from "./validation"

export const uploadNewPhoto = async (input: UploadPhotoSchema) => {
  const photoId = generateRandId("i")
  try {
    await db
      .insert(photo)
      .values({
        ...input,
        id: photoId,
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
  await db.delete(photo).where(eq(photo.id, id))

  revalidateTag("photo")
}
