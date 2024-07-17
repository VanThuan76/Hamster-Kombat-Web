import "@ui/styles/globals.css";
import "@ui/styles/project.css";
import type { Metadata } from "next";
import { Roboto_Flex } from "next/font/google";
import { Dialog, DialogContent, DialogFooter } from "@ui/components/dialog"
import { cn } from "@ui/lib/utils";

import { BottomNav } from "../@navigator/bottom-nav";

const robotoFlex = Roboto_Flex({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Hamster Kombat",
    description: "Hamster Kombat Web",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}): JSX.Element {
    return (
        <html lang="en">
            <body className={cn('flex flex-col items-center justify-between min-h-screen p-24 bg-indigo-500', robotoFlex.className)}>
                <Dialog open={true}>
                    <DialogContent className="!rounded-3xl !max-w-md h-[90%] md:h-[85%] bg-black !text-white border-none m-0 p-0 overflow-hidden">
                        {children}
                        <DialogFooter className="relative w-full z-[5000]">
                            <BottomNav />
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </body>
        </html>
    );
}
