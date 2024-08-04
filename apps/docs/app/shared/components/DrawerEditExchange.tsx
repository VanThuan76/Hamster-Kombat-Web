'use client'

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useState } from "react"
import { Button } from "@ui/components/button"

import Drawer from "@ui/components/drawer"

import TypographyLarge from "@ui/components/typography/large";

import { useAppDispatch, useAppSelector } from "@shared/redux/store/index";
import { setIsEditUserExchange } from "@shared/redux/store/appSlice";

export default function DrawerEditExchange(): JSX.Element {
    const dispatch = useAppDispatch()

    const t = useTranslations('components.drawer_change_exchange')

    const { user, isEditExchange } = useAppSelector(state => state.app);

    const [isDrawerOpen, setIsDrawerOpen] = useState(isEditExchange);

    const handleCloseDrawer = () => {
        dispatch(setIsEditUserExchange(false))
        setIsDrawerOpen(false)
    };

    return (
        <Drawer isOpen={isDrawerOpen} onClose={handleCloseDrawer} className="w-full card-has-glow h-[50%] border-none">
            <div className="mt-10 w-full flex flex-col justify-center items-center gap-8">
                <div className="relative w-full min-h-[150px] flex flex-col justify-center items-center gap-5 bg-[#272a2f] px-6 pt-8 -mb-2 rounded-3xl">
                    <div className="absolute -top-10 z-10 w-[80px] h-[80px] p-5 bg-[#272a2f] border-4 border-[#1c1f24] rounded-full">
                        <Image src={user.exchange.icon} alt={user.exchange.name} width={115} height={115} priority={true} />
                    </div>
                    <TypographyLarge text={`${t('title')} ${user.exchange.name}`} className="text-white text-[20px] font-bold" />
                </div>
                <Button className="w-full h-[80px] bg-[#5a60ff] hover:bg-[#5a60ff]/90 text-white flex justify-center items-center gap-2 rounded-2xl" onClick={handleCloseDrawer}>
                    <TypographyLarge text={t('button')} className="text-white text-xl font-bold" />
                </Button>
            </div>
        </Drawer>
    )
}