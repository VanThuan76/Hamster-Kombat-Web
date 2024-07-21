'use client'

import Image from "next/image"
import MotionContainer from "@ui/components/motion/container"
import TypographyLarge from "@ui/components/typography/large"
import TypographySmall from "@ui/components/typography/small"

import DrawerWalletConnect from "@shared/components/drawer-wallet-connect"

export default function Page(): JSX.Element {
    return (
        <div className="w-full min-h-screen relative overflow-y-auto overflow-hidden p-5 space-y-2 text-center">
            <MotionContainer className="relative w-full" direction="top">
                <div className="icon_earn"><svg width="275" height="275" viewBox="0 0 275 275" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g filter="url(#filter0_f_1464_6497)">
                        <circle cx="137.529" cy="137.471" r="72.4143" fill="#FFD337"></circle>
                    </g>
                    <circle cx="137" cy="138" r="63.4286" fill="white" fill-opacity="0.05"></circle>
                    <circle cx="137" cy="138" r="74" fill="white" fill-opacity="0.05"></circle>
                    <defs>
                        <filter id="filter0_f_1464_6497" x="0.0999756" y="0.0428467" width="274.857" height="274.857" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                            <feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood>
                            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend>
                            <feGaussianBlur stdDeviation="32.5071" result="effect1_foregroundBlur_1464_6497"></feGaussianBlur>
                        </filter>
                    </defs>
                </svg>
                </div>
                <div className="icon_earn_image w-[106px] h-[106px]">
                    <Image src="/project/icon_hamster-coin.png" alt="@hamsterCoin" width={106} height={106} className="w-full h-full" />
                </div>
            </MotionContainer>
            <div className="h-[220px]"></div>
            <MotionContainer className="relative w-full" direction="right">
                <TypographyLarge text="Airdrop tasks" className="text-white text-[32px]" />
            </MotionContainer>
            <MotionContainer className="relative w-full" direction="left">
                <TypographySmall text="Ngày listing đang đến. Nhiệm vụ sẽ xuất hiện bên dưới. Hoàn thành chúng để tham gia Airdrop" className="text-white text-base" />
            </MotionContainer>
            <DrawerWalletConnect />
        </div >
    )
}