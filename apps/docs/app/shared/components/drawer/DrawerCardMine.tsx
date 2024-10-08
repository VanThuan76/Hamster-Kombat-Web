"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { useTranslations } from "next-intl";
import { cn } from "@ui/lib/utils";

import { Button } from "@ui/components/button";
import Drawer from "@ui/components/drawer";
import TypographyLarge from "@ui/components/typography/large";
import TypographySmall from "@ui/components/typography/small";

import CoinIcon from "@shared/components/CoinIcon";

import { useDraw } from "@shared/hooks/useDraw";
import { useAppDispatch, useAppSelector } from "@shared/redux/store";
import { formatCoinStyleDot } from "@shared/utils/formatNumber";

import { useBuyCard } from "@server/_action/card-action";
import {
    setIsCoinAnimating,
    setUpdateProfitPerHour,
    setUpdateRevenue,
} from "@shared/redux/store/appSlice";

const { initHapticFeedback } = require("@telegram-apps/sdk-react");

export default function DrawerCardMine(): JSX.Element {
    const { user } = useAppSelector((state) => state.app);
    const { isOpen, onClose, data, type } = useDraw();

    const [isDrawerOpen, setIsDrawerOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false);

    const haptic = initHapticFeedback();
    const dispatch = useAppDispatch();
    const t = useTranslations("components.drawer_info_profit");

    const currentCardProfit =
        data?.card_profits?.find((child: any) => child.is_purchased) ||
        data?.card_profits?.find((child: any) => child.level === 0);

    const nextCardProfit =
        currentCardProfit &&
        data?.card_profits?.find(
            (child: any) => child.level === currentCardProfit.level + 1,
        );

    const buyCard = useBuyCard();

    async function handleSuccess() {
        try {
            setIsLoading(true);
            dispatch(setUpdateRevenue(user.revenue - nextCardProfit.required_money));
            dispatch(setUpdateProfitPerHour(user.profit_per_hour + nextCardProfit.profit));

            haptic.impactOccurred("heavy");

            await buyCard.mutateAsync({
                card_id: nextCardProfit.card_id,
                card_profit_id: nextCardProfit.id,
                level: nextCardProfit.level,
                exchange_id: user.exchange.id,
                user_id: user.id,
            });

            onClose();
            await dispatch(setIsCoinAnimating(true));
            setTimeout(() => {
                dispatch(setIsCoinAnimating(false))
            }, 1000)

            console.log("Card purchased successfully");
        } catch (error) {
            console.error("Error in handleSuccess:", error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        if (isOpen && type === "cardMine") {
            setIsDrawerOpen(true);
        } else {
            setIsDrawerOpen(false)
        }
    }, [isOpen, type]);

    if (!data) return <></>;

    return (
        <Drawer
            isOpen={isDrawerOpen}
            onClose={onClose}
            className="w-full card-has-glow min-h-[60%] border-none"
        >
            <div className="flex flex-col items-center justify-center w-full gap-2 mt-2">
                <div className="w-[115px] h-[115px]">
                    <Image
                        src={
                            `${process.env.NEXT_PUBLIC_DOMAIN_BACKEND}/${data?.image}` || ""
                        }
                        width={115}
                        height={115}
                        alt="@imageTask"
                        priority={true}
                    />
                </div>
                <TypographySmall
                    text={data.language === "vi" ? data?.name : data?.en_name}
                    className="text-white text-[28px] font-semibold"
                />
                <TypographySmall
                    text={data.language === "vi" ? data?.description : data?.en_description}
                    className="text-white text-[14px] text-center"
                />
                <div className="flex flex-col items-center justify-center gap-1">
                    <TypographySmall
                        text={t("profit_by_hour")}
                        className="text-white text-[10px] font-extralight"
                    />
                    <div className="flex items-center justify-center gap-1">
                        <div className="w-[16px] h-[16px]">
                            <CoinIcon
                                width={18}
                                height={18}
                                className={cn(
                                    "w-full h-full",
                                    !data.hasBuy && "coin-is-grayscale",
                                )}
                            />
                        </div>
                        <TypographySmall
                            text={`+${String(formatCoinStyleDot(nextCardProfit?.next_level.profit as number))}`}
                            className="text-white text-[12px]"
                        />
                    </div>
                </div>
                <div className="flex items-center justify-center gap-1">
                    <div className="w-[32px] h-[32px]">
                        <CoinIcon
                            width={32}
                            height={32}
                            className={cn(
                                "w-full h-full",
                                !data.hasBuy && "coin-is-grayscale",
                            )}
                        />
                    </div>
                    <TypographySmall
                        text={String(
                            formatCoinStyleDot(
                                nextCardProfit?.next_level.required_money as number,
                            ),
                        )}
                        className="text-white text-[12px] !m-1"
                    />
                </div>
                {data.hasBuy ? (
                    <Button
                        className={cn("w-full h-[80px] text-white flex justify-center items-center gap-2 rounded-2xl", isLoading ? "bg-[#4e4f50cc] hover:bg-[#4e4f50cc]" : "bg-[#5a60ff] hover:bg-[#5a60ff]/90")}
                        onClick={() => handleSuccess()}
                    >
                        {isLoading ? (
                            <div className='flex items-center justify-center w-full gap-2'>
                                <div className='h-4 w-4 bg-white rounded-full animate-fade-bounce [animation-delay:-0.3s]'></div>
                                <div className='h-4 w-4 bg-white rounded-full animate-fade-bounce [animation-delay:-0.15s]'></div>
                                <div className='w-4 h-4 bg-white rounded-full animate-fade-bounce'></div>
                            </div>
                        ) : (
                            <>
                                <TypographyLarge
                                    text={t("good_luck")}
                                    className="text-xl font-bold text-white"
                                />
                                <CoinIcon width={28} height={28} />
                            </>
                        )}
                    </Button>
                ) : (
                    <Button className="w-full h-[80px] bg-[#4e4f50cc] hover:bg-[#4e4f50cc] text-white flex justify-center items-center gap-2 rounded-2xl pointer-events-none">
                        <TypographyLarge
                            text={t("not_enough_money")}
                            className="text-xl font-bold text-white"
                        />
                    </Button>
                )}
            </div>
        </Drawer>
    );
}
