import { clsx, type ClassValue } from "clsx";

// cn = className utility
// Menggabungkan class dengan benar, tanpa whitespace bermasalah
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}
