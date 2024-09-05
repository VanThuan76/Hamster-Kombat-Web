"use client";

import Image from "next/image";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "@shared/next-intl/navigation";

import { cn } from "@ui/lib/utils";
import { Button } from "@ui/components/button";
import { Separator } from "@ui/components/ui/separator";
import { Card, CardContent, CardHeader } from "@ui/components/card";
import { Avatar, AvatarImage, AvatarFallback } from "@ui/components/avatar";

import TypographyLarge from "@ui/components/typography/large";
import TypographySmall from "@ui/components/typography/small";
import DynamicNavigationSwiper from "@ui/components/swiper/DynamicNavigation";

import CoinIcon from "@shared/components/CoinIcon";

import useBackButton from "@shared/hooks/useBackButton";
import { formatCoinStyleDot } from "@shared/utils/formatNumber";
import { useAppDispatch, useAppSelector } from "@shared/redux/store/index";
import { setMembership, setUpdateRevenue } from "@shared/redux/store/appSlice";

import { useBuySkin } from "@server/_action/skin-action";
import { useUpdateSkin } from "@server/_action/user-action";

const { initHapticFeedback } = require("@telegram-apps/sdk-react");

function CheckIcon({
    is_purchased,
    is_active = true,
}: {
    is_purchased: boolean;
    is_active?: boolean;
}) {
    if (is_purchased && is_active) {
        return (
            <div className="absolute flex justify-center items-center top-0 right-0 w-[18px] h-[18px] bg-gradient-to-b from-[#74fc82] to-[#297e32] rounded-full">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-[10px] h-[10px] text-white"
                    viewBox="0 0 24 24"
                    xmlSpace="preserve"
                >
                    <path
                        d="M9 19.9c-.3 0-.6-.1-.8-.3L3 14.3c-.4-.4-.4-1.2 0-1.6s1.2-.4 1.6 0L9 17.2 20.2 6c.4-.4 1.2-.4 1.6 0 .4.4.4 1.2 0 1.6l-12 12c-.2.2-.5.3-.8.3z"
                        fill="currentColor"
                    ></path>
                </svg>
            </div>
        );
    } else if (!is_active) {
        return (
            <div className="absolute top-2 right-1 w-[16px] h-[16px]">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlSpace="preserve"
                    viewBox="0 0 20 20"
                >
                    <path
                        d="M16.2 6.2h-2.5V4.4C13.7 2.3 12 .6 9.9.6S6.2 2.3 6.2 4.4v1.9H3.8c-.7 0-1.2.6-1.2 1.2v8.8c0 .7.6 1.2 1.2 1.2h12.5c.7 0 1.2-.6 1.2-1.2V7.5c0-.7-.6-1.3-1.3-1.3zM10 12.8c-.5 0-.9-.4-.9-.9s.4-.9.9-.9.9.4.9.9-.4.9-.9.9zm2.5-6.6h-5V4.4C7.5 3 8.6 1.9 10 1.9s2.5 1.1 2.5 2.5v1.8z"
                        fill="#4e4f50"
                    ></path>
                </svg>
            </div>
        );
    }
}

