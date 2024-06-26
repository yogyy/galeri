"use client"

import {
  useEffect as useEffectOriginal,
  useLayoutEffect,
  useMemo,
  useState,
} from "react"
import type { Photo } from "@/db/schema"

import { cn } from "@/lib/utils"

import { TweetPhoto } from "./tweet-photo"

const useEffect =
  typeof window === "undefined" ? useEffectOriginal : useLayoutEffect

const BREAKPOINTS = [640, 1024] // [1] 640 [2] 1024 [3], all are min-width

function useColumnCount() {
  const [columnCount, setColumnCount] = useState<number | null>(null)
  useEffect(() => {
    function handleResize() {
      let currentCount = 1
      for (const breakpoint of BREAKPOINTS)
        if (window.matchMedia(`(min-width: ${breakpoint}px)`).matches)
          currentCount++
      setColumnCount(currentCount)
    }
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])
  return columnCount
}

function useOrganisedPhotos(photos: Photo[], columnCount: number | null) {
  const organisedPhotos = useMemo(() => {
    if (columnCount === null) return []
    const columns: { photos: Photo[]; height: number; index: number }[] =
      new Array(columnCount)
        .fill([])
        .map((_, i) => ({ photos: [], height: 0, index: i }))
    for (const photo of photos) {
      const lowestColumn = columns
        .slice()
        .sort((a, b) => a.height - b.height)[0]
      columns[lowestColumn.index].photos.push(photo)
      columns[lowestColumn.index].height += photo.height / photo.width
    }
    return columns.map((column) => column.photos)
  }, [photos, columnCount])
  return organisedPhotos
}

export function Collage({
  photos,
  allowDelete,
}: {
  photos: Photo[]
  allowDelete?: boolean
}) {
  const count = useColumnCount()
  const columns = useOrganisedPhotos(photos, count)
  const priority = photos.slice(0, 4) ? true : false
  return (
    <div
      className={cn(
        "grid min-h-screen grid-cols-1 divide-x divide-separator transition duration-600 sm:grid-cols-2 lg:grid-cols-3",
        count === null ? "opacity-0" : "opacity-100"
      )}
    >
      {columns.map((column, i) => (
        <div key={i} className="flex flex-col divide-y divide-separator">
          {column.map((photo) => (
            <TweetPhoto
              key={photo.id}
              {...photo}
              priority={priority}
              allowDelete={allowDelete}
            />
          ))}
        </div>
      ))}
    </div>
  )
}
