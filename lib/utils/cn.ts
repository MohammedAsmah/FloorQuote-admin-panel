/**
 * cn Utility
 * 
 * Simple className utility for merging Tailwind classes.
 * Replaces clsx/cn for lightweight class merging.
 */

export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}
