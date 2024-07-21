'use client'

import Image from "next/image"
import { useState } from "react"
import { Button } from "@ui/components/button"
import { cn } from "@ui/lib/utils"

import MotionContainer from "@ui/components/motion/container"
import TypographyLarge from "@ui/components/typography/large"
import TypographySmall from "@ui/components/typography/small"

import listBonus from "@shared/constant/listBonus"

export default function Page(): JSX.Element {
    const [isOpenBonus, setIsOpenBonus] = useState(false)

    return (
        <div className="w-full h-screen relative space-y-2 overflow-y-auto p-5 text-center bg-black">
            <MotionContainer direction="right">
                <TypographyLarge text="Mời bạn bè!" className="text-white text-[32px]" />
            </MotionContainer>
            <MotionContainer direction="left">
                <TypographySmall text="Bạn và bạn bè sẽ nhận được phần thưởng" className="text-base text-white mt-5" />
            </MotionContainer>
            {Array.from({ length: 2 }).map((_, i) => {
                return (
                    <div className="flex justify-start items-start gap-3 rounded-2xl p-3 py-6 bg-[#272a2f]">
                        <MotionContainer type="scale">
                            <Image src="/project/gift.png" alt="@gift" width={60} height={50} />
                        </MotionContainer>
                        <div className="flex flex-col justify-start items-start gap-2">
                            <TypographySmall text="Mời bạn bè" className="text-base text-white" />
                            <div className="flex justify-center items-start gap-1">
                                <div className="w-[6px] h-[6px] rounded-full mr-1 mt-2 bg-[#ffd337]"></div>
                                <div className="flex justify-center items-center gap-1">
                                    <Image src="/project/icon_coin.png" alt="@coin" width={20} height={20} />
                                    <TypographySmall text="+5.000" className="text-[14px] text-[#ffd337] ml-1" />
                                </div>
                                <span className="text-[14px] font-extralight">cho bạn và bạn của bạn</span>
                            </div>
                        </div>
                    </div>
                )
            })}
            {!isOpenBonus ?
                <div className="pt-2" onClick={() => setIsOpenBonus(true)}>
                    <TypographySmall text="Nhiều phần thưởng hơn" className="text-xl text-[#5a60ff] font-bold cursor-pointer" />
                </div>
                :
                <div className="pt-2 flex flex-col justify-start items-start gap-2 cursor-pointer" onClick={() => setIsOpenBonus(false)} >
                    <TypographySmall text="Bonus cho việc lên cấp" className="text-2xl text-white font-bold" />
                    <div className="w-full flex justify-start items-start px-4 py-2">
                        <TypographySmall text="Level" className="text-[14px] text-[#8b8e93] w-full text-left" />
                        <TypographySmall text="For friend" className="text-[14px] text-[#8b8e93] w-full" />
                        <TypographySmall text="Premium" className="text-[14px] text-[#8b8e93] w-full" />
                    </div>
                    {listBonus.map((item, i) => {
                        return (
                            <div className="w-full flex justify-between items-center px-4 py-2 bg-[#272a2f] rounded-2xl">
                                <div className="flex justify-start items-center gap-2">
                                    <div className={cn("w-[40px] h-[40px] bg-cover bg-no-repeat bg-center rounded-lg", `bg-[url(/project/bonus/bonus-${item.name.toLowerCase()}.jpg)]`)}>
                                    </div>
                                    <TypographySmall text={item.name} className="text-[12px] font-light" />
                                </div>
                                <div className="flex justify-center items-center gap-1">
                                    <Image src="/project/icon_coin.png" alt="@coin" width={20} height={20} />
                                    <TypographySmall text={`+${item.for_friend}`} className="text-[14px] text-[#ffd337] ml-1" />
                                </div>
                                <div className="flex justify-center items-center gap-1">
                                    <Image src="/project/icon_coin.png" alt="@coin" width={20} height={20} />
                                    <TypographySmall text={`+${item.premium}`} className="text-[14px] text-[#ffd337] ml-1" />
                                </div>
                            </div>
                        )
                    })}
                </div>
            }
            <div className="pt-2 w-full flex justify-between items-center">
                <TypographySmall text="Danh sách bạn bè của bạn " className="text-base text-white" />
                <div className="mine-item-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" xmlSpace="preserve" viewBox="0 0 800 800"><path d="M400 733.3c-82.1 0-161.1-30.1-222.2-84.9l-.1-.1-44.3-40V700c0 18.4-14.9 33.3-33.3 33.3S66.7 718.4 66.7 700V533.5c0-1.3.1-2.5.2-3.8.3-2.6.8-5.1 1.7-7.4v-.1c1.2-3.4 3-6.7 5.4-9.7l.1-.1.1-.1c.4-.5.9-1 1.3-1.5 3.2-3.5 7-6.1 11.1-7.9 3.8-1.7 7.9-2.7 12.3-2.8h167.9c18.4 0 33.3 14.9 33.3 33.3s-14.9 33.3-33.3 33.3h-80l35.6 32.1c48.9 43.8 112 67.9 177.7 67.9 147 0 266.7-119.6 266.7-266.7 0-18.4 14.9-33.3 33.3-33.3s33.3 14.9 33.3 33.3c0 45-8.8 88.6-26.2 129.8-16.8 39.7-40.8 75.3-71.4 105.9-30.6 30.6-66.2 54.6-105.9 71.4-41.3 17.4-84.9 26.2-129.9 26.2zm-300-300c-18.4 0-33.3-14.9-33.3-33.3 0-45 8.8-88.6 26.2-129.8 16.8-39.7 40.8-75.3 71.4-105.9 30.6-30.6 66.2-54.6 105.9-71.4C311.4 75.5 355 66.7 400 66.7c82.1 0 161.1 30.1 222.2 84.9l.1.1 44.3 40V100c0-18.4 14.9-33.3 33.3-33.3s33.3 14.9 33.3 33.3v166.5c0 1.2-.1 2.5-.2 3.7-.3 2.7-.9 5.2-1.7 7.6v.2c-1.2 3.4-3 6.6-5.3 9.5v.1l-.1.1c-.4.5-.9 1-1.3 1.5-3.2 3.5-6.9 6.1-11 7.9-4 1.8-8.5 2.8-13.1 2.9H533.3c-18.4 0-33.3-14.9-33.3-33.3s14.9-33.3 33.3-33.3h80l-35.6-32.1c-48.9-43.8-112-67.9-177.7-67.9C253 133.3 133.3 253 133.3 400c0 18.4-14.9 33.3-33.3 33.3z" fill="currentColor"></path></svg>
                </div>
            </div>
            <div className="flex justify-center items-center pt-2 bg-[#272a2f] h-[80px] p-4 rounded-2xl text-center">
                <TypographySmall text="Bạn chưa mời ai" className="font-bold text-[#4e4f50] text-base" />
            </div>
            <div className="w-[90%] fixed bottom-20 inset-x-0 mx-auto border border-transparent flex justify-between items-start gap-2">
                <Button className="w-full h-[60px] bg-[#5a60ff]/85 hover:bg-[#5a60ff] text-white rounded-2xl scale-animated">
                    Mời bạn bè
                    <div className="icon ml-2 w-[24px] h-[24px]">
                        <svg xmlns="http://www.w3.org/2000/svg" xmlSpace="preserve" viewBox="0 0 24 24"><path d="M12 7.1c.8 0 1.6.2 2.3.7.7.5 1.2 1.1 1.5 1.9.3.8.4 1.6.2 2.4-.2.8-.6 1.5-1.1 2.1-.6.6-1.3 1-2.1 1.1-.8.2-1.6.1-2.4-.2-.8-.3-1.4-.8-1.9-1.5s-.7-1.5-.7-2.3c0-1.1.4-2.1 1.2-2.9.9-.8 1.9-1.3 3-1.3zM16.5 6H18v1.5c0 .2.1.4.2.5.1.1.3.2.5.2s.4-.1.5-.2c.1-.1.2-.3.2-.5V6H21c.2 0 .4-.1.5-.2.1-.1.2-.3.2-.5s-.1-.4-.2-.5c-.1-.1-.3-.2-.5-.2h-1.5V3c0-.2-.1-.4-.2-.5-.1-.1-.3-.2-.5-.2s-.4.1-.5.2c-.2.1-.3.3-.3.5v1.5h-1.5c-.2 0-.4.1-.5.2-.1.1-.2.3-.2.5s.1.4.2.5c.1.2.3.3.5.3zm4.3 3.8c-.2 0-.4.1-.5.3-.1.2-.2.4-.1.6.1.5.1.9.1 1.4 0 2-.7 4-2.1 5.5-.5-.8-1.2-1.5-2-2-.1 0-.2-.1-.2-.1-.1 0-.2 0-.2.1-1 .9-2.3 1.4-3.7 1.4s-2.6-.5-3.7-1.4c-.1-.1-.1-.1-.2-.1s-.2 0-.2.1c-.8.5-1.5 1.2-2 2-1.1-1.2-1.7-2.7-2-4.2-.2-1.6 0-3.2.6-4.6.7-1.4 1.7-2.7 3-3.5C8.9 4.4 10.5 4 12.1 4c.5 0 .9 0 1.4.1.2 0 .4 0 .6-.1.2-.1.3-.3.3-.5s0-.4-.1-.6c-.1-.2-.3-.3-.5-.3-2-.3-4.1 0-6 .9s-3.5 2.2-4.5 4-1.3 3.9-1 6c.3 2 1.3 3.9 2.7 5.4 1.5 1.5 3.3 2.4 5.4 2.7 2 .3 4.1 0 6-1 1.8-.9 3.3-2.5 4.2-4.3.9-1.8 1.2-3.9.9-6 0-.2-.1-.4-.3-.5-.1 0-.3-.1-.4 0z" fill="currentColor"></path></svg>
                    </div>
                </Button>
                <Button className="w-[20%] h-[60px] bg-[#5a60ff]/85 hover:bg-[#5a60ff] rounded-2xl">
                    <div className="icon w-[32px] h-[32px]">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path d="M23 27.8H5c-.4 0-.8-.3-.8-.8V9c0-.4.3-.8.8-.8h18c.4 0 .8.3.8.8v18c0 .4-.4.8-.8.8zM5.8 26.3h16.5V9.8H5.8v16.5z" fill="currentColor"></path><path d="M27 23.8c-.4 0-.8-.3-.8-.8V5.8H9c-.4 0-.8-.4-.8-.8s.4-.7.8-.7h18c.4 0 .8.3.8.8v18c0 .3-.4.7-.8.7z" fill="currentColor"></path></svg>
                    </div>
                </Button>
            </div>
        </div>
    )
}