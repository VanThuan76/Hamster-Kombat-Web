"use client";

import Image from "next/image";
import { cn } from "@ui/lib/utils";

interface ImageProps {
  url: string;
  width: number;
  height: number;
  title?: string;
  nextImageProps?: {
    className?: string;
    priority?: boolean;
    loading?: "eager" | "lazy";
  };
}

export const CtfPicture = ({
  url,
  width,
  height,
  title,
  nextImageProps,
}: ImageProps) => {
  return (
    <Image
      src={url}
      alt={title || ""}
      width={width}
      height={height}
      className={cn(nextImageProps?.className, "transition-all object-cover")}
      priority={true}
      quality={75}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
    />
  );
};
