"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { cn } from "@ui/lib/utils";

import MotionContainer from "@ui/components/motion/Container";
import TypographyLarge from "@ui/components/typography/large";
import TypographySmall from "@ui/components/typography/small";

import CoinIcon from "@shared/components/CoinIcon";

import useCountdown from "@shared/hooks/useCountdown";
import useBackButton from "@shared/hooks/useBackButton";
import { useDraw } from "@shared/hooks/useDraw";
import { useAppDispatch, useAppSelector } from "@shared/redux/store";
import { formatCoin, formatCoinStyleDot } from "@shared/utils/formatNumber";
import { setUpdateEnergyBoost } from "@shared/redux/store/appSlice";

export default function Page(): JSX.Element {
    const dispatch = useAppDispatch();
    const t = useTranslations("screens.boost");

    const { user, stateBoostEnergy } = useAppSelector((state) => state.app);
    const { onOpen } = useDraw();

    const countdown = useCountdown({
        minutes: stateBoostEnergy.delay,
        format: "mm:ss",
        autoStart: true,
        onCompleted: () =>
            dispatch(
                setUpdateEnergyBoost({
                    step: stateBoostEnergy.step,
                    delay: stateBoostEnergy.delay - 1,
                }),
            ),
    });

    const findCurrentBoost = (
        items: any[],
        type: number,
        subType: number,
    ): any[] | undefined => {
        return (
            items
                .find((item) => item.type === type)
                ?.sub_types.find((subTypeItem: any) => subTypeItem.sub_type === subType)
                ?.boots.find((boost: any) => boost.is_completed === 1) ||
            items
                .find((item) => item.type === type)
                ?.sub_types.find((subTypeItem: any) => subTypeItem.sub_type === subType)
                ?.boots[0]
        );
    };

    const findNextBoost = (
        newBoostArr: any[],
        currentBoost: any | undefined,
    ): any | undefined => {
        return (
            currentBoost &&
            newBoostArr.find(
                (item) =>
                    item.name === currentBoost.name &&
                    item.level === currentBoost.level + 1,
            )
        );
    };

    const newBoostArr = user.boots.flatMap((item) =>
        item.sub_types.flatMap((subType) => subType.boots),
    );

    const currentEnergy = findCurrentBoost(user.boots, 0, 0);
    const nextEnergy = findNextBoost(newBoostArr, currentEnergy);

    const currentMultitap = findCurrentBoost(user.boots, 1, 2);
    const nextMultitap = findNextBoost(newBoostArr, currentMultitap);

    const currentEnergyLimit = findCurrentBoost(user.boots, 1, 3);
    const nextEnergyLimit = findNextBoost(newBoostArr, currentEnergyLimit);

    useBackButton();
    return (
        <div className="relative w-full h-screen p-5 space-y-4 overflow-hidden overflow-y-auto text-center bg-black">
            <MotionContainer className="w-full my-2" direction="left">
                <TypographySmall
                    text={t("your_balance")}
                    className="text-[#8b8e93] text-[14px] font-light"
                />
            </MotionContainer>
            <MotionContainer
                className="flex items-center justify-center w-full gap-2"
                type="scale"
            >
                <CoinIcon width={40} height={40} />
                <TypographyLarge
                    text={String(formatCoinStyleDot(user.revenue))}
                    className="text-3xl text-white"
                />
            </MotionContainer>
            <MotionContainer className="w-full my-2" direction="right">
                <TypographySmall
                    text={t("how_boost_work")}
                    className="text-[#ffd337] text-[14px] font-light"
                />
            </MotionContainer>
            <div className="flex flex-col items-start justify-start gap-2">
                <TypographySmall
                    text={t("free_daily_boost")}
                    className="mt-5 text-base text-white"
                />
                <div
                    className={cn(
                        "w-full flex justify-between items-center rounded-2xl min-h-[64px] px-3 bg-[#272a2f] cursor-pointer",
                        countdown.minutes && "cursor-not-allowed",
                    )}
                    onClick={() =>
                        !countdown.minutes &&
                        stateBoostEnergy.step > 0 &&
                        onOpen("energyBoost", { current: currentEnergy, next: nextEnergy })
                    }
                >
                    <div className="flex items-center justify-start w-full gap-4">
                        <MotionContainer type="scale">
                            <Image
                                src="/project/icon_flash.png"
                                alt="@flash"
                                width={70}
                                height={70}
                                priority={true}
                                quality={75}
                            />
                        </MotionContainer>
                        <div className="flex flex-col items-start justify-start w-full">
                            <TypographySmall
                                text={t("full_energy")}
                                className="text-[14px] text-white font-light"
                            />
                            <div className="flex items-center justify-between w-full">
                                <TypographySmall
                                    text={`${stateBoostEnergy.step === 0 ? t("limit") : `${stateBoostEnergy.step}/6 ${t("available")}`}`}
                                    className={cn(
                                        "text-[14px] text-[#8b8e93] font-light",
                                        countdown.minutes && "opacity-30",
                                    )}
                                />
                                {countdown.minutes && countdown.minutes > 0 ? (
                                    <TypographySmall
                                        text={`${countdown.minutes} ${t("remain")}`}
                                        className="text-[12px] text-[#8b8e93] font-light"
                                    />
                                ) : (
                                    <></>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full flex justify-between items-center rounded-2xl min-h-[64px] px-3 bg-[#272a2f] opacity-50">
                    <div className="flex items-center justify-start gap-4">
                        <MotionContainer type="scale">
                            <Image
                                src="/project/icon_rocket.png"
                                alt="@icon_rocket"
                                width={52}
                                height={52}
                                priority={true}
                                quality={75}
                            />
                        </MotionContainer>
                        <div className="flex flex-col items-start justify-start">
                            <TypographySmall
                                text={t("turbo")}
                                className="text-[14px] text-white font-light"
                            />
                            <TypographySmall
                                text={t("coming_soon")}
                                className="text-[14px] text-[#8b8e93] font-light"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col items-start justify-start gap-2">
                <TypographySmall
                    text={t("boosters")}
                    className="mt-5 text-base text-white"
                />
                <div
                    className="w-full flex justify-between items-center rounded-2xl min-h-[64px] px-3 bg-[#272a2f] cursor-pointer"
                    onClick={() =>
                        nextMultitap &&
                        onOpen("multitapBoost", {
                            current: currentMultitap,
                            next: nextMultitap,
                        })
                    }
                >
                    <div className="flex items-center justify-start gap-4">
                        <MotionContainer type="scale">
                            <Image
                                src="/project/icon_boost-multitap.png"
                                alt="@multitap"
                                width={52}
                                height={52}
                                priority={true}
                                quality={75}
                            />
                        </MotionContainer>
                        <div className="flex flex-col items-start justify-start">
                            <TypographySmall
                                text={t("multitap")}
                                className="text-[14px] text-white font-light"
                            />
                            {nextMultitap ? (
                                <div className="flex items-center justify-center gap-1">
                                    <CoinIcon
                                        width={20}
                                        height={20}
                                        className={cn(
                                            nextMultitap &&
                                            nextMultitap?.required_money > user.revenue &&
                                            "coin-is-grayscale",
                                        )}
                                    />
                                    <TypographySmall
                                        text={String(formatCoin(nextMultitap?.required_money ?? 0))}
                                        className="text-[14px] text-white ml-1"
                                    />
                                    <span className="text-[#8b8e93]">•</span>
                                    <TypographySmall
                                        text={String(nextMultitap?.level) + " lv"}
                                        className="text-[14px] text-[#8b8e93] font-light"
                                    />
                                </div>
                            ) : (
                                <TypographySmall
                                    text={t("limit")}
                                    className="text-[14px] text-[#8b8e93] font-light"
                                />
                            )}
                        </div>
                    </div>
                    <div className="earn-item-icon">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            xmlSpace="preserve"
                        >
                            <path
                                d="M9 20.6c-.3 0-.6-.1-.8-.3-.4-.4-.4-1.2 0-1.6l6.7-6.7-6.7-6.7c-.4-.4-.4-1.2 0-1.6s1.2-.4 1.6 0l7.5 7.5c.4.4.4 1.2 0 1.6l-7.5 7.5c-.2.2-.5.3-.8.3z"
                                fill="currentColor"
                            ></path>
                        </svg>
                    </div>
                </div>
                <div
                    className="w-full flex justify-between items-center rounded-2xl min-h-[64px] px-3 bg-[#272a2f] cursor-pointer"
                    onClick={() =>
                        nextEnergyLimit &&
                        onOpen("energyLimitBoost", {
                            current: currentEnergyLimit,
                            next: nextEnergyLimit,
                        })
                    }
                >
                    <div className="flex items-center justify-start gap-4">
                        <MotionContainer type="scale">
                            <Image
                                src="/project/icon_boost-energy.png"
                                alt="@icon_boost"
                                width={52}
                                height={52}
                                priority={true}
                                quality={75}
                            />
                        </MotionContainer>
                        <div className="flex flex-col items-start justify-start">
                            <TypographySmall
                                text={t("energy_limit")}
                                className="text-[14px] text-white font-light"
                            />
                            {nextEnergyLimit ? (
                                <div className="flex items-center justify-center gap-1">
                                    <CoinIcon
                                        width={20}
                                        height={20}
                                        className={cn(
                                            nextEnergyLimit &&
                                            nextEnergyLimit.required_money > user.revenue &&
                                            "coin-is-grayscale",
                                        )}
                                    />
                                    <TypographySmall
                                        text={String(
                                            formatCoin(nextEnergyLimit?.required_money || 0),
                                        )}
                                        className="text-[14px] text-white ml-1"
                                    />
                                    <span className="text-[#8b8e93]">•</span>
                                    <TypographySmall
                                        text={String(nextEnergyLimit?.level) + " lv"}
                                        className="text-[14px] text-[#8b8e93] font-light"
                                    />
                                </div>
                            ) : (
                                <TypographySmall
                                    text={t("limit")}
                                    className="text-[14px] text-[#8b8e93] font-light"
                                />
                            )}
                        </div>
                    </div>
                    <div className="earn-item-icon">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            xmlSpace="preserve"
                        >
                            <path
                                d="M9 20.6c-.3 0-.6-.1-.8-.3-.4-.4-.4-1.2 0-1.6l6.7-6.7-6.7-6.7c-.4-.4-.4-1.2 0-1.6s1.2-.4 1.6 0l7.5 7.5c.4.4.4 1.2 0 1.6l-7.5 7.5c-.2.2-.5.3-.8.3z"
                                fill="currentColor"
                            ></path>
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    );
}
