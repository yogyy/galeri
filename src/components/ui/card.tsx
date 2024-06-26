import { forwardRef } from "react"

import { cn } from "@/lib/utils"

export const Card = forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div">
>(function Card({ className, children, ...rest }, ref) {
  return (
    <div
      // eslint-disable-next-line tailwindcss/migration-from-tailwind-2
      className={cn(
        "overflow-clip", // overflow-hidden will prevent sticky positioning from working
        "card rounded-full bg-bg-idle p-6 backdrop-blur transition",
        className
      )}
      {...rest}
      ref={ref}
    >
      {children}
    </div>
  )
})
