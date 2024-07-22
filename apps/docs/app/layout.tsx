import "@ui/styles/globals.css";
import "@ui/styles/project.css";

import type { Metadata } from "next";
import { Roboto_Flex } from "next/font/google";
import { Dialog, DialogContent } from "@ui/components/dialog"
import { cn } from "@ui/lib/utils";

import ReduxProvider from "@shared/redux/Provider";

import { RootContainer } from "./@root/RootContainer";
import InitApp from "./@root/InitApp";

const robotoFlex = Roboto_Flex({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Hamster Kombat",
  description: "Hamster Kombat Web",
};

export default function RootLayout({
  root,
  children,
  navigator
}: {
  root: any;
  children: React.ReactNode;
  navigator: any;
}): JSX.Element {
  return (
    <html lang="vi">
      <link rel="icon" href="/project/icon_hamster-coin.png" sizes="any" />
      <body className={cn('flex flex-col items-center justify-between min-h-screen p-24 bg-indigo-500', robotoFlex.className)}>
        <Dialog open={true}>
          <DialogContent className="!max-w-md h-screen bg-black !text-white border-none m-0 p-0">
            <RootContainer>
              <ReduxProvider>
                <InitApp>
                  {children}
                </InitApp>
              </ReduxProvider>
            </RootContainer>
          </DialogContent>
        </Dialog>
      </body>
    </html>
  );
}
