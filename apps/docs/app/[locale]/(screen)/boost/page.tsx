'use client'

import Image from "next/image"
import { useTranslations } from "next-intl"
import { cn } from "@ui/lib/utils";

import MotionContainer from "@ui/components/motion/Container"
import TypographyLarge from "@ui/components/typography/large"
import TypographySmall from "@ui/components/typography/small"

import CoinIcon from "@shared/components/CoinIcon"

import useBackButton from "@shared/hooks/useBackButton"
import { useDraw } from "@shared/hooks/useDraw";
import { useAppSelector } from "@shared/redux/store"
import { formatCoin, formatCoinStyleDot } from "@shared/utils/formatNumber";

export default function Page(): JSX.Element {
    const t = useTranslations('screens.boost')

    const { user } = useAppSelector(state => state.app)
    const { onOpen } = useDraw()

    const newBoostArr = user.boots.flatMap(item => item.sub_types).flatMap(subType => subType.boots);

    const currentEnergy = user.boots.find(item => item.type === 0)?.sub_types.find(item => item.sub_type === 0)?.boots.find(item => item.is_completed === 1) || user.boots.find(item => item.type === 0)?.sub_types.find(item => item.sub_type === 0)?.boots[0]
    const nextEnergy = currentEnergy && newBoostArr.find(item => item.boots_id === currentEnergy.boots_id + 1)
    // const currentTurbo = user.boots.find(item => item.type === 0)?.sub_types.find(item => item.sub_type === 1)?.boots.find(item => item.is_completed === 1) || user.boots.find(item => item.type === 0)?.sub_types.find(item => item.sub_type === 1)?.boots[0]
    // const nextTurbo = currentTurbo && newBoostArr.find(item => item.boots_id === currentTurbo.boots_id + 1)
    const currentMultitap = user.boots.find(item => item.type === 1)?.sub_types.find(item => item.sub_type === 2)?.boots.find(item => item.is_completed === 1) || user.boots.find(item => item.type === 1)?.sub_types.find(item => item.sub_type === 2)?.boots[0]
    const nextMultitap = currentMultitap && newBoostArr.find(item => item.boots_id === currentMultitap.boots_id + 1)
    const currentEnergyLimit = user.boots.find(item => item.type === 1)?.sub_types.find(item => item.sub_type === 3)?.boots.find(item => item.is_completed === 1) || user.boots.find(item => item.type === 1)?.sub_types.find(item => item.sub_type === 3)?.boots[0]
    const nextEnergyLimit = currentEnergyLimit && newBoostArr.find(item => item.boots_id === currentEnergyLimit.boots_id + 1)

    useBackButton()

    return (
        <div className="w-full h-screen relative overflow-y-auto overflow-hidden p-5 space-y-4 text-center bg-black">
            <MotionContainer className="w-full my-2" direction="left">
                <TypographySmall text={t('your_balance')} className="text-[#8b8e93] text-[14px] font-light" />
            </MotionContainer>
            <MotionContainer className="w-full flex justify-center items-center gap-2" type="scale">
                <CoinIcon width={40} height={40} />
                <TypographyLarge text={String(formatCoinStyleDot(user.revenue))} className="text-white text-3xl" />
            </MotionContainer>
            <MotionContainer className="w-full my-2" direction="right">
                <TypographySmall text={t('how_boost_work')} className="text-[#ffd337] text-[14px] font-light" />
            </MotionContainer>
            <div className="flex flex-col justify-start items-start gap-2">
                <TypographySmall text={t('free_daily_boost')} className="text-base text-white mt-5" />
                <div className="w-full flex justify-between items-center rounded-2xl min-h-[64px] px-3 bg-[#272a2f] cursor-pointer" onClick={() => onOpen("energyBoost", { current: currentEnergy, next: nextEnergy })}>
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
                <div className="w-full flex justify-between items-center rounded-2xl min-h-[64px] px-3 bg-[#272a2f] cursor-pointer" onClick={() => onOpen("multitapBoost", { current: currentMultitap, next: nextMultitap })}>
                    <div className="flex justify-start items-center gap-4">
                        <MotionContainer type="scale">
                            <Image src="/project/icon_boost-multitap.png" alt="@multitap" width={52} height={52} priority={true} />
                        </MotionContainer>
                        <div className="flex flex-col justify-start items-start">
                            <TypographySmall text={t('multitap')} className="text-[14px] text-white font-light" />
                            <div className="flex justify-center items-center gap-1">
                                <CoinIcon width={20} height={20} className={cn(nextMultitap && nextMultitap.required_money > user.revenue && "coin-is-grayscale")} />
                                <TypographySmall text={String(formatCoin(nextMultitap?.required_money ?? 0))} className="text-[14px] text-white ml-1" />
                                <span className="text-[#8b8e93]">•</span>
                                <TypographySmall text={String(nextMultitap?.level) + ' lv'} className="text-[14px] text-[#8b8e93] font-light" />
                            </div>
                        </div>
                    </div>
                    <div className="earn-item-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" xmlSpace="preserve"><path d="M9 20.6c-.3 0-.6-.1-.8-.3-.4-.4-.4-1.2 0-1.6l6.7-6.7-6.7-6.7c-.4-.4-.4-1.2 0-1.6s1.2-.4 1.6 0l7.5 7.5c.4.4.4 1.2 0 1.6l-7.5 7.5c-.2.2-.5.3-.8.3z" fill="currentColor"></path></svg>
                    </div>
                </div>
                <div className="w-full flex justify-between items-center rounded-2xl min-h-[64px] px-3 bg-[#272a2f] cursor-pointer" onClick={() => onOpen("energyLimitBoost", { current: currentEnergyLimit, next: nextEnergyLimit })}>
                    <div className="flex justify-start items-center gap-4">
                        <MotionContainer type="scale">
                            <Image src="/project/icon_boost-energy.png" alt="@icon_boost" width={52} height={52} priority={true} />
                        </MotionContainer>
                        <div className="flex flex-col justify-start items-start">
                            <TypographySmall text={t('energy_limit')} className="text-[14px] text-white font-light" />
                            <div className="flex justify-center items-center gap-1">
                                <CoinIcon width={20} height={20} className={cn(nextEnergyLimit && nextEnergyLimit.required_money > user.revenue && "coin-is-grayscale")} />
                                <TypographySmall text={String(formatCoin(nextEnergyLimit?.required_money || 0))} className="text-[14px] text-white ml-1" />
                                <span className="text-[#8b8e93]">•</span>
                                <TypographySmall text={String(nextEnergyLimit?.level) + ' lv'} className="text-[14px] text-[#8b8e93] font-light" />
                            </div>
                        </div>
                    </div>
                    <div className="earn-item-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" xmlSpace="preserve"><path d="M9 20.6c-.3 0-.6-.1-.8-.3-.4-.4-.4-1.2 0-1.6l6.7-6.7-6.7-6.7c-.4-.4-.4-1.2 0-1.6s1.2-.4 1.6 0l7.5 7.5c.4.4.4 1.2 0 1.6l-7.5 7.5c-.2.2-.5.3-.8.3z" fill="currentColor"></path></svg>
                    </div>
                </div>
            </div>
        </div>
    )
}
