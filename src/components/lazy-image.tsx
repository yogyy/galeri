/* eslint-disable @next/next/no-img-element */
"use client"

import { useEffect, useState } from "react"
import Image, { ImageProps } from "next/image"
import { useInView } from "react-intersection-observer"

import { cn } from "@/lib/utils"

export function LazyImageBlob({
  src,
  alt,
  className,
  ...props
}: React.ComponentProps<"img"> & { width: number; height: number }) {
  const { ref, inView } = useInView()
  const [dataUrl, setDataUrl] = useState<string | null>(null)

  useEffect(() => {
    // This is *not* run twice in dev+strict mode whenever inView changes. Guess why?
    if (!inView || !src || dataUrl) return
    const controller = new AbortController()
    const timeout = setTimeout(
      () =>
        fetch(src, { signal: controller.signal })
          .then((res) => res.arrayBuffer())
          .then((arrayBuffer) =>
            setDataUrl(URL.createObjectURL(new Blob([arrayBuffer])))
          )
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
      <img
        src={
          dataUrl ||
          `data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${props.width} ${props.height}'%3e%3c/svg%3e`
        }
        {...props}
        alt={alt}
        className={cn(
          "transition duration-600",
          dataUrl ? "opacity-100" : "opacity-0",
          className
        )}
      />
    </div>
  )
}

export function LazyImage({ src, alt, className, ...props }: ImageProps) {
  const { ref, inView } = useInView({ rootMargin: "-10% 0px" })
  const [dataUrl, setDataUrl] = useState<string | null>(null)

  useEffect(() => {
    if (!inView || !src || dataUrl) return
    const timeout = setTimeout(() => setDataUrl(src as string), 100)

    return () => clearTimeout(timeout)
  }, [inView, src, dataUrl])

  return (
    <div ref={ref}>
      <Image
        src={
          dataUrl ||
          `data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${props.width} ${props.height}'%3e%3c/svg%3e`
        }
        alt={alt}
        className={cn(
          "transition duration-600",
          dataUrl ? "opacity-100" : "opacity-0",
          className
        )}
        unoptimized
        {...props}
      />
    </div>
  )
}
