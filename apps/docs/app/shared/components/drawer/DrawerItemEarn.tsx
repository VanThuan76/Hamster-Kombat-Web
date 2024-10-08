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

import { toast } from "@shared/hooks/useToast";
import { useDraw } from "@shared/hooks/useDraw";
import { useAppDispatch, useAppSelector } from "@shared/redux/store";
import { useRouter } from "@shared/next-intl/navigation";
import { formatCoinStyleDot } from "@shared/utils/formatNumber";
import useLocalStorage from "@shared/hooks/useLocalStorage";

import { useUpdateEarn } from "@server/_action/earn-action";
import { EarnDetail } from "@server/_types/earn";
import { setIsCoinAnimating, setUpdateRevenue } from "@shared/redux/store/appSlice";

const { initUtils } = require("@telegram-apps/sdk-react");

export default function DrawerItemEarn(): JSX.Element {
    const [timeYt, setTimeYt] = useLocalStorage<any>("current_time_yt", "");
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false);

    const { earns, user } = useAppSelector((state) => state.app);
    const { isOpen, data, onClose, type } = useDraw();


    const dispatch = useAppDispatch();
    const t = useTranslations("screens.earn");

    const router = useRouter();
    const utils = initUtils();
    const updateEarn = useUpdateEarn();

    function containsHttps(link: string | null) {
        if (!link) return false;
        return link.includes("https://");
    }

    function containsTelegram(url: string): boolean {
        return url?.toLowerCase().includes("telegram");
    }

    function containsYoutube(url: string): boolean {
        return url?.toLowerCase().includes("youtube");
    }

    async function handleSuccess(earn: EarnDetail) {
        try {
            if (earn.is_completed !== 0) return;

            const currentTime = new Date().getTime();
            setIsLoading(true);

            if (earn.link?.toLowerCase().includes("youtube")) {
                if (timeYt) {
                    if (currentTime - timeYt > 30 * 60 * 1000) {
                        await dispatch(setUpdateRevenue(user.revenue + earn.reward));
                        await updateEarn.mutateAsync({
                            user_id: user.id,
                            user_earn_id: earn.user_earn_id,
                            is_completed: 1,
                        });

                        setTimeYt(currentTime);
                    } else {
                        toast({
                            variant: "error",
                            title: t("wait")
                        });
                    }
                } else {
                    setTimeYt(currentTime);
                }
            } else if (!containsHttps(earn.link)) {
                if (user.exchange.id !== 51) {
                    dispatch(setUpdateRevenue(user.revenue + earn.reward));

                    await updateEarn.mutateAsync({
                        user_id: user.id,
                        user_earn_id: earn.user_earn_id,
                        is_completed: 1,
                    });

                    onClose();
                    await dispatch(setIsCoinAnimating(true))
                    setTimeout(() => {
                        dispatch(setIsCoinAnimating(false))
                    }, 1000)

                } else {
                    toast({
                        variant: "error",
                        title: t("choose_exchange_no")
                    });
                }
            } else {
                dispatch(setUpdateRevenue(user.revenue + earn.reward));

                await updateEarn.mutateAsync({
                    user_id: user.id,
                    user_earn_id: earn.user_earn_id,
                    is_completed: 1,
                });

                onClose();
                await dispatch(setIsCoinAnimating(true))
                setTimeout(() => {
                    dispatch(setIsCoinAnimating(false))
                }, 1000)

                console.log("Successfully");
            }

        } catch (error) {
            console.error("Error in handleSuccess:", error);
        } finally {
            setIsLoading(false);
        }
    }

    function handleChoosen(earn: EarnDetail) {
        if (earn.link !== null) {
            containsHttps(earn.link)
                ? utils.openLink(earn.link, { tryBrowser: true })
                : containsTelegram(earn.link)
                    ? utils.openTelegramLink(earn.link)
                    : earn.link !== null && router.push(earn.link);
        }
        onClose();
    }

    useEffect(() => {
        if (isOpen && type === "itemEarn") {
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
            <div className="flex flex-col items-center justify-center w-full gap-6">
                <div className="relative z-10 w-[115px] h-[115px]">
                    <Image
                        src={process.env.NEXT_PUBLIC_DOMAIN_BACKEND + "/" + data?.image}
                        width={115}
                        height={115}
                        alt={data?.name}
                        priority={true}
                    />
                </div>
                <div className="flex flex-col items-center justify-center w-full gap-5">
                    <div className="flex flex-col items-center justify-center gap-3 text-center text-white">
                        <TypographyLarge
                            text={data.language === "vi" ? data?.name : data?.en_name}
                            className="text-[32px] font-bold leading-8"
                        />
                        <TypographySmall text={data.language === "vi" ? data?.description : data?.en_description} className="text-[14px]" />
                    </div>
                    {data.user_earn_id !== 353 ? ( //Fixed
                        <Button
                            className="h-[50px] bg-[#5a60ff] hover:bg-[#5a60ff]/90 text-white flex justify-center items-center gap-2 rounded-2xl px-12"
                            onClick={() => handleChoosen(data)}
                        >
                            <TypographyLarge
                                text={containsYoutube(data.link) ? t("watch_video") : t("btn_join")}
                                className="text-[18px] font-bold text-white"
                            />
                        </Button>
                    ) : (
                        <></>
                    )}
                    <div className="flex items-center justify-center gap-1">
                        <CoinIcon width={28} height={28} />
                        <TypographySmall
                            text={`+${formatCoinStyleDot(data?.reward)}`}
                            className="ml-1 text-2xl text-white"
                        />
                    </div>
                </div>
                {data.is_completed === 0 && (
                    <Button
                        className={cn("w-full h-[80px] text-white flex justify-center items-center gap-2 rounded-2xl", isLoading ? "bg-[#4e4f50cc] hover:bg-[#4e4f50cc]" : "bg-[#5a60ff] hover:bg-[#5a60ff]/90")}
                        onClick={() => handleSuccess(data)}
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
                                    text={
                                        earns.find((item) => item.type === 3)?.earn[0]?.is_completed ===
                                            0
                                            ? t("btn_require")
                                            : t("btn_check")
                                    }
                                    className="text-xl font-bold text-white"
                                />
                                <CoinIcon width={28} height={28} />
                            </>
                        )}
                    </Button>
                )}
            </div>
        </Drawer>
    );
}
