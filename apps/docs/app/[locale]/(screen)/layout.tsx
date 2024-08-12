'use client'
import LazyWrapper from "@ui/components/motion/LazyWrapper"
import { Dialog, DialogContent, DialogFooter } from "@ui/components/dialog";

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
        <Dialog open={true}>
            <DialogContent className="!max-w-md h-screen bg-black !text-white border-none m-0 p-0">
                <LazyWrapper>
                    {children}
                </LazyWrapper>
                <DialogFooter className="fixed bottom-0 w-full z-[5000]">
                    <BottomNav />
                    <Toaster />
                </DialogFooter>
                <DrawerProvider />
            </DialogContent>
        </Dialog>
    );
}