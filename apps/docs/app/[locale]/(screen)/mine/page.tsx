'use client'

import Image from "next/image"
import { useEffect, useState } from "react"
import { useRouter } from '@shared/next-intl/navigation';
import { Separator } from "@ui/components/separator"
import { Card, CardContent, CardHeader } from "@ui/components/card"
import { Progress } from "@ui/components/progress"
import { Button } from "@ui/components/button"
import { DialogDescription, DialogHeader } from "@ui/components/dialog"
import { Popover, PopoverContent, PopoverTrigger } from "@ui/components/popover"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@ui/components/tabs"

import MotionContainer from "@ui/components/motion/container"
import TypographySmall from "@ui/components/typography/small"
import TypographyLarge from "@ui/components/typography/large"

import MineButton from "@shared/components/MineButton"
import CardProfit from "@shared/components/CardProfit"
import CountdownTimer from "@shared/components/CountdownTimer"
import DrawerInfoCountdown from "@shared/components/DrawerInfoCountdown"

import { useCategories } from "@server/_action/category-action";
import { useCardByCategory } from "@server/_action/card-action";

import { ICard } from "@server/_types/card";
import DrawerMinCard from "../../../shared/components/DrawerMinCard";

const { initHapticFeedback } = require('@telegram-apps/sdk-react');

export default function Page(): JSX.Element {
    const { data: categories, error, isLoading } = useCategories();
    const getListCards = useCardByCategory();

    const router = useRouter()
    const haptic = initHapticFeedback();

    const [cardData, setCardData] = useState<ICard[] | []>([]);
    const [currentTab, setCurrentTab] = useState(categories && categories[0]?.name.toLowerCase());
    const [progress, setProgress] = useState(25)
    const targetDate = new Date();
    targetDate.setHours(24, 0, 0, 0);


    const handleTabChange = (value: string) => {
        setCurrentTab(value);
    };

    useEffect(() => {
        if (categories && categories.length > 0 && !currentTab) {
            setCurrentTab(categories[0]?.name.toLowerCase());
        }
    }, [categories]);

    useEffect(() => {
        if (currentTab && categories) {
            const category = categories.find(category => category.name.toLowerCase() === currentTab);
            if (category) {
                getListCards.mutate({ category_id: category.id }, {
                    onSuccess: data => {
                        if (data.data) {
                            setCardData(data.data);
                        }
                    }
                });
            }
        }
    }, [currentTab, categories]);

    if (!categories || isLoading) return <></>;

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
            <Card className="card-has-glow w-full min-h-screen border-none pb-20">
                <CardHeader className="px-4">
                    <MotionContainer className="w-full flex flex-col justify-end items-center gap-3">
                        <div className="w-full flex justify-end items-center gap-2">
                            <CountdownTimer targetTime={targetDate} />
                            <DrawerInfoCountdown />
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
                <MineButton
                    isScreenMine={true}
                    tabScreenMine={
                        <CardContent className="w-full mt-5 p-4">
                            <Tabs value={currentTab} onValueChange={handleTabChange} className="w-full">
                                <MotionContainer className="w-full flex justify-center items-center" direction="left">
                                    <TabsList className="w-full bg-[#272a2f]">
                                        {categories?.map((item, i) => {
                                            return (
                                                <TabsTrigger key={i} value={item.name.toLowerCase()} className="w-full text-white text-[12px] px-3">{item.name}</TabsTrigger>
                                            )
                                        })}
                                    </TabsList>
                                </MotionContainer>
                                <TabsContent value={currentTab ?? categories[0]!.name.toLowerCase()} className="relative w-full grid grid-cols-2 justify-start items-start gap-2">
                                    {cardData.map((item, i) => {
                                        return (
                                            <DrawerMinCard
                                                drawerTrigger={
                                                    <div key={i} className="bg-[#272a2f] text-white rounded-2xl select-none p-2">
                                                        <div className="w-full flex justify-start items-start gap-3">
                                                            <div className="w-[60px] h-[60px]">
                                                                <Image src={item.image ?? ''} alt="@imageTask" width={60} height={60} className="w-full h-full" />
                                                            </div>
                                                            <div className="flex flex-col justify-between items-start gap-4">
                                                                <TypographyLarge text={item.name} className="text-white text-xs font-extralight" />
                                                                <div className="flex flex-col justify-start items-start">
                                                                    <TypographySmall text="Lợi nhuận mỗi giờ" className="text-[#8b8e93] text-[10px] font-extralight" />
                                                                    <div className="flex justify-center items-center gap-1">
                                                                        <div className="w-[16px] h-[16px]">
                                                                            <Image src="/project/icon_coin.png" alt="@coin" width={18} height={18} className="w-full h-full" />
                                                                        </div>
                                                                        <TypographySmall text={`+${String(item.card_profits[0]?.profit)}`} className="text-white text-[12px]" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <Separator className="my-2 bg-[#34383f]" />
                                                        <div className="flex h-5 items-center space-x-4 text-sm">
                                                            <TypographySmall text={`lv ${item.card_profits[0]?.level}`} className="text-white text-[12px]" />
                                                            <Separator orientation="vertical" className="bg-[#34383f]" />
                                                            <Image src="/project/icon_coin.png" alt="@coin" width={18} height={18} />
                                                            <TypographySmall text={String(item.card_profits[0]?.required_money)} className="text-white text-[12px] !m-1" />
                                                        </div>
                                                    </div>
                                                }
                                                drawerContent={
                                                    <div key={i} className="mt-5 w-full flex flex-col justify-center items-center gap-2">
                                                        <Image src={item.image ?? ''} alt="@imageTask" width={115} height={115} />
                                                        <TypographySmall text={item.name} className="text-white text-[28px] font-semibold" />
                                                        <TypographySmall text={item.description} className="text-white text-[14px]" />
                                                        <div className="flex flex-col justify-center items-center">
                                                            <TypographySmall text="Lợi nhuận mỗi giờ" className="text-[#8b8e93] text-[10px] font-extralight" />
                                                            <div className="flex justify-center items-center gap-1">
                                                                <div className="w-[16px] h-[16px]">
                                                                    <Image src="/project/icon_coin.png" alt="@coin" width={18} height={18} className="w-full h-full" />
                                                                </div>
                                                                <TypographySmall text={`+${String(item.card_profits[0]?.profit)}`} className="text-white text-[12px]" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                }
                                            />
                                        )
                                    })}
                                </TabsContent>
                            </Tabs>
                        </CardContent>
                    }
                />
            </Card>
        </div>
    )
}