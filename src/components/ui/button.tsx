"use client"

import { forwardRef } from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

import { useHoverBackground } from "./hooks/use-hover-background"
import { Link } from "./link"

export const buttonVariants = cva(
  "hover-bg inline-flex shrink-0 flex-row items-center justify-center gap-[--button-gap] rounded-full outline-offset-4 backdrop-blur transition disabled:cursor-not-allowed disabled:bg-bg-disabled disabled:text-text-tertiary",
  {
    variants: {
      variant: {
        primary: "bg-text-primary text-black shadow disabled:shadow-none",
        secondary: "bg-bg-idle text-text-primary active:bg-bg-active",
        ghost:
          "bg-transparent text-text-primary hover:bg-bg-hover active:bg-bg-active",
      },
      size: {
        sm: "w-fit px-3 py-1 text-sm [--button-gap:0.25rem] [&_svg]:size-4",
        md: "w-fit px-4 py-2 text-base [--button-gap:0.5rem] [&_svg]:size-6",
        lg: "w-fit px-5 py-2.5 text-lg [--button-gap:0.75rem] [&_svg]:size-7",
        "icon-sm":
          "h-[30px] w-[30px] p-1 [--button-gap:0.25rem] [&_svg]:size-4",
        "icon-md": "h-[42px] w-[42px] p-2 [--button-gap:0.5rem] [&_svg]:size-6",
        "icon-lg":
          "h-[50px] w-[50px] p-2.5 [--button-gap:0.75rem] [&_svg]:size-7",
      },
    },
    defaultVariants: {
      variant: "secondary",
      size: "md",
    },
  }
)

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    { variant, className, style, onMouseMove, children, ...rest },
    ref
  ) {
    return (
      <button
        className={cn(buttonVariants({ variant, className }))}
        type="button"
        {...rest}
        {...useHoverBackground({ style, onMouseMove })}
        ref={ref}
      >
        {children}
      </button>
    )
  }
)

interface LinkButtonProps
  extends React.ComponentPropsWithoutRef<typeof Link>,
    VariantProps<typeof buttonVariants> {}

export const LinkButton = forwardRef<HTMLAnchorElement, LinkButtonProps>(
  function LinkButton(
    { variant, href, className, style, onMouseMove, children, ...rest },
    ref
  ) {
    return (
      <Link
        unstyled
        className={cn(buttonVariants({ variant, className }))}
        href={href}
        {...rest}
        {...useHoverBackground({ style, onMouseMove })}
        ref={ref}
      >
        {children}
      </Link>
    )
  }
)
