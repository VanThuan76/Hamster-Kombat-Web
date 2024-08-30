"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import { useState } from "react";
import { useTranslations } from "next-intl";

import { Card, CardContent, CardHeader } from "@ui/components/card";
import { Button } from "@ui/components/button";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@ui/components/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@ui/components/tabs";

import TypographySmall from "@ui/components/typography/small";
import TypographyLarge from "@ui/components/typography/large";

import MineButton from "@shared/components/MineButton";
import CardProfit from "@shared/components/CardProfit";
import CoinIcon from "@shared/components/CoinIcon";
import MotionContainer from "@ui/components/motion/Container";
import CardLevel from "@shared/components/CardLevel";
import useBackButton from "@shared/hooks/useBackButton";

import { DrawerData, DrawerType, useDraw } from "@shared/hooks/useDraw";
import { useAppSelector } from "@shared/redux/store/index";

import MineCard from "./_components/MineCard";

const CountdownTimer = dynamic(
    () => import("@shared/components/CountdownTimer").then((mod) => mod.default),
    { ssr: false },
);

export default function Page(): JSX.Element {
    const t = useTranslations("screens.mine");

    const { onOpen } = useDraw();

    const { user, categoryOfCards } = useAppSelector((state) => state.app);

    const [currentTab, setCurrentTab] = useState(
        categoryOfCards && categoryOfCards[0]!.name.toLowerCase(),
    );

    const targetDate = new Date();
    targetDate.setHours(24, 0, 0, 0);

    const handleTabChange = (value: string) => {
        setCurrentTab(value);
    };

    useBackButton();

    return (
        <div className="relative w-full h-screen overflow-hidden overflow-y-auto">
            <div className="p-4">
                <div className="flex items-center justify-between w-full">
                    <CardLevel />
                    <CardProfit />
                </div>
            </div>
            <Card className="w-full min-h-screen pb-20 border-none card-has-glow">
                <CardHeader className="px-4">
                    <MotionContainer className="flex items-center justify-end w-full gap-2">
                        <CountdownTimer targetTime={targetDate} />
                        <div
                            className="cursor-pointer"
                            style={{ color: "#fff3" }}
                            onClick={() => onOpen("infoMine")}
                        >
                            <svg
                                width="17"
                                height="18"
                                viewBox="0 0 17 18"
                                fill="currentColor"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M8.5 0.570312C6.83277 0.570313 5.20298 1.06471 3.81672 1.99097C2.43047 2.91724 1.35001 4.23377 0.711988 5.7741C0.073965 7.31442 -0.092971 9.00935 0.23229 10.6446C0.557552 12.2797 1.3604 13.7818 2.53931 14.9607C3.71823 16.1396 5.22025 16.9425 6.85545 17.2677C8.49065 17.593 10.1856 17.426 11.7259 16.788C13.2662 16.15 14.5828 15.0695 15.509 13.6833C16.4353 12.297 16.9297 10.6672 16.9297 9C16.9273 6.76503 16.0384 4.62228 14.4581 3.04192C12.8777 1.46156 10.735 0.572673 8.5 0.570312ZM8.17579 4.46094C8.36816 4.46094 8.55621 4.51798 8.71616 4.62486C8.87612 4.73174 9.00078 4.88364 9.0744 5.06137C9.14802 5.2391 9.16728 5.43467 9.12975 5.62335C9.09222 5.81203 8.99959 5.98534 8.86356 6.12137C8.72753 6.25739 8.55422 6.35003 8.36554 6.38756C8.17686 6.42509 7.9813 6.40583 7.80357 6.33221C7.62584 6.25859 7.47393 6.13392 7.36705 5.97397C7.26017 5.81402 7.20313 5.62597 7.20313 5.43359C7.20313 5.17563 7.3056 4.92823 7.48801 4.74582C7.67042 4.56341 7.91782 4.46094 8.17579 4.46094ZM9.14844 13.5391C8.80449 13.5391 8.47462 13.4024 8.23141 13.1592C7.9882 12.916 7.85157 12.5861 7.85157 12.2422V9C7.67959 9 7.51466 8.93168 7.39305 8.81008C7.27145 8.68847 7.20313 8.52354 7.20313 8.35156C7.20313 8.17959 7.27145 8.01465 7.39305 7.89305C7.51466 7.77144 7.67959 7.70312 7.85157 7.70312C8.19552 7.70312 8.52538 7.83976 8.76859 8.08297C9.01181 8.32618 9.14844 8.65605 9.14844 9V12.2422C9.32042 12.2422 9.48535 12.3105 9.60696 12.4321C9.72856 12.5537 9.79688 12.7186 9.79688 12.8906C9.79688 13.0626 9.72856 13.2275 9.60696 13.3491C9.48535 13.4707 9.32042 13.5391 9.14844 13.5391Z"
                                    fill="currentColor"
                                ></path>
                            </svg>
                        </div>
                    </MotionContainer>
                    <MotionContainer className="flex flex-col items-center justify-end w-full gap-3">
                        <div className="w-full flex justify-between items-center bg-[#272a2f] rounded-lg p-2">
                            <TypographyLarge
                                text={t("daily_combo")}
                                className="text-white text-[14px] w-[30%]"
                            />
                            <div className="flex items-center justify-center gap-1">
                                {Array.from({ length: 3 }).map((_, i) => {
                                    return (
                                        <div
                                            key={i}
                                            className="w-[14px] h-[14px] bg-[#ffffff0d] rounded-full border-2 border-[#68696a]"
                                        ></div>
                                    );
                                })}
                            </div>
                            <Button className="flex items-center justify-center gap-2 p-2 rounded-md bg-button-mine">
                                <CoinIcon width={18} height={18} />
                                <TypographySmall
                                    text="+5.000.000"
                                    className="text-white text-[14px]"
                                />
                            </Button>
                        </div>
                        <div className="flex items-center justify-center w-full gap-2">
                            {Array.from({ length: 3 }).map((_, i) => {
                                return (
                                    <Popover key={i}>
                                        <PopoverTrigger asChild>
                                            <div className="daily-combo-card">
                                                <div className="daily-combo-card-inner">
                                                    <div className="bg-[#ffffff0d] rounded-md m-2 md:m-4 h-[75%]">
                                                        <Image
                                                            src="/project/img_daily-combo.png"
                                                            width={91}
                                                            height={104}
                                                            alt="@dailyCombo"
                                                            priority={true}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </PopoverTrigger>
                                        <PopoverContent
                                            className="bg-black border-none w-[130px] px-1 py-[6px] text-center rounded-xl"
                                            align="start"
                                        >
                                            <TypographySmall
                                                text={t("matching_card")}
                                                className="text-white text-[11px] text-center leading-3"
                                            />
                                        </PopoverContent>
                                    </Popover>
                                );
                            })}
                        </div>
                    </MotionContainer>
                </CardHeader>
                <MineButton
                    isScreenMine={true}
                    tabScreenMine={
                        <CardContent className="w-full p-4 mt-5">
                            <Tabs
                                value={currentTab}
                                onValueChange={handleTabChange}
                                className="w-full min-h-[100px]"
                            >
                                <MotionContainer
                                    className="sticky top-2 z-[50] w-full flex justify-center items-center"
                                    direction="left"
                                >
                                    <TabsList className="w-full bg-[#272a2f]">
                                        {categoryOfCards?.map((item, i) => {
                                            return (
                                                <TabsTrigger
                                                    key={i}
                                                    value={item.name.toLowerCase()}
                                                    className="w-full text-white text-[12px] px-1"
                                                >
                                                    {item.name}
                                                </TabsTrigger>
                                            );
                                        })}
                                    </TabsList>
                                </MotionContainer>
                                <TabsContent
                                    value={currentTab}
                                    className="relative grid items-start justify-start w-full grid-cols-2 gap-2"
                                >
                                    {categoryOfCards
                                        ?.find((item) => item.name.toLowerCase() === currentTab)
                                        ?.cardList.map((item, i) => {
                                            const currentCardProfit =
                                                item.card_profits.find((child) => child.is_purchased) ||
                                                item.card_profits.find((child) => child.id === 1);

                                            const requiredCardProfit =
                                                currentCardProfit &&
                                                typeof currentCardProfit.required_card;

                                            const isActiveCard =
                                                !currentCardProfit ||
                                                !currentCardProfit.next_level ||
                                                (requiredCardProfit !== "number" &&
                                                    currentCardProfit.required_card.is_bought === 0);

                                            if (!currentCardProfit) return <></>;

                                            return (
                                                <MineCard
                                                    key={i}
                                                    item={item}
                                                    currentCardProfit={currentCardProfit}
                                                    isActiveCard={isActiveCard}
                                                    requiredCardProfit={requiredCardProfit}
                                                    onOpen={(type: DrawerType, data?: DrawerData) => onOpen(type, data)}
                                                    user={user}
                                                />
                                            );
                                        })}
                                </TabsContent>
                            </Tabs>
                        </CardContent>
                    }
                />
            </Card>
        </div>
    );
}
