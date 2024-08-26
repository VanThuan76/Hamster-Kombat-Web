"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { cn } from "@ui/lib/utils";
import useLocalStorage from "@shared/hooks/useLocalStorage";

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
  const [isCached, setIsCached] = useState(false);
  const [imageCached, setImageCached] = useLocalStorage<string>(
    `image_cached_${url}`,
    "",
  );

  useEffect(() => {
    // Kiểm tra xem ảnh đã được cache chưa
    if (imageCached) {
      setIsCached(true);
    }
  }, [url]);

  const handleImageLoad = () => {
    // Sau khi ảnh đã tải thành công, lưu trạng thái vào localStorage
    setImageCached(`image_cached_${url}`);
    setIsCached(true);
  };

  if (isCached) {
    // Dùng NextImage khi ảnh đã được tải và cache
    return (
      <Image
        src={url}
        alt={title || ""}
        width={width}
        height={height}
        className={cn(nextImageProps?.className, "transition-all object-cover")}
        priority={nextImageProps?.priority}
        // Chỉ sử dụng `loading` khi `priority` không được đặt
        loading={
          !nextImageProps?.priority
            ? nextImageProps?.loading || "lazy"
            : undefined
        }
        quality={75}
      />
    );
  }

  // Dùng CtfPicture cho lần tải đầu
  const commonProps = {
    alt: title || "",
    loading: nextImageProps?.priority
      ? undefined
      : nextImageProps?.loading || "lazy",
    fetchPriority: nextImageProps?.priority ? "high" : "auto", // Đảm bảo fetchPriority là 'high' hoặc 'auto'
    className: cn(nextImageProps?.className, "transition-all object-cover"),
    width: width,
    height: height,
    onLoad: handleImageLoad, // Gọi khi ảnh đã tải xong
  };

  return (
    <picture>
      <source media="(max-width: 740px)" srcSet={`${url}?w=300&h=200`} />
      <source media="(max-width: 980px)" srcSet={`${url}?w=800&h=500`} />
      <source media="(min-width: 1280px)" srcSet={`${url}?w=1024&h=768`} />
      <source
        media="(min-width: 1480px)"
        srcSet={`${url}?w=${width}&h=${height}`}
      />
      <img {...commonProps} src={`${url}?w=${width}&h=${height}`} />
    </picture>
  );
};
