'use client'

import Image from "next/image"
import dynamic from 'next/dynamic'
import { useTranslations } from "next-intl"

import MotionContainer from "@ui/components/motion/Container"
import TypographyLarge from "@ui/components/typography/large"
import TypographySmall from "@ui/components/typography/small"

import CoinIcon from "@shared/components/CoinIcon"

import useBackButton from "@shared/hooks/useBackButton"
import { useAppSelector } from "@shared/redux/store"

const DrawerMinCard = dynamic(() => import('@shared/components/DrawerMinCard').then((mod) => mod.default), { ssr: false })

export default function Page(): JSX.Element {
    const t = useTranslations('screens.boost')

    const { user } = useAppSelector(state => state.app)

    useBackButton()

    return (
        <div className="w-full h-screen relative overflow-y-auto overflow-hidden p-5 space-y-4 text-center bg-black">
            <MotionContainer className="w-full my-2" direction="left">
                <TypographySmall text={t('your_balance')} className="text-[#8b8e93] text-[14px] font-light" />
            </MotionContainer>
            <MotionContainer className="w-full flex justify-center items-center gap-2" type="scale">
                <CoinIcon width={40} height={40} />
                <TypographyLarge text={String(user.revenue)} className="text-white text-3xl" />
            </MotionContainer>
            <MotionContainer className="w-full my-2" direction="right">
                <TypographySmall text={t('how_boost_work')} className="text-[#ffd337] text-[14px] font-light" />
            </MotionContainer>
            <div className="flex flex-col justify-start items-start gap-2">
                <TypographySmall text={t('free_daily_boost')} className="text-base text-white mt-5" />
                <DrawerMinCard
                    drawerTrigger={
                        <div className="w-full flex justify-between items-center rounded-2xl min-h-[64px] px-3 bg-[#272a2f] cursor-pointer">
                            <div className="flex justify-start items-center gap-4">
                                <MotionContainer className="p-3" type="scale">
                                    <Image src="/project/icon_flash.svg" alt="@flash" width={32} height={32} priority={true} />
                                </MotionContainer>
                                <div className="flex flex-col justify-start items-start">
                                    <TypographySmall text={t('full_energy')} className="text-[14px] text-white font-light" />
                                    <TypographySmall text={`6/6 ${t('available')}`} className="text-[14px] text-[#8b8e93] font-light" />
                                </div>
                            </div>
                        </div>
                    }
                    drawerContent={
                        <div className="w-full flex flex-col justify-center items-center gap-8">
                            <div className="relative z-10">
                                <Image src="/project/icon_flash.svg" alt="@icon_flash" width={115} height={115} priority={true} />
                            </div>
                            <div className="w-full flex flex-col justify-center items-center gap-5">
                                <TypographyLarge text={t('full_energy')} className="text-white text-[32px] font-bold" />
                                <TypographySmall text={t('des_full_energy')} className="text-white text-[14px] max-w-[280px] font-normal" />
                                <div className="flex justify-center items-center gap-2">
                                    <CoinIcon width={28} height={28} />
                                    <TypographyLarge text={t('free')} className="text-white text-xl font-bold" />
                                </div>
                            </div>
                        </div>
                    }
                />
                <div className="w-full flex justify-between items-center rounded-2xl min-h-[64px] px-3 bg-[#272a2f] opacity-50">
                    <div className="flex justify-start items-center gap-4">
                        <MotionContainer type="scale">
                            <Image src="/project/icon_rocket.png" alt="@icon_rocket" width={52} height={52} priority={true} />
                        </MotionContainer>
                        <div className="flex flex-col justify-start items-start">
                            <TypographySmall text="Turbo" className="text-[14px] text-white font-light" />
                            <TypographySmall text={t('coming_soon')} className="text-[14px] text-[#8b8e93] font-light" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col justify-start items-start gap-2">
                <TypographySmall text={t('boosters')} className="text-base text-white mt-5" />
                <DrawerMinCard
                    drawerTrigger={
                        <div className="w-full flex justify-between items-center rounded-2xl min-h-[64px] px-3 bg-[#272a2f] cursor-pointer">
                            <div className="flex justify-start items-center gap-4">
                                <MotionContainer type="scale">
                                    <Image src="/project/icon_boost-multitap.png" alt="@multitap" width={52} height={52} priority={true} />
                                </MotionContainer>
                                <div className="flex flex-col justify-start items-start">
                                    <TypographySmall text={t('multitap')} className="text-[14px] text-white font-light" />
                                    <div className="flex justify-center items-center gap-1">
                                        <CoinIcon width={20} height={20} />
                                        <TypographySmall text="2k" className="text-[14px] text-white ml-1" />
                                    </div>
                                </div>
                            </div>
                            <div className="earn-item-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" xmlSpace="preserve"><path d="M9 20.6c-.3 0-.6-.1-.8-.3-.4-.4-.4-1.2 0-1.6l6.7-6.7-6.7-6.7c-.4-.4-.4-1.2 0-1.6s1.2-.4 1.6 0l7.5 7.5c.4.4.4 1.2 0 1.6l-7.5 7.5c-.2.2-.5.3-.8.3z" fill="currentColor"></path></svg>
                            </div>
                        </div>
                    }
                    drawerContent={
                        <div className="w-full flex flex-col justify-center items-center gap-8">
                            <div className="relative z-10">
                                <Image src="/project/icon_boost-multitap.png" alt="@multitap" width={115} height={115} priority={true} />
                            </div>
                            <div className="w-full flex flex-col justify-center items-center gap-5">
                                <TypographyLarge text={t('multitap')} className="text-white text-[32px] font-bold" />
                                <TypographySmall text={t('des_multitap_1')} className="text-white text-[14px] max-w-[280px] font-normal" />
                                <TypographySmall text={t('des_multitap_2')} className="text-white text-base max-w-[280px] font-normal" />
                                <div className="flex justify-center items-center gap-2">
                                    <CoinIcon width={28} height={28} />
                                    <TypographyLarge text="2.000" className="text-white text-xl font-bold" />
                                </div>
                            </div>
                        </div>
                    }
                />
                <DrawerMinCard
                    drawerTrigger={
                        <div className="w-full flex justify-between items-center rounded-2xl min-h-[64px] px-3 bg-[#272a2f] cursor-pointer">
                            <div className="flex justify-start items-center gap-4">
                                <MotionContainer type="scale">
                                    <Image src="/project/icon_boost-energy.png" alt="@icon_boost" width={52} height={52} priority={true} />
                                </MotionContainer>
                                <div className="flex flex-col justify-start items-start">
                                    <TypographySmall text={t('energy_limit')} className="text-[14px] text-white font-light" />
                                    <div className="flex justify-center items-center gap-1">
                                        <CoinIcon width={20} height={20} />
                                        <TypographySmall text="4k" className="text-[14px] text-white ml-1" />
                                    </div>
                                </div>
                            </div>
                            <div className="earn-item-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" xmlSpace="preserve"><path d="M9 20.6c-.3 0-.6-.1-.8-.3-.4-.4-.4-1.2 0-1.6l6.7-6.7-6.7-6.7c-.4-.4-.4-1.2 0-1.6s1.2-.4 1.6 0l7.5 7.5c.4.4.4 1.2 0 1.6l-7.5 7.5c-.2.2-.5.3-.8.3z" fill="currentColor"></path></svg>
                            </div>
                        </div>
                    }
                    drawerContent={
                        <div className="w-full flex flex-col justify-center items-center gap-8">
                            <div className="relative z-10">
                                <Image src="/project/icon_boost-energy.png" alt="@icon_boost-energy" width={115} height={115} priority={true} />
                            </div>
                            <div className="w-full flex flex-col justify-center items-center gap-5">
                                <TypographyLarge text={t('energy_limit')} className="text-white text-[32px] font-bold" />
                                <TypographySmall text={t('des_energy_limit_1')} className="text-white text-[14px] max-w-[280px] font-normal" />
                                <TypographySmall text={t('des_energy_limit_2')} className="text-white text-base max-w-[280px] font-normal" />
                                <div className="flex justify-center items-center gap-2">
                                    <CoinIcon width={28} height={28} />
                                    <TypographyLarge text="4.000" className="text-white text-xl font-bold" />
                                </div>
                            </div>
                        </div>
                    }
                />
            </div>
        </div>
    )
}
