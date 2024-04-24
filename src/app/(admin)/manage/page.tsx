import { redirect } from "next/navigation"

import { getPhotos } from "@/lib/get-photos"
import { validateRequest } from "@/lib/lucia-auth"
import { Collage } from "@/components/collage"

export default async function Page() {
  const { user } = await validateRequest()
  // prevent user access
  if (user?.role !== "admin") redirect("/")

  const photos = await getPhotos()
  return <Collage photos={photos} allowDelete />
}
