import { clsx, type ClassValue } from "clsx"
import { nanoid } from "nanoid"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const generateRandId = (prefix = "", length = 21) => {
  const randomPart = nanoid(length)
  return prefix ? `${prefix}_${randomPart}` : randomPart
}
