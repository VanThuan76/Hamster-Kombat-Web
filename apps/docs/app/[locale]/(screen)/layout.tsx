import "@ui/styles/globals.css";
import "@ui/styles/project.css";
import '@telegram-apps/telegram-ui/dist/styles.css';

import type { Metadata } from "next";
import Script from "next/script";
import { Roboto_Flex } from "next/font/google";
import { getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { VisuallyHidden } from "@telegram-apps/telegram-ui";
import Providers from "@shared/provider";

import { Dialog, DialogContent, DialogFooter, DialogTitle } from "@ui/components/dialog";
import { cn } from "@ui/lib/utils";

import { BottomNav } from "../../@navigator/BottomNav";
import { RootContainer } from "../../@root/RootContainer";
import InitApp from "../../@root/InitApp";

const robotoFlex = Roboto_Flex({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Hamster Kombat",
    description: "Hamster Kombat Web",
};

export default async function ScreenLayout({
    children,
    params: { locale }
}: Readonly<{
    children: React.ReactNode
    params: { locale: string }
}>) {
    const translate = await getMessages()

    return (
        <html lang={locale}>
            <link rel="icon" href="/project/icon_hamster-coin.png" sizes="any" />
            <body className={cn('flex flex-col items-center justify-between min-h-screen bg-indigo-500 overflow-hidden', robotoFlex.className)}>
                <NextIntlClientProvider messages={translate}> //I18
                    <RootContainer> //SDK
                        <Providers> //Anohter Provider Third Party
                            <InitApp> //Launch Data
                                <Dialog open={true}>
                                    <DialogContent className="!max-w-md h-screen bg-black !text-white border-none m-0 p-0">
                                        <VisuallyHidden>
                                            <DialogTitle></DialogTitle>
                                        </VisuallyHidden>
                                        {children}
                                        <DialogFooter className="fixed bottom-0 w-full z-[5000]">
                                            <BottomNav />
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>
                            </InitApp>
                        </Providers>
                    </RootContainer>
                </NextIntlClientProvider>
                <Script
                    type='text/javascript'
                    src='../node_modules/tw-elements/dist/js/tw-elements.umd.min.js'
                ></Script>
            </body>
        </html>
    );
}
