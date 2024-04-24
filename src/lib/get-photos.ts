import { unstable_cache as cache } from "next/cache"
import { db } from "@/db"
import { photo, type Photo } from "@/db/schema"
import { desc } from "drizzle-orm"

export const getPhotos = cache(
  async (): Promise<Photo[]> => db.select().from(photo).orderBy(desc(photo)),
  [],
  { tags: ["photo"], revalidate: 86400 } // 1 day
)
