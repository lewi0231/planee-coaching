import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const colorPairs = [
  { foreground: 'text-yellow-950', background: 'bg-blue-200' },
  { foreground: 'text-blue-900', background: 'bg-yellow-200' },
  { foreground: 'text-blue-950', background: 'bg-pink-200' },
  { foreground: 'text-blue-950', background: 'bg-red-300' },
  { foreground: 'text-gray-950', background: 'bg-gray-400' },
]

export const getRandomColorCombination = () => {
  const index = Math.floor(Math.random() * colorPairs.length)
  return colorPairs[index]!
}

