import { validateRequest } from "@/lib/auth"
import { Link } from "@/components/ui/link"

export async function Navbar() {
  const { user } = await validateRequest()
  if (!user) return

  return (
    <nav className="bg-black/70">
      <ul className="flex gap-3 container">
        <NavbarLinks />
      </ul>
    </nav>
  )
}

function NavbarLinks() {
  return ["gallery", "signin", "signup", "home"].map((i) => (
    <li key={i} className="px-2 py-3">
      <Link href={`/${i}`}>{i.charAt(0).toUpperCase() + i.slice(1)}</Link>
    </li>
  ))
}
