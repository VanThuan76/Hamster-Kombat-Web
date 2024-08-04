'use client'

import Image from "next/image"
import { useState } from "react"
import { useTranslations } from "next-intl"
import { Button } from "@ui/components/button"

import MotionContainer from "@ui/components/motion/Container"
import TypographyLarge from "@ui/components/typography/large"
import TypographySmall from "@ui/components/typography/small"

import InviteFriends from '@shared/components/InviteFriends'
import listBonus from "@shared/constant/listBonus"
import useBackButton from "@shared/hooks/useBackButton"

import { formatCoinStyleDot } from "@shared/utils/formatNumber"

const { initUtils } = require('@telegram-apps/sdk-react');

export default function Page(): JSX.Element {
    const t = useTranslations('screens.friends')

    const [isOpenBonus, setIsOpenBonus] = useState(false)
    const utils = initUtils();
    useBackButton()

    return (
        <div className="w-full h-screen relative space-y-2 overflow-y-auto p-5 text-center bg-black pb-40">
            <MotionContainer direction="right">
                <TypographyLarge text={t('invite_friends')} className="text-white text-[32px]" />
            </MotionContainer>
            <MotionContainer direction="left">
                <TypographySmall text={t('des_invite_friends')} className="text-base text-white mt-5" />
            </MotionContainer>
            {Array.from({ length: 2 }).map((_, i) => {
                return (
                    <div key={i} className="flex justify-start items-start gap-3 rounded-2xl p-3 py-6 bg-[#272a2f]">
                        <MotionContainer type="scale">
                            <Image src="/project/gift.png" alt="@gift" width={60} height={50} priority={true} />
                        </MotionContainer>
                        <div className="flex flex-col justify-start items-start gap-2">
                            <TypographySmall text={t('invite_friends_card')} className="text-base text-white" />
                            <div className="flex justify-center items-start gap-1">
                                <div className="w-[6px] h-[6px] rounded-full mr-1 mt-2 bg-[#ffd337]"></div>
                                <div className="flex justify-center items-center gap-1">
                                    <Image src="/project/icon_coin.png" alt="@coin" width={20} height={20} priority={true} />
                                    <TypographySmall text="+5.000" className="text-[14px] text-[#ffd337] ml-1" />
                                </div>
                                <span className="text-[14px] font-extralight">{t('des_invite_friends_card')}</span>
                            </div>
                        </div>
                    </div>
                )
            })}
            {!isOpenBonus ?
                <div className="pt-2" onClick={() => setIsOpenBonus(true)}>
                    <TypographySmall text={t('more_bonuses')} className="text-xl text-[#5a60ff] font-bold cursor-pointer" />
                </div>
                :
                <div className="pt-2 flex flex-col justify-start items-start gap-2 cursor-pointer" onClick={() => setIsOpenBonus(false)} >
                    <TypographySmall text={t('more_bonuses_two')} className="text-2xl text-white font-bold" />
                    <div className="w-full flex justify-start items-start px-4 py-2">
                        <TypographySmall text={t('level')} className="text-[14px] text-[#8b8e93] w-full text-left" />
                        <TypographySmall text={t('for_friend')} className="text-[14px] text-[#8b8e93] w-full" />
                        <TypographySmall text={t('premium')} className="text-[14px] text-[#8b8e93] w-full" />
                    </div>
                    {listBonus.map((item, i) => {
                        return (
                            <div className="w-full flex justify-between items-center p-2 bg-[#272a2f] rounded-2xl">
                                <div className="flex justify-start items-center gap-2">
                                    <div className="h-[40px] w-[40px]">
                                        <Image src={item.image} alt={item.name} width={100} height={100} className="w-full h-full rounded-md object-cover" priority={true} />
                                    </div>
                                    <TypographySmall text={item.name} className="text-[12px] font-light" />
                                </div>
                                <div className="flex justify-center items-center gap-1">
                                    <Image src="/project/icon_coin.png" alt="@coin" width={20} height={20} priority={true} />
                                    <TypographySmall text={`+${formatCoinStyleDot(item.for_friend)}`} className="text-[12px] text-[#ffd337] ml-1" />
                                </div>
                                <div className="flex justify-center items-center gap-1">
                                    <Image src="/project/icon_coin.png" alt="@coin" width={20} height={20} priority={true} />
                                    <TypographySmall text={`+${formatCoinStyleDot(item.premium)}`} className="text-[12px] text-[#ffd337] ml-1" />
                                </div>
                            </div>
                        )
                    })}
                </div>
            }
            <div className="pt-2 w-full flex justify-between items-center">
                <TypographySmall text={t('list_friend')} className="text-base text-white" />
                <div className="mine-item-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" xmlSpace="preserve" viewBox="0 0 800 800"><path d="M400 733.3c-82.1 0-161.1-30.1-222.2-84.9l-.1-.1-44.3-40V700c0 18.4-14.9 33.3-33.3 33.3S66.7 718.4 66.7 700V533.5c0-1.3.1-2.5.2-3.8.3-2.6.8-5.1 1.7-7.4v-.1c1.2-3.4 3-6.7 5.4-9.7l.1-.1.1-.1c.4-.5.9-1 1.3-1.5 3.2-3.5 7-6.1 11.1-7.9 3.8-1.7 7.9-2.7 12.3-2.8h167.9c18.4 0 33.3 14.9 33.3 33.3s-14.9 33.3-33.3 33.3h-80l35.6 32.1c48.9 43.8 112 67.9 177.7 67.9 147 0 266.7-119.6 266.7-266.7 0-18.4 14.9-33.3 33.3-33.3s33.3 14.9 33.3 33.3c0 45-8.8 88.6-26.2 129.8-16.8 39.7-40.8 75.3-71.4 105.9-30.6 30.6-66.2 54.6-105.9 71.4-41.3 17.4-84.9 26.2-129.9 26.2zm-300-300c-18.4 0-33.3-14.9-33.3-33.3 0-45 8.8-88.6 26.2-129.8 16.8-39.7 40.8-75.3 71.4-105.9 30.6-30.6 66.2-54.6 105.9-71.4C311.4 75.5 355 66.7 400 66.7c82.1 0 161.1 30.1 222.2 84.9l.1.1 44.3 40V100c0-18.4 14.9-33.3 33.3-33.3s33.3 14.9 33.3 33.3v166.5c0 1.2-.1 2.5-.2 3.7-.3 2.7-.9 5.2-1.7 7.6v.2c-1.2 3.4-3 6.6-5.3 9.5v.1l-.1.1c-.4.5-.9 1-1.3 1.5-3.2 3.5-6.9 6.1-11 7.9-4 1.8-8.5 2.8-13.1 2.9H533.3c-18.4 0-33.3-14.9-33.3-33.3s14.9-33.3 33.3-33.3h80l-35.6-32.1c-48.9-43.8-112-67.9-177.7-67.9C253 133.3 133.3 253 133.3 400c0 18.4-14.9 33.3-33.3 33.3z" fill="currentColor"></path></svg>
                </div>
            </div>
            <div className="flex justify-center items-center pt-2 bg-[#272a2f] h-[80px] p-4 rounded-2xl text-center">
                <TypographySmall text={t('invite_friends_no')} className="font-bold text-[#4e4f50] text-base" />
            </div>
            <div className="w-[90%] fixed bottom-20 inset-x-0 mx-auto border border-transparent flex justify-between items-start gap-2">
                <InviteFriends />
                <Button
                    className="w-[20%] h-[60px] bg-[#5a60ff]/85 hover:bg-[#5a60ff] rounded-2xl"
                    onClick={() => {
                        utils.readTextFromClipboard().then((data: any) => {
                            console.log('Clipboard data:', data);
                        });
                    }}
                >
                    <div className="icon w-[32px] h-[32px]">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path d="M23 27.8H5c-.4 0-.8-.3-.8-.8V9c0-.4.3-.8.8-.8h18c.4 0 .8.3.8.8v18c0 .4-.4.8-.8.8zM5.8 26.3h16.5V9.8H5.8v16.5z" fill="currentColor"></path><path d="M27 23.8c-.4 0-.8-.3-.8-.8V5.8H9c-.4 0-.8-.4-.8-.8s.4-.7.8-.7h18c.4 0 .8.3.8.8v18c0 .3-.4.7-.8.7z" fill="currentColor"></path></svg>
                    </div>
                </Button>
            </div>
        </div>
    )
}