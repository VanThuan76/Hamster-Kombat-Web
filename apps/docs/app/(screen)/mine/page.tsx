'use client'

import Image from "next/image"
import { useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { Separator } from "@ui/components/separator"
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from "@ui/components/card"
import { Progress } from "@ui/components/progress"
import { Button } from "@ui/components/button"
import { DialogDescription, DialogHeader } from "@ui/components/dialog"
import { Popover, PopoverContent, PopoverTrigger } from "@ui/components/popover"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@ui/components/tabs"

import Drawer from "@ui/components/drawer"
import MotionContainer from "@ui/components/motion/container"
import TypographySmall from "@ui/components/typography/small"
import TypographyLarge from "@ui/components/typography/large"

import tabListMine from "@shared/constant/tabListMine"
import taskListMine from "@shared/constant/taskListMine"
import MineButton from "@shared/components/MineButton"
import MemoTypographyLarge from "@shared/components/MemoTypographyLarge"
import CardProfit from "@shared/components/CardProfit"

const { initHapticFeedback } = require('@telegram-apps/sdk-react');

export default function Page(): JSX.Element {
    const router = useRouter()
    const haptic = initHapticFeedback();

    const [progress, setProgress] = useState(25)
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [points, setPoints] = useState(770);
    const [energy, setEnergy] = useState(1000);

    function handleIncludedCoin() {
        setPoints(points + 1);
        setEnergy(energy - 1);
    }

    const formattedPoints = useMemo(() => points.toLocaleString(), [points]);
    const formattedEnergy = useMemo(() => energy.toLocaleString(), [energy]);

    const handleOpenDrawer = () => setIsDrawerOpen(true);
    const handleCloseDrawer = () => setIsDrawerOpen(false);

    return (
        <div className="w-full h-screen relative overflow-y-auto overflow-hidden">
            <DialogHeader className="p-4">
                <DialogDescription className="w-full flex justify-between items-center">
                    <div className="flex flex-[0.5] flex-col justify-start items-start gap-1 pr-5">
                        <div
                            className="w-full flex justify-between items-start cursor-pointer"
                            onClick={() => {
                                router.push('/rank')
                                haptic.impactOccurred('medium');
                            }}
                        >
                            <div className="flex justify-start items-center gap-[2px] cursor-pointer">
                                <TypographySmall text="Bronze" className="text-[10px] text-white" />
                                <div className="w-[10px] h-[10px] text-white"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" xmlSpace="preserve"><path d="M9 20.6c-.3 0-.6-.1-.8-.3-.4-.4-.4-1.2 0-1.6l6.7-6.7-6.7-6.7c-.4-.4-.4-1.2 0-1.6s1.2-.4 1.6 0l7.5 7.5c.4.4.4 1.2 0 1.6l-7.5 7.5c-.2.2-.5.3-.8.3z" fill="currentColor"></path></svg></div>
                            </div>
                            <div className="text-[10px] text-white">1/11</div>
                        </div>
                        <Progress
                            value={progress}
                            className="w-full h-[8px] bg-[#ffffff26] border border-[hsla(0,0%,100%,.1)]"
                        />
                    </div>
                    <CardProfit />
                </DialogDescription>
            </DialogHeader>
            <Card className="card-has-glow w-full min-h-[170%] border-none">
                <CardHeader className="px-4">
                    <MotionContainer className="w-full flex flex-col justify-end items-center gap-3">
                        <div className="w-full flex justify-end items-center gap-2">
                            <TypographySmall text="22:22:00" className="text-[#8b8e93] text-xs font-extralight" />
                            <div style={{ color: '#8b8e93' }}>
                                <svg width="17" height="18" viewBox="0 0 17 18" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8.5 0.570312C6.83277 0.570313 5.20298 1.06471 3.81672 1.99097C2.43047 2.91724 1.35001 4.23377 0.711988 5.7741C0.073965 7.31442 -0.092971 9.00935 0.23229 10.6446C0.557552 12.2797 1.3604 13.7818 2.53931 14.9607C3.71823 16.1396 5.22025 16.9425 6.85545 17.2677C8.49065 17.593 10.1856 17.426 11.7259 16.788C13.2662 16.15 14.5828 15.0695 15.509 13.6833C16.4353 12.297 16.9297 10.6672 16.9297 9C16.9273 6.76503 16.0384 4.62228 14.4581 3.04192C12.8777 1.46156 10.735 0.572673 8.5 0.570312ZM8.17579 4.46094C8.36816 4.46094 8.55621 4.51798 8.71616 4.62486C8.87612 4.73174 9.00078 4.88364 9.0744 5.06137C9.14802 5.2391 9.16728 5.43467 9.12975 5.62335C9.09222 5.81203 8.99959 5.98534 8.86356 6.12137C8.72753 6.25739 8.55422 6.35003 8.36554 6.38756C8.17686 6.42509 7.9813 6.40583 7.80357 6.33221C7.62584 6.25859 7.47393 6.13392 7.36705 5.97397C7.26017 5.81402 7.20313 5.62597 7.20313 5.43359C7.20313 5.17563 7.3056 4.92823 7.48801 4.74582C7.67042 4.56341 7.91782 4.46094 8.17579 4.46094ZM9.14844 13.5391C8.80449 13.5391 8.47462 13.4024 8.23141 13.1592C7.9882 12.916 7.85157 12.5861 7.85157 12.2422V9C7.67959 9 7.51466 8.93168 7.39305 8.81008C7.27145 8.68847 7.20313 8.52354 7.20313 8.35156C7.20313 8.17959 7.27145 8.01465 7.39305 7.89305C7.51466 7.77144 7.67959 7.70312 7.85157 7.70312C8.19552 7.70312 8.52538 7.83976 8.76859 8.08297C9.01181 8.32618 9.14844 8.65605 9.14844 9V12.2422C9.32042 12.2422 9.48535 12.3105 9.60696 12.4321C9.72856 12.5537 9.79688 12.7186 9.79688 12.8906C9.79688 13.0626 9.72856 13.2275 9.60696 13.3491C9.48535 13.4707 9.32042 13.5391 9.14844 13.5391Z" fill="currentColor"></path>
                                </svg>
                            </div>
                        </div>
                        <div className="w-full flex justify-between items-center bg-[#272a2f] rounded-lg p-2">
                            <TypographyLarge text="Thẻ kết hợp hàng ngày" className="text-white text-[14px] w-[30%]" />
                            <div className="flex justify-center items-center gap-1">
                                {Array.from({ length: 3 }).map((_, i) => {
                                    return (
                                        <div key={i} className="w-[14px] h-[14px] bg-[#ffffff0d] rounded-full border-2 border-[#68696a]"></div>
                                    )
                                })}
                            </div>
                            <Button className="flex justify-center items-center gap-2 bg-button-mine rounded-md p-2">
                                <Image src="/project/icon_coin.png" alt="@coin" width={18} height={18} />
                                <TypographySmall text="+5.000.000" className="text-white text-[14px]" />
                            </Button>
                        </div>
                        <div className="w-full flex justify-center items-center gap-2">
                            {Array.from({ length: 3 }).map((_, i) => {
                                return (
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <div key={i} className="daily-combo-card">
                                                <div className="daily-combo-card-inner">
                                                    <div className="bg-[#ffffff0d] rounded-md m-4 h-[75%]">
                                                        <Image src="/project/img_daily-combo.png" alt="@dailyCombo" width={91} height={104} />
                                                    </div>
                                                </div>
                                            </div>
                                        </PopoverTrigger>
                                        <PopoverContent className="bg-black border-none w-[130px] px-1 py-[6px] text-center rounded-xl" align="start">
                                            <TypographySmall text="Tìm thẻ kết hợp bên dưới và nâng cấp nó lên" className="text-white text-[11px] text-center leading-3" />
                                        </PopoverContent>
                                    </Popover>
                                )
                            })}
                        </div>
                    </MotionContainer>
                </CardHeader>
                <CardDescription>
                    <MotionContainer className="w-full flex justify-center items-center gap-2" type="scale">
                        <Image src="/project/icon_coin.png" alt="@coin" width={40} height={40} />
                        <MemoTypographyLarge text={formattedPoints} className="text-white" />
                    </MotionContainer>
                </CardDescription>
                <CardContent className="w-full mt-5 p-4">
                    <Tabs defaultValue={tabListMine[0]?.toLowerCase()} className="w-full">
                        <MotionContainer className="w-full flex justify-center items-center" direction="left">
                            <TabsList className="w-full bg-[#272a2f]">
                                {tabListMine.map((item, i) => {
                                    return (
                                        <TabsTrigger key={i} value={item.toLowerCase()} className="w-full text-white text-[12px] px-3">{item}</TabsTrigger>
                                    )
                                })}
                            </TabsList>
                        </MotionContainer>
                        <TabsContent value={tabListMine[0]?.toLowerCase() as string} className="relative w-full grid grid-cols-2 justify-start items-start gap-2">
                            {taskListMine.map((item, i) => {
                                return (
                                    <>
                                        <div key={i} onClick={handleOpenDrawer} className="bg-[#272a2f] text-white rounded-2xl select-none p-2">
                                            <div className="w-full flex justify-start items-start gap-3">
                                                <div className="w-[60px] h-[60px]">
                                                    <Image src={item.image} alt="@imageTask" width={60} height={60} className="w-full h-full" />
                                                </div>
                                                <div className="flex flex-col justify-between items-start gap-4">
                                                    <TypographyLarge text="KYC" className="text-white text-xs font-extralight" />
                                                    <div className="flex flex-col justify-start items-start">
                                                        <TypographySmall text="Lợi nhuận mỗi giờ" className="text-[#8b8e93] text-[10px] font-extralight" />
                                                        <div className="flex justify-center items-center gap-1">
                                                            <div className="w-[16px] h-[16px]">
                                                                <Image src="/project/icon_coin.png" alt="@coin" width={18} height={18} className="w-full h-full" />
                                                            </div>
                                                            <TypographySmall text={String(item.price_value_for_hour)} className="text-white text-[12px]" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <Separator className="my-2 bg-[#34383f]" />
                                            <div className="flex h-5 items-center space-x-4 text-sm">
                                                <TypographySmall text={`lv ${item.upgrade_level}`} className="text-white text-[12px]" />
                                                <Separator orientation="vertical" className="bg-[#34383f]" />
                                                <Image src="/project/icon_coin.png" alt="@coin" width={18} height={18} />
                                                <TypographySmall text={String(item.prive_value)} className="text-white text-[12px] !m-1" />
                                            </div>
                                        </div>
                                        <Drawer isOpen={isDrawerOpen} onClose={handleCloseDrawer} className="w-full card-has-glow h-[67%] md:h-[63%] border-none">
                                            <h2 className="text-lg font-bold">Drawer Content</h2>
                                            <p>Here is some content inside the drawer.</p>
                                        </Drawer>
                                    </>
                                )
                            })}
                        </TabsContent>
                    </Tabs>
                </CardContent>
                <CardFooter className="mt-5 w-full flex flex-col justify-center items-center">
                    <MineButton handleIncreaseCoin={handleIncludedCoin} />
                    <div className="w-full flex justify-between items-center pb-0">
                        <div className="w-full flex justify-start items-center gap-1">
                            <Image src="/project/icon_flash.svg" alt="@flash" width={26} height={26} />
                            <MemoTypographyLarge text={`${formattedEnergy} / 1000`} className="text-white text-base" />
                        </div>
                        <div className="w-full flex justify-end items-center gap-1"
                            onClick={() => {
                                router.push('/boost')
                                haptic.impactOccurred('medium');
                            }}>
                            <Image src="/project/icon_rocket.png" alt="@rocket" width={48} height={48} />
                            <TypographyLarge text="Boost" className="text-white text-base" />
                        </div>
                    </div>
                </CardFooter>
            </Card>
        </div>
    )
}