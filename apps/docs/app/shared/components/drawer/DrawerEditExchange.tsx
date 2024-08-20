'use client'

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Button } from "@ui/components/button"

import Drawer from "@ui/components/drawer"

import TypographyLarge from "@ui/components/typography/large";

import { useAppSelector } from "@shared/redux/store/index";

import { useDraw } from "@shared/hooks/useDraw";

const { initHapticFeedback } = require('@telegram-apps/sdk-react');

export default function DrawerEditExchange(): JSX.Element {
    const { user } = useAppSelector(state => state.app);
    const { isOpen, onClose, type } = useDraw()

    const haptic = initHapticFeedback();
    const isDrawerOpen = isOpen && type === "editExchange"

    const t = useTranslations('components.drawer_change_exchange')

    function handleEditExchange() {
        haptic.impactOccurred('soft')
        onClose()
    }

    return (
        <Drawer isOpen={isDrawerOpen} onClose={onClose} className="w-full card-has-glow min-h-[60%] border-none">
            <div className="flex flex-col items-center justify-center w-full gap-8 mt-10">
                <div className="relative w-full min-h-[150px] flex flex-col justify-center items-center gap-5 bg-[#272a2f] px-6 pt-8 -mb-2 rounded-3xl">
                    <div className="absolute -top-10 z-10 w-[80px] h-[80px] p-5 bg-[#272a2f] border-4 border-[#1c1f24] rounded-full flex items-center justify-center">
                        <Image src={user.exchange.icon} alt={user.exchange.name} width={60} height={60} priority={true} />
                    </div>
                    <TypographyLarge text={`${t('title')} ${user.exchange.name}`} className="text-white text-[20px] text-center font-bold" />
                </div>
                <Button className="w-full h-[80px] bg-[#5a60ff] hover:bg-[#5a60ff]/90 text-white flex justify-center items-center gap-2 rounded-2xl" onClick={handleEditExchange}>
                    <TypographyLarge text={t('button')} className="text-xl font-bold text-white" />
                </Button>
            </div>
        </Drawer>
    )
}
