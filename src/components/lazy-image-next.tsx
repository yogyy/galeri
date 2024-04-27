"use client"

import { useEffect, useState } from "react"
import Image, { ImageProps } from "next/image"
import { useInView } from "react-intersection-observer"

import { cn } from "@/lib/utils"

export function LazyImage({
  src,
  alt,
  className,
  ...props
}: Omit<ImageProps, "src"> & { src: RequestInfo | URL }) {
  const { ref, inView } = useInView()
  const [dataUrl, setDataUrl] = useState<string | null>(null)

  useEffect(() => {
    // This is *not* run twice in dev+strict mode whenever inView changes. Guess why?
    if (!inView || !src || dataUrl) return
    const controller = new AbortController()
    const timeout = setTimeout(
      () =>
        fetch(src, { signal: controller.signal })
          .then((res) => setDataUrl(res.url))
          .catch((err) =>
            (err as { name: string }).name === "AbortError"
              ? null
              : console.error(err)
          ),
      100
    )
    return () => {
      controller.abort()
      clearTimeout(timeout)
    }
  }, [inView, src, dataUrl])

  return (
    <div ref={ref}>
      <Image
        src={
          dataUrl ||
          `data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${props.width} ${props.height}'%3e%3c/svg%3e`
        }
        {...props}
        alt={alt || "images"}
        className={cn(
          "transition duration-600",
          dataUrl ? "opacity-100" : "opacity-0",
          className
        )}
        unoptimized
      />
    </div>
  )
}
