import { Dialog, DialogContent, DialogFooter } from "@ui/components/dialog";
import LazyWrapper from "@ui/components/motion/LazyWrapper"
import { Toaster } from "@shared/toaster";

import { BottomNav } from "../../@navigator/BottomNav";
import LocaleLayout from "../layout";


export default function ScreenLayout({
    children,
    params: { locale }
}: Readonly<{
    children: React.ReactNode
    params: { locale: string }
}>) {

    return (
        <LocaleLayout params={{ locale }}>
            <Dialog open={true}>
                <DialogContent className="!max-w-md h-screen bg-black !text-white border-none m-0 p-0">
                    <LazyWrapper>
                        {children}
                    </LazyWrapper>
                    <DialogFooter className="fixed bottom-0 w-full z-[5000]">
                        <BottomNav />
                        <Toaster />
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </LocaleLayout>
    );
}