'use client'

import Image from "next/image"
import MotionContainer from "@ui/components/motion/container"
import TypographyLarge from "@ui/components/typography/large"
import TypographySmall from "@ui/components/typography/small"

import DrawerMinCard from "@shared/components/DrawerMinCard"
import listEarn from "@shared/constant/listEarn"
import { formatCoin } from "@shared/utils/formatNumber"
import { cn } from "@ui/lib/utils";

const { initUtils } = require('@telegram-apps/sdk-react');
export default function Page(): JSX.Element {
    const utils = initUtils();

    return (
        <div className="w-full h-screen relative overflow-y-auto overflow-hidden p-5 space-y-2 text-center pb-24">
            <MotionContainer className="relative w-full" direction="top">
                <div className="icon_earn"><svg width="275" height="275" viewBox="0 0 275 275" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g filter="url(#filter0_f_1464_6497)">
                        <circle cx="137.529" cy="137.471" r="72.4143" fill="#FFD337"></circle>
                    </g>
                    <circle cx="137" cy="138" r="63.4286" fill="white" fillOpacity="0.05"></circle>
                    <circle cx="137" cy="138" r="74" fill="white" fillOpacity="0.05"></circle>
                    <defs>
                        <filter id="filter0_f_1464_6497" x="0.0999756" y="0.0428467" width="274.857" height="274.857" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                            <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
                            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend>
                            <feGaussianBlur stdDeviation="32.5071" result="effect1_foregroundBlur_1464_6497"></feGaussianBlur>
                        </filter>
                    </defs>
                </svg>
                </div>
                <div className="icon_earn_image w-[106px] h-[106px]">
                    <Image src="/project/icon_coin.png" alt="@coin" width={106} height={106} className="w-full h-full" priority />
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
                        <div key={i} className="w-full flex justify-between items-center rounded-2xl min-h-[64px] px-3 bg-[#272a2f]" onClick={() => { utils.openLink('https://www.youtube.com/watch?v=2CTckSiND1A', { tryBrowser: true }) }}>
                            <div className="flex justify-start items-center gap-2">
                                <MotionContainer type="scale">
                                    <Image src="/project/hamster_youtube_channel.png" alt="@hamster_youtube_channel" width={56} height={56} priority />
                                </MotionContainer>
                                <div className="flex flex-col justify-start items-start">
                                    <TypographySmall text="Xu hướng bạn không thể bỏ qua" className="text-[14px] text-white" />
                                    <div className="flex justify-center items-center gap-1">
                                        <Image src="/project/icon_coin.png" alt="@coin" width={20} height={20} priority />
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
            <div className="flex flex-col justify-start items-start gap-2">
                <TypographySmall text="Nhiệm vụ hàng ngày" className="text-base text-white mt-5" />
                <DrawerMinCard
                    drawerTrigger={
                        <div className="w-full flex justify-between items-center rounded-2xl min-h-[64px] px-3 bg-[#272a2f]">
                            <div className="flex justify-start items-center gap-2">
                                <MotionContainer type="scale">
                                    <Image src='/project/calendar.png' alt='@calendar' width={56} height={56} priority />
                                </MotionContainer>
                                <div className="flex flex-col justify-start items-start">
                                    <TypographySmall text='Danh sách nhiệm vụ' className="text-[14px] text-white" />
                                    <div className="flex justify-center items-center gap-1">
                                        <Image src="/project/icon_coin.png" alt="@coin" width={20} height={20} priority />
                                        <TypographySmall text="+100.000" className="text-[14px] text-white ml-1" />
                                    </div>
                                </div>
                            </div>
                            <div className="earn-item-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" xmlSpace="preserve"><path d="M9 20.6c-.3 0-.6-.1-.8-.3-.4-.4-.4-1.2 0-1.6l6.7-6.7-6.7-6.7c-.4-.4-.4-1.2 0-1.6s1.2-.4 1.6 0l7.5 7.5c.4.4.4 1.2 0 1.6l-7.5 7.5c-.2.2-.5.3-.8.3z" fill="currentColor"></path></svg>
                            </div>
                        </div>
                    }
                    drawerContent={
                        <div className="w-full flex flex-col justify-center items-center">
                            <div className="relative visible">
                                <div className="absolute left-1/2 top-1/2 w-[100px] h-[100px] bg-[#9b37ffe6] rounded-full blur-[20px] transform -translate-x-1/2 -translate-y-1/2 z-0"></div>
                                <div className="relative z-10">
                                    <Image src="/project/calendar.png" alt="@calendar" width={115} height={115} priority />
                                </div>
                            </div>
                            <div className="w-full flex flex-col justify-center items-center gap-5 mb-5">
                                <TypographyLarge text="Phần thưởng hàng ngày" className="text-white text-[32px] font-bold" />
                                <TypographySmall text='Tích lũy xu khi đăng nhập vào trò chơi hàng ngày mà không cần bỏ qua. Nút "thu thập" phải được nhấn hàng ngày, nếu không việc đếm ngày sẽ bắt đầu lại' className="text-white text-[14px] max-w-[280px] font-normal" />
                            </div>
                            <ul className="w-full h-full grid grid-cols-4 justify-center items-center gap-2">
                                {Array.from({ length: 10 }).map((_, i) => {
                                    return (
                                        <li key={i} className={cn("flex flex-col justify-center items-center gap-1 rounded-2xl p-2", i < 5 ? 'bg-[linear-gradient(180deg,#62cc6c,#2a7031)]' : 'bg-[#272a2f] opacity-40')}>
                                            <TypographySmall text={`Ngày ${i + 1}`} className="text-white text-[14px] font-normal" />
                                            <Image src="/project/icon_coin.png" alt="@coin" width={24} height={24} priority />
                                            <TypographySmall text={`${formatCoin(500 * (i + 1))}`} className="text-white text-base font-medium" />
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                    }
                    textBtnFinish="Quay lại ngày mai"
                    className="min-h-[85%] h-[90%] overflow-y-auto"
                />
            </div>
            <div className="flex flex-col justify-start items-start gap-2">
                <TypographySmall text="Danh sách công việc" className="text-base text-white mt-5" />
                {listEarn.map((item, i) => {
                    return (
                        <DrawerMinCard
                            key={i}
                            drawerTrigger={
                                <div className="w-full flex justify-between items-center rounded-2xl min-h-[64px] px-3 bg-[#272a2f]" onClick={() => { utils.openLink('https://www.youtube.com/watch?v=2CTckSiND1A', { tryBrowser: true }) }}>
                                    <div className="flex justify-start items-center gap-2">
                                        <MotionContainer type="scale">
                                            <Image src={item.image} alt={item.name.toLowerCase()} width={56} height={56} priority />
                                        </MotionContainer>
                                        <div className="flex flex-col justify-start items-start">
                                            <TypographySmall text={item.name} className="text-[14px] text-white" />
                                            <div className="flex justify-center items-center gap-1">
                                                <Image src="/project/icon_coin.png" alt="@coin" width={20} height={20} priority />
                                                <TypographySmall text="+100.000" className="text-[14px] text-white ml-1" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="earn-item-icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" xmlSpace="preserve"><path d="M9 20.6c-.3 0-.6-.1-.8-.3-.4-.4-.4-1.2 0-1.6l6.7-6.7-6.7-6.7c-.4-.4-.4-1.2 0-1.6s1.2-.4 1.6 0l7.5 7.5c.4.4.4 1.2 0 1.6l-7.5 7.5c-.2.2-.5.3-.8.3z" fill="currentColor"></path></svg>
                                    </div>
                                </div>
                            }
                            drawerContent={
                                <div className="w-full flex flex-col justify-center items-center gap-8">
                                    <div className="relative visible">
                                        <div className="relative z-10">
                                            <Image src={item.image} alt={item.name} width={115} height={115} priority />
                                        </div>
                                    </div>
                                    <div className="w-full flex flex-col justify-center items-center gap-5">
                                        <TypographyLarge text={item.name} className="text-white text-[32px] font-bold" />
                                        <div className="flex justify-center items-center gap-1">
                                            <Image src="/project/icon_coin.png" alt="@coin" width={28} height={28} priority />
                                            <TypographySmall text="+100.000" className="text-2xl text-white ml-1" />
                                        </div>
                                    </div>
                                </div>
                            }
                            textBtnFinish={i === 2 ? "Chọn" : i === 3 ? "Kiểm tra" : "Tham gia"}
                            className="min-h-[50%] h-[55%]"
                        />
                    )
                })}
            </div>
        </div >
    )
}