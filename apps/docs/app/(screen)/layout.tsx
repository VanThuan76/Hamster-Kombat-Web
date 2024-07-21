import "@ui/styles/globals.css";
import "@ui/styles/project.css";
import '@telegram-apps/telegram-ui/dist/styles.css';

import type { Metadata } from "next";
import { Roboto_Flex } from "next/font/google";
import { Dialog, DialogContent, DialogFooter } from "@ui/components/dialog"
import { cn } from "@ui/lib/utils";

import { BottomNav } from "../@navigator/bottom-nav";
import { RootContainer } from "../@root/RootContainer";

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
            <body className={cn('flex flex-col items-center justify-between h-screen p-24 bg-indigo-500', robotoFlex.className)}>
                <Dialog open={true}>
                    <DialogContent className="!max-w-md h-screen bg-black !text-white border-none m-0 p-0">
                        <RootContainer>
                            {children}
                        </RootContainer>
                        <DialogFooter className="relative w-full z-[5000]">
                            <BottomNav />
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </body>
        </html>
    );
}