export default function Page(): JSX.Element {
    const t = useTranslations("screens.skin");
    const dispatch = useAppDispatch();
    const router = useRouter();
    const haptic = initHapticFeedback();

    const { user, skins, membership, ranks } = useAppSelector(
        (state) => state.app,
    );

    const [currentTarget, setCurrentTarget] = useState(
        skins.findIndex((skin) => skin.id === user.skin_id),
    );

    const avatarImage = process.env.NEXT_PUBLIC_DOMAIN_BACKEND + "/" + membership.image;

    const buySkin = useBuySkin();
    const updateSkin = useUpdateSkin();

    const handleSkinAction = async (skin_id: number, price: number, image: string, action: 'buy' | 'choose') => {
        try {
            if (action === 'buy' && user.revenue < price) {
                console.error("Not enough money to buy skin");
                return;
            }

            const membershipData = { ...membership, image };

            if (action === 'buy') {
                await dispatch(setUpdateRevenue(user.revenue - price));
            }
            await dispatch(setMembership(membershipData));

            haptic.impactOccurred("soft");

            if (action === 'buy') {
                await buySkin.mutateAsync({ user_id: user.id, skin_id });
            } else {
                await updateSkin.mutateAsync({ user_id: user.id, skin_id });
            }

            console.log("Successfully");
            router.push("/exchange");
        } catch (error) {
            console.error(`Error in handle${action === 'buy' ? 'Buy' : 'Choose'}Skin:`, error);
        }
    };

    const skinItems = useMemo(() => skins.map((item, i) => {
        const hasBuySkin =
            item.required_level === 0 ||
            membership.current_level > item.required_level;

        const hasMoneyBuySkin = user.revenue < item.price;

        return (
            <div
                key={i}
                className="flex flex-col items-center justify-center gap-2 overflow-hidden rounded-xl"
            >
                <div className="w-[250px] h-[250px] rounded-xl overflow-hidden">
                    <Image
                        src={item.image_url}
                        width={250}
                        height={250}
                        alt={`skin_${item.name}`}
                        priority={true}
                        className="z-30 object-contain object-center mb-2"
                    />
                </div>
                <div className="w-full min-h-[200px] flex flex-col justify-center items-center gap-3 bg-[#272a2f] rounded-xl p-4">
                    <TypographySmall
                        text={item.name}
                        className="text-base font-bold text-white"
                    />
                    <TypographySmall
                        text={item.description}
                        className="text-[12px] font-normal text-white"
                    />
                    {user.userSkins.includes(item.id) ? (
                        <TypographySmall
                            text={t("purchased")}
                            className="text-[14px] font-normal text-[#82f88e]"
                        />
                    ) : (
                        <div className="flex items-center justify-center gap-2">
                            <CoinIcon
                                width={28}
                                height={28}
                                className={cn(
                                    hasMoneyBuySkin
                                        ? "coin-is-grayscale"
                                        : hasBuySkin
                                            ? ""
                                            : "coin-is-grayscale",
                                )}
                            />
                            <TypographySmall
                                text={`${formatCoinStyleDot(item.price)}`}
                                className={cn(
                                    "text-[20px] font-bold ",
                                    hasMoneyBuySkin
                                        ? "text-[#fff6]"
                                        : hasBuySkin
                                            ? "text-white"
                                            : "text-[#fff6]",
                                )}
                            />
                        </div>
                    )}
                    <Button
                        className={cn(
                            "bg-[#34383fcc] hover:bg-[#34383fcc] focus:bg-[#34383fcc] w-full min-h-[60px] rounded-2xl",
                            hasBuySkin &&
                            "bg-[#5a60ff4d] hover:bg-[#5a60ff4d] focus:bg-[#5a60ff4d]",
                        )}
                        onClick={() =>
                            user.userSkins.includes(item.id)
                                ? handleSkinAction(item.id, item.price, item.image, 'choose')
                                : hasBuySkin && handleSkinAction(item.id, item.price, item.image, 'buy')
                        }
                    >
                        {user.userSkins.includes(item.id)
                            ? "Chọn"
                            : hasMoneyBuySkin
                                ? "Không đủ tiền"
                                : hasBuySkin
                                    ? "Mua"
                                    : `Đạt đến lv ${ranks.find((child) => child.level === item.required_level)?.level} để mở khóa skin`}
                    </Button>
                </div>
            </div>
        );
    }), [skins, membership, user, ranks]);

    useBackButton();

    return (
        <div className="relative w-full h-screen overflow-y-auto text-center bg-black">
            <div className="flex items-center justify-center w-full px-5 py-2">
                <TypographyLarge text={t("profile")} className="text-base text-white" />
            </div>
            <div className="flex items-center justify-start gap-2 px-5 py-2">
                <Avatar className="bg-[#1c1f24] rounded-lg w-[40px] h-[40px]">
                    <AvatarImage
                        src={avatarImage}
                        alt="@user"
                        sizes="sm"
                        className="w-[40px] h-[40px]"
                    />
                    <AvatarFallback>User</AvatarFallback>
                </Avatar>
                <TypographySmall
                    text={`${user?.first_name} ${user?.last_name === null ? "" : user?.last_name}`}
                    className="text-base"
                />
            </div>
            <Separator className="w-full" />
            <Card
                className="w-full h-screen !mt-5 bg-black border-none"
                style={{ borderRadius: "40px 40px 0 0" }}
            >
                <CardHeader className="sticky flex flex-row items-center justify-center py-2">
                    <TypographyLarge text="Skin" className="w-full text-base text-center text-white" />
                    <TypographyLarge text="All" className="text-base text-white bg-[#1c1f24] w-full h-[50px] flex justify-center items-center px-1 rounded-xl border-4 border-gray-700" />
                </CardHeader>
                <CardContent className="w-full h-full grid grid-cols-5 p-4 pb-12 gap-2 bg-[#1c1f24] rounded-t-3xl">
                    <DynamicNavigationSwiper
                        items={skinItems}
                        className="flex items-center justify-center w-full col-span-3"
                        activeSlideChange={currentTarget}
                        onSlideChange={setCurrentTarget}
                        isNavigation={false}
                    />
                    <div
                        className="grid items-center justify-center w-full h-full grid-cols-2 col-span-2 gap-4 p-0 overflow-y-auto"
                    >
                        {skins.map((item, i) => {
                            return (
                                <div
                                    key={i}
                                    className={cn(
                                        "relative min-h-[100px] bg-[#272a2f] flex flex-col justify-start items-center rounded-xl pb-2 px-0 gap-1 overflow-hidden",
                                        i === currentTarget && "border border-[#5a60ff]",
                                    )}
                                    onClick={() => setCurrentTarget(i)}
                                >
                                    <div className="w-full h-[62px]">
                                        <Image
                                            src={item.image_url}
                                            width={62}
                                            height={62}
                                            alt={item.name}
                                            priority={true}
                                            className="object-cover object-center w-full h-full"
                                        />
                                    </div>
                                    <TypographySmall
                                        text={item.name}
                                        className="text-[9px] font-extralight text-white fix-words-mine"
                                    />
                                    {user.userSkins.includes(item.id) ? (
                                        <CheckIcon is_purchased={true} />
                                    ) : (
                                        <CheckIcon
                                            is_purchased={false}
                                            is_active={
                                                item.required_level === 0 ||
                                                membership.current_level > item.required_level
                                            }
                                        />
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
