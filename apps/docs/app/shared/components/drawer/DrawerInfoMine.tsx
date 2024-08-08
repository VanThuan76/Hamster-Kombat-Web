'use client'

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Button } from "@ui/components/button"

import Drawer from "@ui/components/drawer"
import TypographyLarge from "@ui/components/typography/large";
import TypographySmall from "@ui/components/typography/small";

import CoinIcon from "@shared/components/CoinIcon"

import { useDraw } from "@shared/hooks/useDraw";

export default function DrawerInfoMine(): JSX.Element {
    const { isOpen, onClose, type } = useDraw()
    const isDrawerOpen = isOpen && type === "infoMine"

    const t = useTranslations('components.drawer_info_profit')

    return (
        <Drawer isOpen={isDrawerOpen} onClose={onClose} className="w-full card-has-glow h-[70%] border-none">
            <div className="w-full flex flex-col justify-center items-center gap-8">
                <div className="relative visible">
                    <div className="absolute left-1/2 top-1/2 w-[100px] h-[100px] bg-[#9b37ffe6] rounded-full blur-[20px] transform -translate-x-1/2 -translate-y-1/2 z-0"></div>
                    <div className="relative z-10">
                        <Image src="/project/daily-combo-info.png" alt="@daily-combo-info" width={115} height={115} priority={true} />
                    </div>
                </div>
                <div className="w-full flex flex-col justify-center items-center gap-5">
                    <TypographySmall text="Tìm 3 thẻ kết hợp và nâng cấp chúng để nhận giải thưởng!" className="text-white text-[16px] font-normal mt-3 text-center" />
                </div>
                <Button className="w-full h-[80px] bg-[#5a60ff] hover:bg-[#5a60ff]/90 text-white flex justify-center items-center gap-2 rounded-2xl" onClick={onClose}>
                    <TypographyLarge text="Chúc bạn may mắn!" className="text-white text-xl font-bold" />
                    <CoinIcon width={28} height={28} />
                </Button>
            </div>
        </Drawer>
    )
}