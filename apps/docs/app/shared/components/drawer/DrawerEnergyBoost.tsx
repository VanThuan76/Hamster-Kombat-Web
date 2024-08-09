'use client'

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Button } from "@ui/components/button"

import Drawer from "@ui/components/drawer"
import TypographyLarge from "@ui/components/typography/large";
import TypographySmall from "@ui/components/typography/small";

import CoinIcon from "@shared/components/CoinIcon"

import { useDraw } from "@shared/hooks/useDraw";

export default function DrawerEnergyBoost(): JSX.Element {
    const { isOpen, data, onClose, type } = useDraw()
    const isDrawerOpen = isOpen && type === "energyBoost"

    const t = useTranslations('screens.boost')

    return (
        <Drawer isOpen={isDrawerOpen} onClose={onClose} className="w-full card-has-glow h-[70%] border-none">
            <div className="w-full flex flex-col justify-center items-center gap-8">
                <div className="relative z-10">
                    <Image src="/project/icon_flash.svg" alt="@icon_flash" width={115} height={115} priority={true} />
                </div>
                <div className="w-full flex flex-col justify-center items-center gap-5">
                    <TypographyLarge text={t('full_energy')} className="text-white text-[32px] font-bold" />
                    <TypographySmall text={t('des_full_energy')} className="text-white text-center text-[14px] max-w-[280px] font-normal" />
                    <div className="flex justify-center items-center gap-2">
                        <CoinIcon width={28} height={28} />
                        <TypographyLarge text={String(data?.required_money)} className="text-white text-xl font-bold" />
                    </div>
                </div>
                <Button className="w-full h-[80px] bg-[#5a60ff] hover:bg-[#5a60ff]/90 text-white flex justify-center items-center gap-2 rounded-2xl" onClick={onClose}>
                    <TypographyLarge
                        text="Nhận"
                        className="text-white text-xl font-bold"
                    />
                    <CoinIcon width={28} height={28} />
                </Button>
            </div>
        </Drawer>
    )
}