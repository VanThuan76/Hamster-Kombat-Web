'use client'

import Image from "next/image";

import { useDraw } from "@shared/hooks/useDraw";

import Drawer from "@ui/components/drawer"
import TypographyLarge from "@ui/components/typography/large";
import TypographySmall from "@ui/components/typography/small";

import InfoWalletTON from "../InfoWalletTON";

const DrawerWalletConnect = () => {
    const { isOpen, onClose, type } = useDraw()

    const isDrawerOpen = isOpen && type === "walletConnect"

    return (
        <Drawer isOpen={isDrawerOpen} onClose={onClose} className="w-full card-has-glow h-[75%] border-none">
            <div className="w-full flex flex-col justify-center items-center gap-8">
                <div className="relative visible">
                    <div className="relative z-10">
                        <Image src="/project/airdrop_connect_ton_wallet.png" alt="@airdrop_connect_ton_wallet" width={115} height={115} priority={true} />
                    </div>
                </div>
                <div className="w-full flex flex-col justify-center items-center gap-5">
                    <TypographyLarge text="Kết nối ví TON của bạn" className="text-white text-[32px] font-bold" />
                    <TypographySmall text="Kết nối ví tiền điện tử của bạn.  Nếu bạn chưa có, hãy tạo một cái trong tài khoản Telegram của bạn" className="text-white text-[14px] max-w-[280px] font-normal" />
                </div>
                <InfoWalletTON />
            </div>
        </Drawer>
    )
}
export default DrawerWalletConnect;
