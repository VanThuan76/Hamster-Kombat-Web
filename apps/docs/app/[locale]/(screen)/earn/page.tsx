'use client'

import Image from "next/image"
import { useTranslations } from "next-intl"

import { cn } from "@ui/lib/utils";
import MotionContainer from "@ui/components/motion/Container"
import TypographyLarge from "@ui/components/typography/large"
import TypographySmall from "@ui/components/typography/small"

import CoinIcon from "@shared/components/CoinIcon";

import { formatCoinStyleDot } from "@shared/utils/formatNumber"
import { useAppSelector } from "@shared/redux/store";
import { useDraw } from "@shared/hooks/useDraw";
import useBackButton from "@shared/hooks/useBackButton"

function CheckIcon({ is_completed }: { is_completed: number }) {
    if (is_completed === 1) {
        return (
            <div className="earn-item-icon-success">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-[12px] h-[12px]" viewBox="0 0 24 24" xmlSpace="preserve"><path d="M9 19.9c-.3 0-.6-.1-.8-.3L3 14.3c-.4-.4-.4-1.2 0-1.6s1.2-.4 1.6 0L9 17.2 20.2 6c.4-.4 1.2-.4 1.6 0 .4.4.4 1.2 0 1.6l-12 12c-.2.2-.5.3-.8.3z" fill="currentColor"></path></svg>
            </div>
        )
    } else {
        return (
            <div className="earn-item-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" xmlSpace="preserve"><path d="M9 20.6c-.3 0-.6-.1-.8-.3-.4-.4-.4-1.2 0-1.6l6.7-6.7-6.7-6.7c-.4-.4-.4-1.2 0-1.6s1.2-.4 1.6 0l7.5 7.5c.4.4.4 1.2 0 1.6l-7.5 7.5c-.2.2-.5.3-.8.3z" fill="currentColor"></path></svg>
            </div>
        )
    }
}

