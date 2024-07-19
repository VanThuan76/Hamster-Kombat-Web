'use client'
import { useState } from "react"
import Image from "next/image"
import { cn } from "@ui/lib/utils"

import TypographySmall from "@ui/components/typography/small"
import TypographyLarge from "@ui/components/typography/large"
import DynamicNavigationSwiper from "@ui/components/swiper/dynamic-navigation"

import listRank from "../../shared/constant/listRank";
import { formatCoin } from "../../shared/utils/formatNumber"

export default function Page(): JSX.Element {
    const [currentTarget, setCurrentTarget] = useState(0)

    return (
        <div className="w-full h-screen relative overflow-y-auto overflow-hidden p-5 space-y-2 text-center bg-black">
            <DynamicNavigationSwiper className={cn("rank-slider mt-10", `is-${listRank[currentTarget]?.name.toLowerCase()}`)} items={listRank.map((item, i) => {
                return (
                    <div key={i} className="flex flex-col justify-center items-center">
                        <div className="rank-item-image">
                            <Image src={`/project/ava_${item.name.toLowerCase()}.png`} alt={`avatar_${item.name}`} width={162} height={162} className="z-30" />
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