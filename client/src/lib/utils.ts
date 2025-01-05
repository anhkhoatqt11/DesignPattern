import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const baseApiUrl = "https://skylark-entertainment.vercel.app";
// export const baseApiUrl = "http://192.168.1.13:5000";
