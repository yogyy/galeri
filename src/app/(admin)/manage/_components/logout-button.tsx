import { logout } from "@/lib/authentication"
import { Button } from "@/components/ui/button"

export async function Logout() {
  return (
    <form action={logout}>
      <Button type="submit">Sign out</Button>
    </form>
  )
}
