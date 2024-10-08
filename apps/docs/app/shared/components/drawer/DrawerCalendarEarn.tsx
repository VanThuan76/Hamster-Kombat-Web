"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { useTranslations } from "next-intl";
import { Button } from "@ui/components/button";
import { cn } from "@ui/lib/utils";

import Drawer from "@ui/components/drawer";
import TypographyLarge from "@ui/components/typography/large";
import TypographySmall from "@ui/components/typography/small";

import CoinIcon from "@shared/components/CoinIcon";

import useLocalStorage from "@shared/hooks/useLocalStorage";
import { useDraw } from "@shared/hooks/useDraw";
import { useAppDispatch, useAppSelector } from "@shared/redux/store";
import { formatCoin } from "@shared/utils/formatNumber";

import { useUpdateEarn } from "@server/_action/earn-action";
import { setIsCoinAnimating } from "@shared/redux/store/appSlice";

export default function DrawerCalendarEarn(): JSX.Element {
    const { earns, user } = useAppSelector((state) => state.app);
    const { isOpen, onClose, type } = useDraw();

    const [lastDateChecked, setLastDateChecked] = useLocalStorage<
        string | undefined
    >("lion_last_date_checked", "");
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)

    const now = new Date();
    const today = now.toISOString().split("T")[0];
    const earnCalendar = earns.find((item) => item.type === 3);
    const dayLastCompleted = earnCalendar?.earn.slice().reverse().find((item) => item.is_completed === 1);
    const currentDay = dayLastCompleted
        ? earnCalendar?.earn.find(item => item.order === dayLastCompleted.order + 1)
        : earnCalendar?.earn.find(item => item.order === 1);

    const t = useTranslations("screens.earn");
    const dispatch = useAppDispatch();

    const updateEarn = useUpdateEarn();

    async function handleSuccess() {
        await updateEarn.mutateAsync({
            user_id: user.id,
            user_earn_id: currentDay!.user_earn_id,
            is_completed: 1,
        });

        const newNextDate = new Date(now);
        newNextDate.setDate(newNextDate.getDate());
        setLastDateChecked(newNextDate.toISOString().split("T")[0]);

        onClose();

        await dispatch(setIsCoinAnimating(true))

        setTimeout(() => {
            dispatch(setIsCoinAnimating(false))
        }, 1000)
    }

    useEffect(() => {
        if (isOpen && type === "calendarEarn") {
            setIsDrawerOpen(true);
        } else {
            setIsDrawerOpen(false)
        }
    }, [isOpen, type]);

    return (
        <Drawer
            isOpen={isDrawerOpen}
            onClose={onClose}
            className="w-full card-has-glow h-[90%] overflow-y-auto border-none"
        >
            <div className="flex flex-col items-center justify-center w-full">
                <div className="relative visible">
                    <div className="absolute left-1/2 top-1/2 w-[100px] h-[100px] bg-[#9b37ffe6] rounded-full blur-[20px] transform -translate-x-1/2 -translate-y-1/2 z-0"></div>
                    <div className="relative z-10 w-[115px] h-[115px]">
                        <Image
                            src="/project/calendar.png"
                            width={115}
                            height={115}
                            alt="@calendar"
                            priority={true}
                            className="transition-all"
                        />
                    </div>
                </div>
                <div className="flex flex-col items-center justify-center w-full gap-5 mb-5">
                    <TypographyLarge
                        text={t("daily_reward")}
                        className="text-white text-[32px] font-bold"
                    />
                    <TypographySmall
                        text={t("des_daily_reward")}
                        className="text-white text-[14px] max-w-[280px] font-normal"
                    />
                </div>
                <div className="w-full min-h-[300px] grid grid-cols-4 justify-center items-center gap-2">
                    {earns
                        .find((item) => item.type === 3)
                        ?.earn.map((earn, i) => {
                            return (
                                <div
                                    key={i}
                                    className={cn(
                                        "flex flex-col justify-center items-center rounded-2xl p-2",
                                        earn.is_completed === 1
                                            ? "bg-[linear-gradient(180deg,#62cc6c,#2a7031)]"
                                            : i === 0 && !lastDateChecked
                                                ? "bg-[#272a2f] border-2 border-[#62cc6c]"
                                                : dayLastCompleted &&
                                                    lastDateChecked !== today &&
                                                    earn.order === dayLastCompleted.order + 1
                                                    ? "bg-[#272a2f] border-2 border-[#62cc6c]"
                                                    : "bg-[#272a2f] opacity-40",
                                    )}
                                >
                                    <TypographySmall
                                        text={`${t("day_daily")} ${i + 1}`}
                                        className="text-white text-[14px] font-normal"
                                    />
                                    <CoinIcon width={24} height={24} />
                                    <TypographySmall
                                        text={`${formatCoin(earn.reward)}`}
                                        className="text-white text-[14px] font-medium"
                                    />
                                </div>
                            );
                        })}
                </div>
                <Button
                    className="w-full h-[80px] bg-[#5a60ff] hover:bg-[#5a60ff]/90 text-white flex justify-center items-center gap-2 rounded-2xl"
                    onClick={() =>
                        lastDateChecked !== today ? handleSuccess() : onClose()
                    }
                >
                    <TypographyLarge
                        text={lastDateChecked !== today ? t("btn_require") : t("btn_back")}
                        className="text-xl font-bold text-white"
                    />
                    <CoinIcon width={28} height={28} />
                </Button>
            </div>
        </Drawer>
    );
}
