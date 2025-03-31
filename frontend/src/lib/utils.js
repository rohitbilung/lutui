import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const getUserInitails = (name = "NA") => {
  if (!name.trim()) return "NA"; // Default if no name is provided
  
  const words = name.trim().split(/\s+/); // Split by spaces
  
  if (words.length === 1) {
    return words[0][0].toUpperCase(); // Single word -> First letter
  }

  return (words[0][0] + words[words.length - 1][0]).toUpperCase(); // First + Last initials
};