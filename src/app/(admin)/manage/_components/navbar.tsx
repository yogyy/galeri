import { Link } from "@/components/ui/link"

export function Navbar() {
  return (
    <nav className="bg-black/10 backdrop-blur">
      <ul className="container flex gap-3">
        <NavbarLinks />
      </ul>
    </nav>
  )
}

function NavbarLinks() {
  return ["gallery", "manage"].map((i) => (
    <li key={i} className="px-2 py-3">
      <Link href={`/${i}`}>{i.charAt(0).toUpperCase() + i.slice(1)}</Link>
    </li>
  ))
}