export default function Page(): JSX.Element {
    const { earns } = useAppSelector(state => state.app)
    const { onOpen } = useDraw()

    const t = useTranslations('screens.earn')

    useBackButton()

    return (
        <div className="relative w-full h-screen p-5 pb-24 space-y-2 overflow-hidden overflow-y-auto text-center">
            <MotionContainer className="relative w-full" direction="top">
                <div className="icon_earn"><svg width="275" height="275" viewBox="0 0 275 275" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g filter="url(#filter0_f_1464_6497)">
                        <circle cx="137.529" cy="137.471" r="72.4143" fill="#FFD337"></circle>
                    </g>
                    <circle cx="137" cy="138" r="63.4286" fill="white" fillOpacity="0.05"></circle>
                    <circle cx="137" cy="138" r="74" fill="white" fillOpacity="0.05"></circle>
                    <defs>
                        <filter id="filter0_f_1464_6497" x="0.0999756" y="0.0428467" width="274.857" height="274.857" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                            <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
                            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend>
                            <feGaussianBlur stdDeviation="32.5071" result="effect1_foregroundBlur_1464_6497"></feGaussianBlur>
                        </filter>
                    </defs>
                </svg>
                </div>
                <div className="icon_earn_image w-[106px] h-[106px]">
                    <CoinIcon width={106} height={106} className="w-full h-full" />
                </div>
            </MotionContainer>
            <div className="h-[220px]"></div>
            <MotionContainer className="relative w-full" direction="right">
                <TypographyLarge text={t('earn_coin')} className="text-white text-[32px]" />
            </MotionContainer>
            <div className="flex flex-col items-start justify-start gap-2">
                <TypographySmall text="Lion Youtube" className="mt-5 text-base text-white" />
                {earns.find(item => item.type === 1)?.earn.map((earn, i) => {
                    return (
                        <div
                            key={i}
                            className={cn('w-full flex justify-between items-center rounded-2xl min-h-[64px] px-3 ]', earn.is_completed === 1 ? 'bg-[#272a2fb3]' : 'bg-[#272a2f]')}
                            onClick={() => {
                                onOpen("itemEarn", earn)
                            }}
                        >
                            <div className="flex items-center justify-start gap-2">
                                <MotionContainer type="scale">
                                    <Image src={process.env.NEXT_PUBLIC_DOMAIN_BACKEND + '/' + earn.image} alt={earn.name} width={56} height={56} priority={true} />
                                </MotionContainer>
                                <div className="flex flex-col items-start justify-start">
                                    <TypographySmall text={earn.description} className="text-[14px] text-white font-extralight" />
                                    <div className="flex items-center justify-center gap-1">
                                        <CoinIcon width={20} height={20} />
                                        <TypographySmall text={`+${formatCoinStyleDot(earn.reward)}`} className="text-[14px] text-white ml-1" />
                                    </div>
                                </div>
                            </div>
                            <CheckIcon is_completed={earn.is_completed} />
                        </div>
                    )
                })}
            </div>
            {/* //Calendar */}
            <div className="flex flex-col items-start justify-start gap-2">
                <TypographySmall text={t('daily_tasks')} className="mt-5 text-base text-white" />
                <div className="w-full flex justify-between items-center rounded-2xl min-h-[64px] px-3 bg-[#272a2f]" onClick={() => onOpen("calendarEarn")}>
                    <div className="flex items-center justify-start gap-2">
                        <MotionContainer type="scale">
                            <Image src='/project/calendar.png' alt='@calendar' width={56} height={56} priority={true} />
                        </MotionContainer>
                        <div className="flex flex-col items-start justify-start">
                            <TypographySmall text={t('daily_reward')} className="text-[14px] text-white font-extralight" />
                            <div className="flex items-center justify-center gap-1">
                                <CoinIcon width={20} height={20} />
                                <TypographySmall text={`+${formatCoinStyleDot(earns.find(item => item.type === 3)?.earn.reduce((a, b) => a + b.reward, 0) || 0)}`} className="text-[14px] text-white ml-1" />
                            </div>
                        </div>
                    </div>
                    <div className="earn-item-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" xmlSpace="preserve"><path d="M9 20.6c-.3 0-.6-.1-.8-.3-.4-.4-.4-1.2 0-1.6l6.7-6.7-6.7-6.7c-.4-.4-.4-1.2 0-1.6s1.2-.4 1.6 0l7.5 7.5c.4.4.4 1.2 0 1.6l-7.5 7.5c-.2.2-.5.3-.8.3z" fill="currentColor"></path></svg>
                    </div>
                </div>
            </div>
            {/* //Calendar */}
            <div className="flex flex-col items-start justify-start gap-2">
                <TypographySmall text={t('task_list')} className="mt-5 text-base text-white" />
                {earns.find(item => item.type === 2)?.earn.map((earn, i) => {
                    return (
                        <div
                            key={i}
                            className={cn('w-full flex justify-between items-center rounded-2xl min-h-[64px] px-3', earn.is_completed === 1 ? 'bg-[#272a2fb3]' : 'bg-[#272a2f]')}
                            onClick={() => {
                                onOpen("itemEarn", earn)
                            }}
                        >
                            <div className="flex items-center justify-start gap-2">
                                <MotionContainer type="scale">
                                    <Image src={process.env.NEXT_PUBLIC_DOMAIN_BACKEND + '/' + earn.image} alt={earn.name} width={56} height={56} priority={true} />
                                </MotionContainer>
                                <div className="flex flex-col items-start justify-start">
                                    <TypographySmall text={earn.name} className="text-[14px] text-white font-extralight text-start truncate" />
                                    <div className="flex items-center justify-center gap-1">
                                        <CoinIcon width={20} height={20} />
                                        <TypographySmall text={`+${formatCoinStyleDot(earn.reward)}`} className="text-[14px] text-white ml-1" />
                                    </div>
                                </div>
                            </div>
                            <CheckIcon is_completed={earn.is_completed} />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
