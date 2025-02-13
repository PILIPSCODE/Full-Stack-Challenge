import { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import clsx from "clsx";

export default function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
