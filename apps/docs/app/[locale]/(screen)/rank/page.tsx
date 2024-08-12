'use client'

import Image from "next/image"
import { useEffect, useState } from "react"
import { useTranslations } from "next-intl"
import { cn } from "@ui/lib/utils"

import { Avatar, AvatarImage, AvatarFallback } from "@ui/components/avatar"
import { Progress } from "@ui/components/progress"
import TypographySmall from "@ui/components/typography/small"
import TypographyLarge from "@ui/components/typography/large"
import DynamicNavigationSwiper from "@ui/components/swiper/DynamicNavigation"

import CoinIcon from "@shared/components/CoinIcon"

import useBackButton from "@shared/hooks/useBackButton"
import { useAppSelector } from "@shared/redux/store"
import { formatCoin, formatCoinStyleDot } from "@shared/utils/formatNumber"

const ItemCardRank = ({ item, order, backgroundAva, className }: { item: any, order: number, backgroundAva: string, className?: string }) => {

    return (
        <div className={cn('w-full h-[64px] flex justify-between items-center bg-[#272a2f] px-3 rounded-2xl', className)}>
            <Avatar className={cn('rank-ava rounded-lg w-[50px] h-[50px]', backgroundAva)}>
                <AvatarImage src="/project/icon_ava_user.png" alt="@user" sizes="sm" className="w-[50px] h-[50px]" />
                <AvatarFallback>User</AvatarFallback>
            </Avatar>
            <div className="ml-3 w-full flex flex-col justify-start items-start gap-2">
                <div className="flex justify-center items-center gap-1">
                    <Image src={process.env.NEXT_PUBLIC_DOMAIN_BACKEND + '/' + item.image} alt="@coin" width={18} height={18} priority={true} />
                    <TypographySmall text={`${item?.first_name} ${item?.last_name}`} className="text-[14px]" />
                </div>
                <div className="flex justify-center items-center gap-1">
                    <CoinIcon width={20} height={20} />
                    <TypographySmall text={String(formatCoinStyleDot(item.highest_score))} className="text-[14px] text-[#8b8e93]" />
                </div>
            </div>
            <TypographyLarge text={String(order)} className="text-2xl text-[#8b8e93] pl-3" />
        </div>
    )
}

export default function Page(): JSX.Element {
    const t = useTranslations('screens.rank')

    const { user, membership, ranks } = useAppSelector(state => state.app)

    const [currentTarget, setCurrentTarget] = useState(0)
    const [swiperClass, setSwiperClass] = useState(`is-${ranks[0]?.name.toLowerCase()}`)
    useBackButton()

    useEffect(() => {
        setSwiperClass(`is-${ranks[currentTarget]?.name.toLowerCase()}`)
    }, [currentTarget])

    return (
        <div className="w-screen h-screen relative overflow-y-auto overflow-hidden space-y-2 text-center">
            <DynamicNavigationSwiper
                className={cn("rank-slider mt-10", swiperClass)}
                items={ranks.map((item, i) => {
                    return (
                        <div key={i} className="flex flex-col justify-center items-center">
                            <div className="rank-item-image overflow-hidden">
                                <Image
                                    src={item.image}
                                    alt={`avatar_${item.name}`}
                                    width={162}
                                    height={162}
                                    className="z-30"
                                    priority={true}
                                />
                            </div>
                            <div className="w-full flex flex-col justify-center items-center gap-3 px-4">
                                <TypographyLarge text={item.name} className="text-white text-[32px] font-bold" />
                                {membership.name.toLowerCase() === item.name.toLowerCase() ?
                                    (<>
                                        <TypographySmall text={`${formatCoin(user.revenue)} / ${formatCoin(item.money)}`} className="text-[14px] font-bold text-[#fff9] -translate-y-2" />
                                        <Progress
                                            value={Math.ceil((user.revenue / +item.money) * 100)}
                                            className="w-full h-[12px] bg-[#ffffff26] border border-[hsla(0,0%,100%,.1)]"
                                        />
                                    </>) :
                                    <TypographySmall text={`${t('from')} ${formatCoin(+item.short_money)}`} className="text-[14px] font-bold text-[#fff9] -translate-y-2" />
                                }
                            </div>
                        </div>
                    )
                })}
                onSlideChange={setCurrentTarget}
            />
            <div className="w-full flex flex-col justify-start items-start gap-2 px-4 pb-20">
                {ranks[currentTarget]?.rank.filter(item => item.id !== user.id).map((item, i) => {
                    return (
                        <ItemCardRank key={i} item={item} order={i + 1} backgroundAva={swiperClass} />
                    )
                })}
            </div>
            <div className="fixed px-4 bottom-18 w-full z-[10000]">
                {ranks[currentTarget]?.currentUser?.map((item, i) => {
                    return (
                        <ItemCardRank key={i} item={item} order={i} backgroundAva={swiperClass} className="border border-white" />
                    )
                })}
            </div>
        </div>
    )
}