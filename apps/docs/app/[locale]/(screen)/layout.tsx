"use client";

import Image from "next/image";

import LazyWrapper from "@ui/components/motion/LazyWrapper";

import DrawerProvider from "@shared/drawer";
import useProfitByHour from "@shared/hooks/useProfitByHour";

import { useAppSelector } from "@shared/redux/store";
import CoinsAnimationCanvas from "@ui/components/motion/CoinsAnimationCanvas";
import useImagePreloader from "@shared/hooks/useImagePreloader";

import { BottomNav } from "../../@navigator/BottomNav";

export default function ScreenLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const { isCoinAnimating } = useAppSelector(state => state.app)

    useProfitByHour();

    //   const { imageUrls } = useAppSelector((state) => state.app);
    //   const isPreloaded = useImagePreloader(imageUrls);

    return (
        <div className="relative w-full h-full bg-black !text-white border-none m-0 p-0 overflow-hidden">
            <LazyWrapper>{children}</LazyWrapper>
            <BottomNav />
            <DrawerProvider />
            <CoinsAnimationCanvas isAnimating={isCoinAnimating} />
            {/* {isPreloaded && (
        <div className="invisible w-0 h-0 pointer-events-none touch-none">
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
      )} */}
        </div>
    );
}
