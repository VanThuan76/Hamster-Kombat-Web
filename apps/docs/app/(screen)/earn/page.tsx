'use client'

import Image from "next/image"
import MotionContainer from "@ui/components/motion/container"
import TypographyLarge from "@ui/components/typography/large"
import TypographySmall from "@ui/components/typography/small"

export default function Page(): JSX.Element {
    return (
        <div className="w-full h-screen relative overflow-y-auto overflow-hidden p-5 space-y-2 text-center">
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
                    <Image src="/project/icon_coin.png" alt="@coin" width={106} height={106} className="w-full h-full" />
                </div>
            </MotionContainer>
            <div className="h-[220px]"></div>
            <MotionContainer className="relative w-full" direction="right">
                <TypographyLarge text="Kiếm thêm tiền" className="text-white text-[32px]" />
            </MotionContainer>
            <div className="flex flex-col justify-start items-start gap-2">
                <TypographySmall text="Hamster Youtube" className="text-base text-white mt-5" />
                {Array.from({ length: 2 }).map((_, i) => {
                    return (
                        <div className="w-full flex justify-between items-center rounded-2xl min-h-[64px] px-3 bg-[#272a2f]">
                            <div className="flex justify-start items-center gap-2">
                                <MotionContainer type="scale">
                                    <Image src="/project/hamster_youtube_channel.png" alt="@hamster_youtube_channel" width={56} height={56} />
                                </MotionContainer>
                                <div className="flex flex-col justify-start items-start">
                                    <TypographySmall text="Xu hướng bạn không thể bỏ qua" className="text-[14px] text-white" />
                                    <div className="flex justify-center items-center gap-1">
                                        <Image src="/project/icon_coin.png" alt="@coin" width={20} height={20} />
                                        <TypographySmall text="+100.000" className="text-[14px] text-white ml-1" />
                                    </div>
                                </div>
                            </div>
                            <div className="earn-item-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" xmlSpace="preserve"><path d="M9 20.6c-.3 0-.6-.1-.8-.3-.4-.4-.4-1.2 0-1.6l6.7-6.7-6.7-6.7c-.4-.4-.4-1.2 0-1.6s1.2-.4 1.6 0l7.5 7.5c.4.4.4 1.2 0 1.6l-7.5 7.5c-.2.2-.5.3-.8.3z" fill="currentColor"></path></svg>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div >
    )
}