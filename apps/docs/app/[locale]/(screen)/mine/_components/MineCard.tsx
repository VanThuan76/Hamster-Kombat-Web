"use client";

import Image from "next/image";
import { cn } from "@ui/lib/utils";
import { useTranslations } from "next-intl";
import { Separator } from "@ui/components/separator";

import { formatCoin } from "@shared/utils/formatNumber";

import { DrawerData, DrawerType } from "@shared/hooks/useDraw";
import { CardList, CardProfit } from "@server/_types/card";

import TypographySmall from "@ui/components/typography/small";
import TypographyLarge from "@ui/components/typography/large";

import CoinIcon from "@shared/components/CoinIcon";

interface MineCardProps {
    item: CardList
    currentCardProfit: CardProfit;
    isActiveCard: boolean;
    onOpen: (type: DrawerType, data?: DrawerData) => void;
    requiredCardProfit: any
    user: any;
}

const MineCard = ({ item, currentCardProfit, isActiveCard, requiredCardProfit, onOpen, user }: MineCardProps) => {
    const t = useTranslations("screens.mine");

    return (
        <div
            className="bg-[#272a2f] h-[120px] text-white rounded-2xl select-none p-1 sm:p-2"
            onClick={() => {
                if (
                    requiredCardProfit === "number" ||
                    currentCardProfit.required_card.is_bought === 1
                ) {
                    onOpen("cardMine", {
                        ...item,
                        hasBuy: currentCardProfit && currentCardProfit.next_level && currentCardProfit.next_level.required_money < user.revenue
                    });
                }
            }}
        >
            <div className="flex items-start justify-start w-full gap-2 sm:gap-3">
                <div className="relative w-[60px] h-[60px] flex flex-grow-0 flex-shrink-0 justify-center items-center">
                    <Image
                        src={`${process.env.NEXT_PUBLIC_DOMAIN_BACKEND}/${item.image}`}
                        width={isActiveCard ? 40 : 60}
                        height={isActiveCard ? 40 : 60}
                        alt="@imageTask"
                        priority={true}
                        className={cn(
                            "object-cover",
                            isActiveCard && "w-[40px] h-[40px]",
                        )}
                    />
                    {isActiveCard && (
                        <div className="absolute w-full h-full top-0 bottom-0 left-0 bg-[#34383fcc] rounded-full flex justify-center items-center">
                            <Image
                                src="/project/icon_key.svg"
                                width={24}
                                height={24}
                                alt="@imageKey"
                                priority={true}
                                className="w-[24px] h-[24px]"
                            />
                        </div>
                    )}
                </div>
                <div className="flex flex-col items-start justify-between">
                    <TypographyLarge
                        text={item.name}
                        className="text-xs leading-3 text-white fix-words-mine font-extralight"
                    />
                    <div className="flex flex-col items-start justify-start">
                        <TypographySmall
                            text={t("profit")}
                            className="text-[#8b8e93] text-[10px] font-extralight"
                        />
                        <div className="flex items-center justify-center gap-1">
                            <div className="w-[16px] h-[16px]">
                                <CoinIcon
                                    width={18}
                                    height={18}
                                    className={cn(
                                        "w-full h-full",
                                        (isActiveCard && "coin-is-grayscale") ||
                                        (currentCardProfit && currentCardProfit.next_level && currentCardProfit.next_level.required_money > user.revenue && "coin-is-grayscale"),
                                    )}
                                />
                            </div>
                            <TypographySmall
                                text={`+${currentCardProfit.next_level ? String(formatCoin(currentCardProfit.next_level.profit as number)) : 0}`}
                                className="text-white text-[12px]"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <Separator className="my-2 bg-[#34383f]" />
            <div className="flex items-center h-5 space-x-2 text-sm">
                <TypographySmall
                    text={`lv ${currentCardProfit ? currentCardProfit.level : 0}`}
                    className="flex-grow-0 flex-shrink-0 text-white text-[12px] truncate"
                />
                <Separator
                    orientation="vertical"
                    className="bg-[#34383f]"
                />
                <CoinIcon
                    width={18}
                    height={18}
                    className={cn(
                        (isActiveCard && "coin-is-grayscale") ||
                        (currentCardProfit && currentCardProfit.next_level && currentCardProfit.next_level.required_money > user.revenue && "coin-is-grayscale"),
                    )}
                />
                <div className="flex flex-wrap items-center justify-center gap-1 leading-3">
                    <TypographySmall
                        text={
                            requiredCardProfit !== "number" &&
                                currentCardProfit.required_card.is_bought ===
                                0
                                ? currentCardProfit.required_card?.card_name
                                : currentCardProfit.next_level
                                    ? String(
                                        formatCoin(
                                            currentCardProfit.next_level
                                                .required_money as number,
                                        ),
                                    )
                                    : "0"
                        }
                        className="text-white text-[12px] fix-words-mine"
                    />
                    {requiredCardProfit !== "number" &&
                        currentCardProfit.required_card.is_bought ===
                        0 && (
                            <span className="text-white text-[12px] font-extralight !ml-0 block">
                                lv {currentCardProfit.required_card?.level}
                            </span>
                        )}
                </div>
            </div>
        </div>
    );
};

export default MineCard
