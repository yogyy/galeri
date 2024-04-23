import { login } from "@/lib/authentication"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function Page() {
  return (
    <>
      <h1>Sign in</h1>
      <form className="space-y-4" action={login}>
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
          Login
        </Button>
      </form>
    </>
  )
}
