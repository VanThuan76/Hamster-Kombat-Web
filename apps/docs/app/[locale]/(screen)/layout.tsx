"use client";

import LazyWrapper from "@ui/components/motion/LazyWrapper";

import DrawerProvider from "@shared/drawer";
import useProfitByHour from "@shared/hooks/useProfitByHour";

import { BottomNav } from "../../@navigator/BottomNav";

import { useAppSelector } from "@shared/redux/store";
import Image from "next/image";
import useImagePreloader from "@shared/hooks/useImagePreloader";

export default function ScreenLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { imageUrls } = useAppSelector((state) => state.app);

  const isPreloaded = useImagePreloader(imageUrls);

  useProfitByHour();

  return (
    <div className="relative w-full h-full bg-black !text-white border-none m-0 p-0">
      <LazyWrapper>{children}</LazyWrapper>
      <BottomNav />
      <DrawerProvider />
      {isPreloaded && (
        <div className="invisible pointer-events-none touch-none w-0 h-0">
          {imageUrls.map((url, index) => (
            <Image
              key={index}
              src={url}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              alt={`Image ${index}`}
              width={500}
              height={300}
              layout="responsive"
              loading="lazy"
              decoding="async"
            />
          ))}
        </div>
      )}
    </div>
  );
}
