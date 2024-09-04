import "@ui/styles/globals.css";
import "@ui/styles/project.css";

import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { Roboto_Flex } from "next/font/google";

import { cn } from "@ui/lib/utils";
import Providers from "@shared/provider";

import RootContainer from "../@root/RootContainer";

const robotoFlex = Roboto_Flex({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "Lion King",
  description: "Lion King",
};

export default async function LocaleLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const translate = await getMessages();

  return (
    <html
      suppressHydrationWarning
      lang={locale}
      className={robotoFlex.className}
    >
      <link rel="icon" href="/project/icon_lion_coin.png" sizes="any" />
      <body
        className={cn(
          "relative w-full flex flex-col items-center justify-between h-full bg-black",
        )}
      >
        <NextIntlClientProvider messages={translate}>
          <Providers>
            <RootContainer>
              <div className="w-screen h-full bg-black !text-white border-none m-0 p-0 overflow-hidden">
                {children}
              </div>
            </RootContainer>
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
