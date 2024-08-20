'use client'

import Image from "next/image"
import dynamic from 'next/dynamic'
import { useState } from "react"
import { useTranslations } from "next-intl"

import { cn } from "@ui/lib/utils"
import { Button } from "@ui/components/button"
import { Separator } from "@ui/components/ui/separator"
import { Card, CardContent } from "@ui/components/card"
import { Avatar, AvatarImage, AvatarFallback } from "@ui/components/avatar"

import TypographyLarge from "@ui/components/typography/large"
import TypographySmall from "@ui/components/typography/small"

import CoinIcon from "@shared/components/CoinIcon"

import useBackButton from "@shared/hooks/useBackButton"
import { formatCoinStyleDot } from "@shared/utils/formatNumber"
import { useAppSelector } from "@shared/redux/store/index"

const DynamicNavigationSwiper = dynamic(() => import('@ui/components/swiper/DynamicNavigation').then((mod) => mod.default), { ssr: false })

function CheckIcon({ is_purchased }: { is_purchased: boolean }) {
    if (is_purchased) {
        return (
            <div className="absolute flex justify-center items-center top-0 right-0 w-[18px] h-[18px] bg-gradient-to-b from-[#74fc82] to-[#297e32] rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-[10px] h-[10px] text-white" viewBox="0 0 24 24" xmlSpace="preserve"><path d="M9 19.9c-.3 0-.6-.1-.8-.3L3 14.3c-.4-.4-.4-1.2 0-1.6s1.2-.4 1.6 0L9 17.2 20.2 6c.4-.4 1.2-.4 1.6 0 .4.4.4 1.2 0 1.6l-12 12c-.2.2-.5.3-.8.3z" fill="currentColor"></path></svg>
            </div>
        )
    } else {
        return (
            <div className="absolute top-2 right-1 w-[16px] h-[16px]">
                <svg xmlns="http://www.w3.org/2000/svg" xmlSpace="preserve" viewBox="0 0 20 20"><path d="M16.2 6.2h-2.5V4.4C13.7 2.3 12 .6 9.9.6S6.2 2.3 6.2 4.4v1.9H3.8c-.7 0-1.2.6-1.2 1.2v8.8c0 .7.6 1.2 1.2 1.2h12.5c.7 0 1.2-.6 1.2-1.2V7.5c0-.7-.6-1.3-1.3-1.3zM10 12.8c-.5 0-.9-.4-.9-.9s.4-.9.9-.9.9.4.9.9-.4.9-.9.9zm2.5-6.6h-5V4.4C7.5 3 8.6 1.9 10 1.9s2.5 1.1 2.5 2.5v1.8z" fill="#4e4f50"></path></svg>
            </div>
        )
    }
}

export default function Page(): JSX.Element {
    const t = useTranslations('screens.skin')

    const { user, skins, membership } = useAppSelector(state => state.app)

    const [currentTarget, setCurrentTarget] = useState(0)
    useBackButton()

    const avatarImage = process.env.NEXT_PUBLIC_DOMAIN_BACKEND + '/' + membership.image
    const defaultSkin = [{
        id: -1,
        name: "Default",
        description: "Your league's default skin",
        image: membership.image,
        image_url: avatarImage,
        price: 0,
        created_at: "2024-07-20T23:35:04.000000Z",
        updated_at: "2024-08-02T19:05:21.000000Z",
        required_level: 0,
    }]

    const currentSkins = defaultSkin.concat(skins)

    return (
        <div className="relative w-full h-screen space-y-2 overflow-y-auto text-center bg-black">
            <div className="flex items-center justify-center w-full px-5 py-2">
                <TypographyLarge text={t('profile')} className="text-base text-white" />
            </div>
            <div className="flex items-center justify-start gap-2 px-5 py-2">
                <Avatar className="bg-[#1c1f24] rounded-lg w-[40px] h-[40px]">
                    <AvatarImage src={avatarImage} alt="@user" sizes="sm" className="w-[40px] h-[40px]" />
                    <AvatarFallback>User</AvatarFallback>
                </Avatar>
                <TypographySmall text={`${user?.first_name} ${user?.last_name === null ? "" : user?.last_name}`} className="text-base" />
            </div>
            <Separator className="w-full" />
            <Card className="w-full min-h-screen !mt-10  border-none bg-[#1c1f24] p-4 !pb-24" style={{ borderRadius: '40px 40px 0 0' }}>
                <TypographySmall text={t('skin')} className="text-base text-center text-white" />
                <DynamicNavigationSwiper
                    items={currentSkins.map((item, i) => {
                        return (
                            <div key={i} className="flex flex-col items-center justify-center overflow-hidden">
                                <Image
                                    src={item.image_url}
                                    alt={`skin_${item.name}`}
                                    width={270}
                                    height={270}
                                    className="z-30 object-contain object-center"
                                    priority={true}
                                />
                                <div className="w-full flex flex-col justify-center items-center gap-3 bg-[#272a2f] rounded-xl p-4">
                                    <TypographySmall text={item.name} className="text-base font-bold text-white" />
                                    <TypographySmall text={item.description} className="text-[12px] font-normal text-white" />
                                    {i === 0 ?
                                        <TypographySmall text={t('purchased')} className="text-[14px] font-normal text-[#82f88e] mt-5" />
                                        : <div className="flex items-center justify-center gap-2">
                                            <CoinIcon width={28} height={28} className="coin-is-grayscale" />
                                            <TypographySmall text={`${formatCoinStyleDot(item.price)}`} className="text-[20px] font-bold text-[#fff6]" />
                                        </div>}
                                    <Button className="bg-[#5a60ff4d] cursor-not-allowed w-full min-h-[60px] rounded-2xl">{i === 0 ? 'Chọn' : 'Đạt đến giải đấu Legendary để mở khóa skin'}</Button>
                                </div>
                            </div>
                        )
                    })}
                    activeSlideChange={currentTarget}
                    onSlideChange={setCurrentTarget}
                />
                <CardContent className="grid items-center justify-center w-full grid-cols-4 gap-2 p-0 mt-5">
                    {currentSkins.map((item, i) => {
                        return (
                            <div key={i} className={cn("relative bg-[#272a2f] flex flex-col justify-center items-center rounded-xl py-2", i === currentTarget && 'border border-[#5a60ff]')} onClick={() => setCurrentTarget(i)}>
                                <div className="w-[62px] h-[62px]">
                                    <Image src={item.image_url} alt={item.name} width={62} height={62} className="object-center w-full h-full object-conntain" />
                                </div>
                                <TypographySmall text={item.name} className="text-[9px] font-extralight text-white" />
                                {i === 0 ? <CheckIcon is_purchased={true} /> : <CheckIcon is_purchased={false} />}
                            </div>
                        )
                    })}
                </CardContent>
            </Card>
        </div>
    )
}
