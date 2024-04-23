import { redirect } from "next/navigation"

import { validateRequest } from "@/lib/auth"
import { Title } from "@/components/title"
import { ProfileForm } from "@/app/(public)/gallery/_comps/form-zod"

export default async function Home() {
  const { user } = await validateRequest()
  if (!user) {
    redirect("/gallery")
  }

  return (
    <main className="container relative max-w-xl min-h-[calc(100dvh_-_48px)] space-y-5">
      <Title
        title="Atmin Page"
        subtitle={
          <h2 className="text-cyan">{`What's good ${user.username}`}</h2>
        }
        className="py-20"
      />
      <h3 className="text-2xl">Add new Photo</h3>
      <ProfileForm />
    </main>
  )
}
