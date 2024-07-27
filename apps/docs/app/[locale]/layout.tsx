import "@ui/styles/globals.css";
import "@ui/styles/project.css";

import type { Metadata } from "next";
import Script from "next/script";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { Roboto_Flex } from "next/font/google";

import { Dialog, DialogContent } from "@ui/components/dialog"
import { cn } from "@ui/lib/utils";

import SdkTeleSolidWrapper from "@shared/components/SdkTeleSolidWrapper";

const robotoFlex = Roboto_Flex({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Hamster Kombat",
  description: "Hamster Kombat Web",
};

export default async function LocaleLayout({
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
      <body className={cn('flex flex-col items-center justify-between min-h-screen p-24 bg-indigo-500', robotoFlex.className)}>
        <NextIntlClientProvider messages={translate}>
          <SdkTeleSolidWrapper>
            <Dialog open={true}>
              <DialogContent className="!max-w-md h-screen bg-black !text-white border-none m-0 p-0">
                {children}
              </DialogContent>
            </Dialog>
          </SdkTeleSolidWrapper>
        </NextIntlClientProvider>
        <Script
          type='text/javascript'
          src='../node_modules/tw-elements/dist/js/tw-elements.umd.min.js'
        ></Script>
      </body>
    </html>
  );
}
