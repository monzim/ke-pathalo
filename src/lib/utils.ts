import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function timeFuture(date: Date | null | undefined) {
  if (!date) {
    return "";
  }

  const now = new Date();
  const diff = date.getTime() - now.getTime();

  // check if the time is in the past
  if (diff < 0) {
    return formatTime(date, "do MMM-yy HH:MM:SS");
  }

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return `${days} days from now`;
  }

  if (hours > 0) {
    return `${hours} hour from now`;
  }

  if (minutes > 0) {
    return `${minutes} minutes from now`;
  }

  return `${seconds} seconds from now`;
}

export function timeAgo(date: Date | null | undefined) {
  if (!date) {
    return "";
  }

  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 7) {
    return formatTime(date, "do MMM-yy HH:MM:SS");
  }

  if (days > 0) {
    return `${days}d ago`;
  }

  if (hours > 0) {
    return `${hours}h ago`;
  }

  if (minutes > 0) {
    return `${minutes}m ago`;
  }

  return `${seconds}s ago`;
}

export function formatTime(date: Date, pattern: string) {
  return new Intl.DateTimeFormat("en-US", { dateStyle: "medium" }).format(date);
}
