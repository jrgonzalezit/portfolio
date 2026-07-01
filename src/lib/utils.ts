import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import readingTime from "reading-time"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string, options?: Intl.DateTimeFormatOptions) {
  return new Date(date).toLocaleDateString("es-AR", {
    year: "numeric",
    month: "long",
    ...options,
  })
}

export function getReadingTime(markdown: string) {
  const { minutes } = readingTime(markdown)
  const rounded = Math.max(1, Math.ceil(minutes))
  return `${rounded} min de lectura`
}
