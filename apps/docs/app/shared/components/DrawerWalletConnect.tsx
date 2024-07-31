'use client'

import Image from "next/image";
import { useState } from "react"
import { useTonWallet } from '@tonconnect/ui-react';

import Drawer from "@ui/components/drawer"
import MotionContainer from "@ui/components/motion/container"
import TypographyLarge from "@ui/components/typography/large";
import TypographySmall from "@ui/components/typography/small";
import InfoWalletTON from "./InfoWalletTON";

export default function DrawerWalletConnect(): JSX.Element {
    const wallet = useTonWallet();

    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const handleOpenDrawer = () => setIsDrawerOpen(true);
    const handleCloseDrawer = () => setIsDrawerOpen(false);


    return (
        <>
            <div className="flex flex-col justify-start items-start gap-2 cursor-pointer" onClick={handleOpenDrawer}>
                <TypographySmall text="Danh sách công việc" className="text-base text-white mt-5" />
                <div className="w-full flex justify-between items-center rounded-2xl min-h-[64px] px-3" style={{ background: 'linear-gradient(98deg, #35a6eb 3.58%, #309adb 101.32%)' }}>
                    <div className="flex justify-start items-center gap-2">
                        <MotionContainer type="scale">
                            <Image src="/project/airdrop_connect_ton_wallet.png" alt="@airdrop_connect_ton_wallet" width={56} height={56} priority />
                        </MotionContainer>
                        <div className="flex flex-col justify-start items-start">
                            <TypographySmall text="Kết nối ví TON của bạn" className="text-[14px] text-white font-extralight" />
                        </div>
                    </div>
                    <div className="airdrop-item-icon">
                        {!wallet ? <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" xmlSpace="preserve"><path d="M9 20.6c-.3 0-.6-.1-.8-.3-.4-.4-.4-1.2 0-1.6l6.7-6.7-6.7-6.7c-.4-.4-.4-1.2 0-1.6s1.2-.4 1.6 0l7.5 7.5c.4.4.4 1.2 0 1.6l-7.5 7.5c-.2.2-.5.3-.8.3z" fill="currentColor"></path></svg>
                            : <div className="w-[26px] h-[26px] bg-white flex justify-center items-center rounded-full">
                                <div className="w-[14px] h-[14px]">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" xmlSpace="preserve"><path d="M9 19.9c-.3 0-.6-.1-.8-.3L3 14.3c-.4-.4-.4-1.2 0-1.6s1.2-.4 1.6 0L9 17.2 20.2 6c.4-.4 1.2-.4 1.6 0 .4.4.4 1.2 0 1.6l-12 12c-.2.2-.5.3-.8.3z" fill="#309adb"></path></svg>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
            <Drawer isOpen={isDrawerOpen} onClose={handleCloseDrawer} className="w-full card-has-glow h-[75%] border-none">
                <div className="w-full flex flex-col justify-center items-center gap-8">
                    <div className="relative visible">
                        <div className="relative z-10">
                            <Image src="/project/airdrop_connect_ton_wallet.png" alt="@airdrop_connect_ton_wallet" width={115} height={115} priority />
                        </div>
                    </div>
                    <div className="w-full flex flex-col justify-center items-center gap-5">
                        <TypographyLarge text="Kết nối ví TON của bạn" className="text-white text-[32px] font-bold" />
                        <TypographySmall text="Kết nối ví tiền điện tử của bạn.  Nếu bạn chưa có, hãy tạo một cái trong tài khoản Telegram của bạn" className="text-white text-[14px] max-w-[280px] font-normal" />
                    </div>
                    <InfoWalletTON />
                </div>
            </Drawer>
        </>
    )
}