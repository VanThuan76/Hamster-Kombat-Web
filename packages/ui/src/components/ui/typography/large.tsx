"use client";

import { cn } from "@ui/lib/utils";

type TypographyLargeProps = {
  text: string;
  className?: string;
};

export default function TypographyLarge({
  text,
  className = "",
}: TypographyLargeProps) {
  return <div className={cn(`text-lg font-semibold ${className}`)}>{text}</div>;
}
