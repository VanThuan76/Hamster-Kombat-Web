import { VisuallyHidden } from "@telegram-apps/telegram-ui";

import { Dialog, DialogContent, DialogFooter, DialogTitle } from "@ui/components/dialog";

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
                    <VisuallyHidden>
                        <DialogTitle></DialogTitle>
                    </VisuallyHidden>
                    {children}
                    <DialogFooter className="fixed bottom-0 w-full z-[5000]">
                        <BottomNav />
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </LocaleLayout>
    );
}
