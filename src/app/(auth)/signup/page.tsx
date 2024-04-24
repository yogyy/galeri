import { redirect } from "next/navigation"

import { register } from "@/lib/authentication"
import { validateRequest } from "@/lib/lucia-auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default async function Page() {
  const { user } = await validateRequest()

  if (!user) redirect("/")

  return (
    <>
      <h1>Create an account</h1>
      <form className="space-y-4" action={register}>
        <div className="space-y-2">
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            placeholder="Enter your username"
            name="username"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            placeholder="Enter your password"
            type="password"
            name="password"
          />
        </div>
        <Button
          className="w-full bg-cyan font-semibold text-black"
          type="submit"
        >
          Register
        </Button>
      </form>
    </>
  )
}
