'use client'
import LazyWrapper from "@ui/components/motion/LazyWrapper"

import { Toaster } from "@shared/toaster";
import DrawerProvider from "@shared/drawer";
import useProfitByHour from "@shared/hooks/useProfitByHour";

import { BottomNav } from "../../@navigator/BottomNav";

export default function ScreenLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    useProfitByHour()
    return (
        <div className="w-screen h-full">
            <div className="w-full h-full bg-black !text-white border-none m-0 p-0">
                <LazyWrapper>
                    {children}
                </LazyWrapper>
                <div className="fixed bottom-0 w-full z-[5000]">
                    <BottomNav />
                    <Toaster />
                </div>
                <DrawerProvider />
            </div>
        </div>
    );
}