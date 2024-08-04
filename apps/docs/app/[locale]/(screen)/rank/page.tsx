'use client'

import Image from "next/image"
import dynamic from 'next/dynamic'
import { useEffect, useState } from "react"
import { useTranslations } from "next-intl"
import { cn } from "@ui/lib/utils"

import { Progress } from "@ui/components/progress"
import TypographySmall from "@ui/components/typography/small"
import TypographyLarge from "@ui/components/typography/large"

import useBackButton from "@shared/hooks/useBackButton"
import { useAppSelector } from "@shared/redux/store"
import { formatCoin } from "@shared/utils/formatNumber"

const DynamicNavigationSwiper = dynamic(() => import('@ui/components/swiper/DynamicNavigation').then((mod) => mod.default), { ssr: false })

export default function Page(): JSX.Element {
    const t = useTranslations('screens.rank')

    const { user, membership, memberships } = useAppSelector(state => state.app)

    const [currentTarget, setCurrentTarget] = useState(0)
    const [swiperClass, setSwiperClass] = useState(`is-${memberships[0]?.name.toLowerCase()}`)
    useBackButton()

    useEffect(() => {
        setSwiperClass(`is-${memberships[currentTarget]?.name.toLowerCase()}`)
    }, [currentTarget])

    return (
        <div className="w-screen h-screen relative overflow-y-auto overflow-hidden space-y-2 text-center">
            <DynamicNavigationSwiper
                className={cn("rank-slider mt-10", swiperClass)}
                items={memberships.map((item, i) => {
                    return (
                        <div key={i} className="flex flex-col justify-center items-center">
                            <div className="rank-item-image">
                                <Image
                                    src={`/project/ava_${item.name.toLowerCase()}.png`}
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
                                            value={Math.ceil((user.highest_score / +item.money) * 100)}
                                            className="w-full h-[8px] bg-[#ffffff26] border border-[hsla(0,0%,100%,.1)]"
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
        </div>
    )
}