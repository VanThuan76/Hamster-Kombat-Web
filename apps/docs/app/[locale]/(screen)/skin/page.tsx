'use client'

import Image from "next/image"
import { useState } from "react"
import { useTranslations } from "next-intl"

import { cn } from "@ui/lib/utils"
import { Button } from "@ui/components/button"
import { Separator } from "@ui/components/ui/separator"
import { Card, CardContent } from "@ui/components/card"
import { Avatar, AvatarImage, AvatarFallback } from "@ui/components/avatar"

import TypographyLarge from "@ui/components/typography/large"
import TypographySmall from "@ui/components/typography/small"
import DynamicNavigationSwiper from "@ui/components/swiper/DynamicNavigation"

import listSkin from "@shared/constant/listSkin"
import useBackButton from "@shared/hooks/useBackButton"
import { formatCoinStyleDot } from "@shared/utils/formatNumber"
import { useAppSelector } from "@shared/redux/store/index"


export default function Page(): JSX.Element {
    const t = useTranslations('screens.skin')

    const { user } = useAppSelector(state => state.app)

    const [currentTarget, setCurrentTarget] = useState(0)
    useBackButton()

    return (
        <div className="w-full h-screen relative space-y-2 overflow-y-auto text-center bg-black">
            <div className="w-full flex justify-between items-center px-5 py-2">
                <TypographyLarge text={t('profile')} className="text-white text-base" />
            </div>
            <div className="flex justify-start items-center gap-2 px-5 py-2">
                <Avatar className="bg-[#1c1f24] rounded-lg w-[40px] h-[40px]">
                    <AvatarImage src="/project/icon_ava_user.png" alt="@user" sizes="sm" className="w-[40px] h-[40px]" />
                    <AvatarFallback>User</AvatarFallback>
                </Avatar>
                <TypographySmall text={`${user?.first_name} ${user?.last_name}`} className="text-base" />
            </div>
            <Separator className="w-full" />
            <Card className="w-full min-h-screen !mt-10  border-none bg-[#1c1f24] p-4 !pb-24" style={{ borderRadius: '40px 40px 0 0' }}>
                <TypographySmall text={t('skin')} className="text-base text-white text-center" />
                <DynamicNavigationSwiper
                    items={listSkin.map((item, i) => {
                        return (
                            <div key={i} className="flex flex-col justify-center items-center">
                                <Image
                                    src={item.image}
                                    alt={`skin_${item.title}`}
                                    width={270}
                                    height={270}
                                    className="z-30"
                                    priority
                                />
                                <div className="w-full flex flex-col justify-center items-center gap-3 bg-[#272a2f] rounded-xl p-4">
                                    <TypographySmall text={item.title} className="text-base font-bold text-white" />
                                    <TypographySmall text={item.description} className="text-[12px] font-normal text-white" />
                                    {i === 0 ?
                                        <TypographySmall text={t('purchased')} className="text-[14px] font-normal text-[#82f88e] mt-5" />
                                        : <div className="flex justify-center items-center gap-2">
                                            <Image src="/project/icon_coin.png" alt="@coin" width={28} height={28} className="coin-is-grayscale" />
                                            <TypographySmall text={`${formatCoinStyleDot(item.price)}`} className="text-[20px] font-bold text-[#fff6]" />
                                        </div>}
                                    <Button className="bg-[#5a60ff4d] cursor-not-allowed w-full min-h-[60px] rounded-2xl">{i === 0 ? 'Chọn' : 'Đạt đến giải đấu Legendary để mở khóa skin'}</Button>
                                </div>
                            </div>
                        )
                    })}
                    onSlideChange={setCurrentTarget}
                />
                <CardContent className="w-full grid grid-cols-4 justify-center items-center gap-2 p-0 mt-5">
                    {listSkin.map((item, i) => {
                        return (
                            <div key={i} className={cn("relative bg-[#272a2f] flex flex-col justify-center items-center rounded-xl py-2", i === 0 && 'border border-[#5a60ff]')}>
                                <div className="w-[62px] h-[62px]">
                                    <Image src={item.image} alt={item.title} width={62} height={62} className="w-full h-full object-conntain object-center" />
                                </div>
                                <TypographySmall text={item.title} className="text-[9px] font-extralight text-white" />
                                <div className="absolute top-2 right-1 w-[16px] h-[16px]">
                                    <svg xmlns="http://www.w3.org/2000/svg" xmlSpace="preserve" viewBox="0 0 20 20"><path d="M16.2 6.2h-2.5V4.4C13.7 2.3 12 .6 9.9.6S6.2 2.3 6.2 4.4v1.9H3.8c-.7 0-1.2.6-1.2 1.2v8.8c0 .7.6 1.2 1.2 1.2h12.5c.7 0 1.2-.6 1.2-1.2V7.5c0-.7-.6-1.3-1.3-1.3zM10 12.8c-.5 0-.9-.4-.9-.9s.4-.9.9-.9.9.4.9.9-.4.9-.9.9zm2.5-6.6h-5V4.4C7.5 3 8.6 1.9 10 1.9s2.5 1.1 2.5 2.5v1.8z" fill="#4e4f50"></path></svg>
                                </div>
                            </div>
                        )
                    })}
                </CardContent>
            </Card>
        </div>
    )
}