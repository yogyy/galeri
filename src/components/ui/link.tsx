import { forwardRef } from "react"
import NextLink from "next/link"

import { cn } from "@/lib/utils"

export const Link = forwardRef<
  HTMLAnchorElement,
  React.ComponentPropsWithoutRef<typeof NextLink> & {
    href: string
    unstyled?: boolean
  }
>(function Link({ href, className, unstyled, ...rest }, ref) {
  const isExternal = href.startsWith("http")
  return (
    <NextLink
      href={href}
      className={cn(unstyled || "link", className)}
      {...rest}
      {...(isExternal ? { target: "_blank", rel: "noreferrer noopener" } : {})}
      ref={ref}
    />
  )
})
