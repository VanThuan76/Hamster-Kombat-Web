"use client";

import Image from "next/image";

import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useTranslations } from "next-intl";
import { cn } from "@ui/lib/utils";

import { Avatar, AvatarImage, AvatarFallback } from "@ui/components/avatar";
import { Progress } from "@ui/components/progress";
import TypographySmall from "@ui/components/typography/small";
import TypographyLarge from "@ui/components/typography/large";
import DynamicNavigationSwiper from "@ui/components/swiper/DynamicNavigation";

import CoinIcon from "@shared/components/CoinIcon";

import useBackButton from "@shared/hooks/useBackButton";
import { useAppSelector } from "@shared/redux/store";
import { formatCoin, formatCoinStyleDot } from "@shared/utils/formatNumber";

const ItemCardRank = ({
  item,
  order,
  backgroundAva,
  className,
}: {
  item: any;
  order: number;
  backgroundAva: string;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "w-full h-[64px] flex justify-between items-center bg-[#272a2f] px-3 rounded-2xl",
        className,
      )}
    >
      <Avatar
        className={cn("rank-ava rounded-lg w-[50px] h-[50px]", backgroundAva)}
      >
        <AvatarImage
          src="/project/icon_ava_user.png"
          alt="@user"
          sizes="sm"
          className="w-[50px] h-[50px]"
        />
        <AvatarFallback>User</AvatarFallback>
      </Avatar>
      <div className="flex flex-col items-start justify-start w-full gap-2 ml-3">
        <div className="flex items-center justify-center gap-1">
          <Image
            src={`${process.env.NEXT_PUBLIC_DOMAIN_BACKEND}/${item.image}`}
            width={18}
            height={18}
            alt="@coin"
            priority={true}
          />
          <TypographySmall
            text={`${item?.first_name} ${item?.last_name}`}
            className="text-[14px]"
          />
        </div>
        <div className="flex items-center justify-center gap-1">
          <CoinIcon width={20} height={20} />
          <TypographySmall
            text={String(formatCoinStyleDot(item.highest_score))}
            className="text-[14px] text-[#8b8e93]"
          />
        </div>
      </div>
      <TypographyLarge
        text={String(order)}
        className="text-2xl text-[#8b8e93] pl-3"
      />
    </div>
  );
};

export default function Page(): JSX.Element {
  const t = useTranslations("screens.rank");

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const { user, membership, ranks } = useAppSelector((state) => state.app);

  const [visibleRank, setVisibleRanks] = useState(5);
  const [currentTarget, setCurrentTarget] = useState(0);
  const [swiperClass, setSwiperClass] = useState(
    `is-${ranks[0]?.name.toLowerCase()}`,
  );
  useBackButton();

  useEffect(() => {
    setSwiperClass(`is-${ranks[currentTarget]?.name.toLowerCase()}`);
  }, [currentTarget]);

  useEffect(() => {
    if (inView && ranks) {
      setVisibleRanks((prev) =>
        Math.min(prev + 10, ranks[currentTarget]?.rank.length as number),
      );
    }
  }, [inView, ranks]);

  const currentBrandMembership = +ranks.find(
    (item) => item.name.toLowerCase() === membership.name.toLowerCase(),
  )!.short_money;

  return (
    <div className="relative w-screen h-screen space-y-2 overflow-hidden overflow-y-auto text-center">
      <DynamicNavigationSwiper
        className={cn("rank-slider mt-10", swiperClass)}
        items={ranks.map((item, i) => {
          const currentLevelUserMembership =
            ranks.find(
              (item) =>
                item.name.toLowerCase() === membership.name.toLowerCase(),
            )?.level || 0;
          const nextRequireLevelMoney =
            ranks.find((item) => item.level === currentLevelUserMembership + 1)
              ?.money || item.money;

          return (
            <div key={i} className="flex flex-col items-center justify-center">
              <div className="overflow-hidden w-[162px] h-[162px] rank-item-image">
                <Image
                  src={item.image}
                  width={162}
                  height={162}
                  alt={`avatar_${item.name}`}
                  priority={true}
                  className="z-30"
                />
              </div>
              <div className="flex flex-col items-center justify-center w-full gap-3 px-4">
                <TypographyLarge
                  text={item.name}
                  className="text-white text-[32px] font-bold"
                />
                {membership.name.toLowerCase() === item.name.toLowerCase() ? (
                  <>
                    <TypographySmall
                      text={`${Math.round(user.revenue).toLocaleString(
                        "en-US",
                        {
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 0,
                        },
                      )} / ${formatCoin(nextRequireLevelMoney)}`}
                      className="text-[14px] font-bold text-[#fff9] -translate-y-2"
                    />
                    <Progress
                      value={
                        (user.highest_score / currentBrandMembership) * 100
                      }
                      className="w-full h-[12px] bg-[#ffffff26] border border-[hsla(0,0%,100%,.1)]"
                    />
                  </>
                ) : (
                  <TypographySmall
                    text={`${t("from")} ${formatCoin(+item.short_money)}`}
                    className="text-[14px] font-bold text-[#fff9] -translate-y-2"
                  />
                )}
              </div>
            </div>
          );
        })}
        onSlideChange={setCurrentTarget}
      />
      <div
        ref={ref}
        className="flex flex-col items-start justify-start w-full gap-2 px-4 pb-20"
      >
        {ranks[currentTarget]?.rank.slice(0, visibleRank).map((item, i) => {
          if (item.id === user.id)
            return (
              <div className="fixed px-4 left-0 bottom-20 w-full z-[10000]">
                <ItemCardRank
                  key={i}
                  item={item}
                  order={i + 1}
                  backgroundAva={swiperClass}
                  className="border border-white"
                />
              </div>
            );
          return (
            <ItemCardRank
              key={i}
              item={item}
              order={i + 1}
              backgroundAva={swiperClass}
            />
          );
        })}
      </div>
    </div>
  );
}
