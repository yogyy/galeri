import { cn } from "@/lib/utils"

import "./globals.css"

import type { Metadata } from "next"
import { Hanken_Grotesk as HankenGrotesk, Inter } from "next/font/google"
import localFont from "next/font/local"
import { Toaster } from "sonner"

import { Background } from "./_components/background"
import { Navbar } from "./_components/navbar"

const sans = HankenGrotesk({ subsets: ["latin"], variable: "--sans" })
const mono = localFont({
  src: [
    {
      path: "../../.fonts/ia-writer-mono/regular.woff2",
      weight: "normal",
      style: "normal",
    },
    {
      path: "../../.fonts/ia-writer-mono/bold.woff2",
      weight: "bold",
      style: "normal",
    },
    {
      path: "../../.fonts/ia-writer-mono/italic.woff2",
      weight: "normal",
      style: "italic",
    },
    {
      path: "../../.fonts/ia-writer-mono/bolditalic.woff2",
      weight: "bold",
      style: "italic",
    },
  ],
  display: "swap",
  declarations: [{ prop: "size-adjust", value: "90%" }],
  variable: "--mono",
  adjustFontFallback: false,
})

export const metadata: Metadata = {
  title: "Galeri",
  description: "Collection image that i liked on X / Twitter",
  openGraph: {
    type: "website",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          sans.variable,
          mono.variable,
          "bg-[#334155] font-sans text-text-primary"
        )}
      >
        <Navbar />
        <Background />
        {children}
        <Toaster />
      </body>
    </html>
  )
}
