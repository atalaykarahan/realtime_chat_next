import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const extractTime = (timestamp: string) => {
  const time = timestamp.split("T")[1].split(".")[0];
  return time.slice(0, 5);
};
