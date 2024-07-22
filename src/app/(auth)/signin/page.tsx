import { redirect } from "next/navigation"

import { validateRequest } from "@/lib/lucia-auth"

import { SignInForm } from "./signin-form"

export default async function Page() {
  const { session } = await validateRequest()

  if (session) redirect("/")

  return (
    <>
      <h1>Sign in</h1>
      <SignInForm />
    </>
  )
}
