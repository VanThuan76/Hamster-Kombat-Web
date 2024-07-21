'use client'

import Image from "next/image"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Separator } from "@ui/components/separator"
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from "@ui/components/card"
import { Progress } from "@ui/components/progress"
import { Button } from "@ui/components/button"
import { Avatar, AvatarImage, AvatarFallback } from "@ui/components/avatar"
import { DialogDescription, DialogHeader } from "@ui/components/dialog"
import { Popover, PopoverContent, PopoverTrigger } from "@ui/components/popover"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@ui/components/tabs"
import Drawer from "@ui/components/drawer"


import MotionContainer from "@ui/components/motion/container"
import PlusSign from "@ui/components/motion/plus-sign"

import TypographySmall from "@ui/components/typography/small"
import TypographyLarge from "@ui/components/typography/large"
import DrawerInfoProfit from "@shared/components/drawer-info-profit"

import tabListMine from "@shared/constant/tabListMine"
import taskListMine from "@shared/constant/taskListMine"

export default function Page(): JSX.Element {
    const router = useRouter()
    const [progress, setProgress] = useState(25)
    const [plusSigns, setPlusSigns] = useState<{ x: number; y: number }[]>([]);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const handleOpenDrawer = () => setIsDrawerOpen(true);
    const handleCloseDrawer = () => setIsDrawerOpen(false);

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        setPlusSigns([...plusSigns, { x, y }]);

        setTimeout(() => {
            setPlusSigns(current => current.slice(1));
        }, 500);
    };

    return (
        <div className="w-full h-screen relative overflow-y-auto overflow-hidden">
            <DialogHeader className="p-4">
                <DialogDescription className="w-full flex justify-between items-center">
                    <div className="flex flex-[0.5] flex-col justify-start items-start gap-1 pr-5">
                        <div className="w-full flex justify-between items-start cursor-pointer" onClick={() => router.push('/rank')}>
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
                    <div className="flex justify-between items-center bg-[#ffffff26] border border-white/10 rounded-[20px] text-white flex-1 h-[40px] relative py-1 px-4">
                        <Avatar className="flex justify-start items-center">
                            <AvatarImage src="/project/icon_ava_plus.png" alt="@userPlus" sizes="sm" className="w-[26px] h-[26px]" />
                            <AvatarFallback>UserPlus</AvatarFallback>
                        </Avatar>
                        <Separator orientation="vertical" className="bg-[#ffffff1a] w-[1px]" />
                        <div className="w-full flex flex-1 flex-col justify-start items-center pb-1">
                            <TypographySmall text="Lợi nhuận mỗi giờ" className="text-[8px] text-[#fff6]" />
                            <div className="w-full flex flex-1 justify-center items-center gap-[6px]">
                                <Image src="/project/icon_coin.png" alt="@coin" width={18} height={18} />
                                <TypographySmall text="+10" className="text-xs" />
                                <DrawerInfoProfit />
                            </div>
                        </div>
                        <Separator orientation="vertical" className="bg-[#ffffff1a] w-[1px]" />
                        <div className="pl-4 items-end">
                            <svg width="20" height="20" viewBox="0 0 26 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M25.0247 9.72615C25.0003 9.60294 24.9497 9.48641 24.8763 9.3845C24.8028 9.28259 24.7083 9.19767 24.5992 9.13553L21.3365 7.27615L21.3234 3.59897C21.323 3.47233 21.2951 3.34728 21.2417 3.23247C21.1882 3.11765 21.1105 3.01581 21.0139 2.93397C19.8304 1.93286 18.4675 1.16566 16.9976 0.673185C16.8819 0.634007 16.7592 0.619508 16.6375 0.630623C16.5158 0.641737 16.3978 0.678218 16.2911 0.737717L13 2.5774L9.70559 0.734435C9.59879 0.674602 9.48062 0.637845 9.35872 0.626541C9.23683 0.615237 9.11392 0.629637 8.99793 0.66881C7.52899 1.16445 6.16757 1.93461 4.98606 2.93834C4.88955 3.02006 4.81191 3.12173 4.75847 3.23635C4.70504 3.35096 4.67708 3.47579 4.67653 3.60225L4.66012 7.28272L1.39746 9.14209C1.28831 9.20423 1.19381 9.28915 1.1204 9.39106C1.04698 9.49298 0.996367 9.6095 0.971995 9.73272C0.673397 11.2332 0.673397 12.7778 0.971995 14.2783C0.996367 14.4016 1.04698 14.5181 1.1204 14.62C1.19381 14.7219 1.28831 14.8068 1.39746 14.869L4.66012 16.7283L4.67325 20.4066C4.67364 20.5333 4.70152 20.6583 4.75496 20.7731C4.80841 20.8879 4.88613 20.9898 4.98278 21.0716C6.16629 22.0727 7.5292 22.8399 8.99903 23.3324C9.11478 23.3716 9.23745 23.3861 9.35914 23.375C9.48084 23.3639 9.59885 23.3274 9.70559 23.2679L13 21.4227L16.2943 23.2657C16.4247 23.3383 16.5717 23.376 16.7209 23.3751C16.8165 23.375 16.9114 23.3595 17.002 23.3291C18.4706 22.8337 19.8319 22.0643 21.0139 21.0618C21.1104 20.9801 21.188 20.8784 21.2415 20.7638C21.2949 20.6492 21.3228 20.5243 21.3234 20.3979L21.3398 16.7174L24.6025 14.858C24.7116 14.7959 24.8061 14.711 24.8795 14.6091C24.9529 14.5071 25.0036 14.3906 25.0279 14.2674C25.3249 12.7681 25.3238 11.225 25.0247 9.72615ZM13 16.3751C12.1347 16.3751 11.2888 16.1185 10.5693 15.6377C9.84988 15.157 9.28912 14.4737 8.95799 13.6743C8.62686 12.8749 8.54022 11.9952 8.70903 11.1465C8.87784 10.2979 9.29452 9.51832 9.90637 8.90647C10.5182 8.29461 11.2978 7.87793 12.1464 7.70912C12.9951 7.54031 13.8748 7.62695 14.6742 7.95809C15.4736 8.28922 16.1569 8.84998 16.6376 9.56944C17.1184 10.2889 17.375 11.1348 17.375 12.0001C17.375 13.1604 16.914 14.2732 16.0936 15.0937C15.2731 15.9141 14.1603 16.3751 13 16.3751Z" fill="currentColor"></path>
                            </svg>
                        </div>
                    </div>
                </DialogDescription>
            </DialogHeader>
            <Card className="card-has-glow w-full min-h-[170%] border-none">
                <CardHeader>
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
                        <TypographyLarge text="770" className="text-white text-3xl" />
                    </MotionContainer>
                </CardDescription>
                <CardContent className="mt-5">
                    <Tabs defaultValue={tabListMine[0]?.toLowerCase()} className="w-full">
                        <MotionContainer className="w-full" direction="left">
                            <TabsList className="bg-[#272a2f]">
                                {tabListMine.map((item, i) => {
                                    return (
                                        <TabsTrigger key={i} value={item.toLowerCase()} className="w-full px-[15.5px] text-white">{item}</TabsTrigger>
                                    )
                                })}
                            </TabsList>
                        </MotionContainer>
                        <TabsContent value={tabListMine[0]?.toLowerCase() as string} className="relative w-full grid grid-cols-2 justify-start items-start gap-3">
                            {taskListMine.map((item, i) => {
                                return (
                                    <>
                                        <div key={i} onClick={handleOpenDrawer} className="bg-[#272a2f] text-white rounded-2xl select-none p-3">
                                            <div className="flex justify-start items-start gap-3">
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
                    <MotionContainer className="relative user-tap-button-inner cursor-pointer" type="scale" onClick={handleClick}>
                        <div className="user-tap-button-circle">
                            <Image src="/project/ava_bronze.png" alt="avatar" width={268} height={268} className="z-30" />
                        </div>
                        {plusSigns.map((pos, index) => (
                            <PlusSign key={index} x={pos.x} y={pos.y} />
                        ))}
                    </MotionContainer>
                    <div className="w-full flex justify-between items-center pb-0">
                        <div className="w-full flex justify-start items-center gap-1">
                            <Image src="/project/icon_flash.svg" alt="@flash" width={26} height={26} />
                            <TypographyLarge text="1000 / 1000" className="text-white text-base" />
                        </div>
                        <div className="w-full flex justify-end items-center gap-1">
                            <Image src="/project/icon_rocket.png" alt="@rocket" width={48} height={48} />
                            <TypographyLarge text="Boost" className="text-white text-base" />
                        </div>
                    </div>
                </CardFooter>
            </Card>
        </div>
    )
}