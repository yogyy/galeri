"use client"

import type { Photo } from "@/db/schema"

import { Link } from "@/components/ui/link"

import { DeleteButton } from "./delete-button"
import { LazyImage } from "./lazy-image"

interface TweetPhotoProps extends Photo {
  allowDelete?: boolean
  priority?: boolean
}

export function TweetPhoto({
  id,
  priority = false,
  height,
  width,
  authorHandle,
  authorName,
  storageKey,
  tweetUrl,
  allowDelete,
}: TweetPhotoProps) {
  return (
    <div className="group relative overflow-hidden">
      <LazyImage
        src={`https://pbs.twimg.com/media/${storageKey}?format=webp&name=medium`}
        alt={`Illustration by ${authorName}`}
        width={width}
        height={height}
        priority={priority}
      />
      <Link
        href={tweetUrl}
        unstyled
        className="absolute inset-0 flex flex-col justify-end bg-gradient-to-b from-[#0000] to-[#000c] p-6 opacity-0 transition [.group:hover_&]:opacity-100"
      >
        <div className="flex flex-col justify-end">
          <div className="font-semibold text-text-primary">{authorName}</div>
          <div className="text-sm text-text-secondary">{authorHandle}</div>
        </div>
      </Link>
      {allowDelete ? <DeleteButton id={id} /> : null}
    </div>
  )
}
