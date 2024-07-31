'use client'

import Image from "next/image";
import { useState } from "react"
import { Button } from "@ui/components/button"

import Drawer from "@ui/components/drawer"

import TypographyLarge from "@ui/components/typography/large";
import TypographySmall from "@ui/components/typography/small";

export default function DrawerInfoCountdown(): JSX.Element {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const handleOpenDrawer = () => setIsDrawerOpen(true);
    const handleCloseDrawer = () => setIsDrawerOpen(false);

    return (
        <>
            <div className="cursor-pointer" style={{ color: '#fff3' }} onClick={handleOpenDrawer}>
                <svg width="17" height="18" viewBox="0 0 17 18" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.5 0.570312C6.83277 0.570313 5.20298 1.06471 3.81672 1.99097C2.43047 2.91724 1.35001 4.23377 0.711988 5.7741C0.073965 7.31442 -0.092971 9.00935 0.23229 10.6446C0.557552 12.2797 1.3604 13.7818 2.53931 14.9607C3.71823 16.1396 5.22025 16.9425 6.85545 17.2677C8.49065 17.593 10.1856 17.426 11.7259 16.788C13.2662 16.15 14.5828 15.0695 15.509 13.6833C16.4353 12.297 16.9297 10.6672 16.9297 9C16.9273 6.76503 16.0384 4.62228 14.4581 3.04192C12.8777 1.46156 10.735 0.572673 8.5 0.570312ZM8.17579 4.46094C8.36816 4.46094 8.55621 4.51798 8.71616 4.62486C8.87612 4.73174 9.00078 4.88364 9.0744 5.06137C9.14802 5.2391 9.16728 5.43467 9.12975 5.62335C9.09222 5.81203 8.99959 5.98534 8.86356 6.12137C8.72753 6.25739 8.55422 6.35003 8.36554 6.38756C8.17686 6.42509 7.9813 6.40583 7.80357 6.33221C7.62584 6.25859 7.47393 6.13392 7.36705 5.97397C7.26017 5.81402 7.20313 5.62597 7.20313 5.43359C7.20313 5.17563 7.3056 4.92823 7.48801 4.74582C7.67042 4.56341 7.91782 4.46094 8.17579 4.46094ZM9.14844 13.5391C8.80449 13.5391 8.47462 13.4024 8.23141 13.1592C7.9882 12.916 7.85157 12.5861 7.85157 12.2422V9C7.67959 9 7.51466 8.93168 7.39305 8.81008C7.27145 8.68847 7.20313 8.52354 7.20313 8.35156C7.20313 8.17959 7.27145 8.01465 7.39305 7.89305C7.51466 7.77144 7.67959 7.70312 7.85157 7.70312C8.19552 7.70312 8.52538 7.83976 8.76859 8.08297C9.01181 8.32618 9.14844 8.65605 9.14844 9V12.2422C9.32042 12.2422 9.48535 12.3105 9.60696 12.4321C9.72856 12.5537 9.79688 12.7186 9.79688 12.8906C9.79688 13.0626 9.72856 13.2275 9.60696 13.3491C9.48535 13.4707 9.32042 13.5391 9.14844 13.5391Z" fill="currentColor"></path>
                </svg>
            </div>
            <Drawer isOpen={isDrawerOpen} onClose={handleCloseDrawer} className="w-full card-has-glow h-[70%] border-none">
                <div className="w-full flex flex-col justify-center items-center gap-8">
                    <div className="relative visible">
                        <div className="absolute left-1/2 top-1/2 w-[100px] h-[100px] bg-[#9b37ffe6] rounded-full blur-[20px] transform -translate-x-1/2 -translate-y-1/2 z-0"></div>
                        <div className="relative z-10">
                            <Image src="/project/daily-combo-info.png" alt="@daily-combo-info" width={115} height={115} priority />
                        </div>
                    </div>
                    <div className="w-full flex flex-col justify-center items-center gap-5">
                        <TypographySmall text="Tìm 3 thẻ kết hợp và nâng cấp chúng để nhận giải thưởng!" className="text-white text-[16px] font-normal mt-3 text-center" />
                    </div>
                    <Button className="w-full h-[80px] bg-[#5a60ff] hover:bg-[#5a60ff]/90 text-white flex justify-center items-center gap-2 rounded-2xl" onClick={handleOpenDrawer}>
                        <TypographyLarge text="Chúc bạn may mắn!" className="text-white text-xl font-bold" />
                        <div className="w-[24px] h-[24px]">
                            <svg className="w-[24px] h-[24px]" xmlns="http://www.w3.org/2000/svg" xmlSpace="preserve" viewBox="0 0 24 24"><path d="M22.5 8.8c0 6.6-9.7 11.9-10.1 12.1-.2.1-.3.1-.4.1s-.2 0-.4-.1c-.4-.2-10.1-5.5-10.1-12.1 0-1.5.6-3 1.7-4.1S5.8 3 7.3 3c1.9 0 3.6.8 4.7 2.2C13.1 3.8 14.8 3 16.7 3c1.5 0 3 .6 4.1 1.7 1.1 1.1 1.7 2.6 1.7 4.1z" fill="currentColor"></path></svg>
                        </div>
                    </Button>
                </div>
            </Drawer>
        </>
    )
}