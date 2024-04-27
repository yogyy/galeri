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
  const links = ["home", "manage"]

  return links.map((link) => (
    <li key={link} className="px-2 py-3">
      <Link href={link === "home" ? "/" : `/${link}`}>
        {link.charAt(0).toUpperCase() + link.slice(1)}
      </Link>
    </li>
  ))
}
