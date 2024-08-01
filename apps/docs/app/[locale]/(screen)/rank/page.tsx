'use client'

import Image from "next/image"
import { useEffect, useState } from "react"
import { cn } from "@ui/lib/utils"

import TypographySmall from "@ui/components/typography/small"
import TypographyLarge from "@ui/components/typography/large"
import DynamicNavigationSwiper from "@ui/components/swiper/DynamicNavigation"

import listRank from "@shared/constant/listRank"
import useBackButton from "@shared/hooks/useBackButton"

import { formatCoin } from "@shared/utils/formatNumber"

export default function Page(): JSX.Element {
    const [currentTarget, setCurrentTarget] = useState(0)
    const [swiperClass, setSwiperClass] = useState(`is-${listRank[0]?.name.toLowerCase()}`)
    useBackButton()

    useEffect(() => {
        setSwiperClass(`is-${listRank[currentTarget]?.name.toLowerCase()}`)
    }, [currentTarget])

    return (
        <div className="w-screen h-screen relative overflow-y-auto overflow-hidden space-y-2 text-center">
            <DynamicNavigationSwiper
                className={cn("rank-slider mt-10", swiperClass)}
                items={listRank.map((item, i) => {
                    return (
                        <div key={i} className="flex flex-col justify-center items-center">
                            <div className="rank-item-image">
                                <Image
                                    src={`/project/ava_${item.name.toLowerCase()}.png`}
                                    alt={`avatar_${item.name}`}
                                    width={162}
                                    height={162}
                                    className="z-30"
                                    priority
                                />
                            </div>
                            <div className="w-full flex flex-col justify-center items-center gap-3">
                                <TypographyLarge text={item.name} className="text-white text-[32px] font-bold" />
                                <TypographySmall text={`50,55k / ${formatCoin(item.to)}`} className="text-[14px] font-bold text-[#fff9] -translate-y-2" />
                            </div>
                        </div>
                    )
                })}
                onSlideChange={setCurrentTarget}
            />
        </div>
    )
}