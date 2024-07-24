import "@ui/styles/globals.css";
import "@ui/styles/project.css";
import '@telegram-apps/telegram-ui/dist/styles.css';

import type { Metadata } from "next";
import { Roboto_Flex } from "next/font/google";
import { VisuallyHidden } from "@telegram-apps/telegram-ui";
import ReduxProvider from "@shared/redux/Provider";

import { Dialog, DialogContent, DialogFooter, DialogTitle } from "@ui/components/dialog";
import { cn } from "@ui/lib/utils";

import { BottomNav } from "../@navigator/BottomNav";
import { RootContainer } from "../@root/RootContainer";
import InitApp from "../@root/InitApp";

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
            <body className={cn('flex flex-col items-center justify-between min-h-screen bg-indigo-500', robotoFlex.className)}>
                <Dialog open={true}>
                    <DialogContent className="!max-w-md min-h-screen bg-black !text-white border-none m-0 p-0">
                        <VisuallyHidden>
                            <DialogTitle></DialogTitle>
                        </VisuallyHidden>
                        <RootContainer>
                            <ReduxProvider>
                                <InitApp>
                                    {children}
                                </InitApp>
                            </ReduxProvider>
                        </RootContainer>
                        <DialogFooter className="fixed bottom-0 w-full z-[5000]">
                            <BottomNav />
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </body>
        </html>
    );
}
