"use client";

import React from "react";
import Link from "next/link";
import { useLocale } from "next-intl";

import TypographySmall from "@ui/components/typography/small";

import { useAppSelector } from "@shared/redux/store";

import { Progress } from "@ui/components/progress";

const { initHapticFeedback } = require("@telegram-apps/sdk-react");

const CardLevel = React.memo(() => {
  const { membership, user, ranks } = useAppSelector((state) => state.app);

  const locale = useLocale();
  const haptic = initHapticFeedback();

  const currentBrandMembership = +ranks.find(
    (item) => item.name.toLowerCase() === membership.name.toLowerCase(),
  )!.short_money;

  return (
    <div className="flex flex-[0.5] flex-col justify-start items-start gap-1 pr-5">
      <Link
        key={`link-short-rank`}
        href={`/${locale}/rank`}
        prefetch={true}
        shallow
        passHref
        onClick={() => haptic.impactOccurred("soft")}
        className="flex items-start justify-between w-full cursor-pointer"
      >
        <div className="flex justify-start items-center gap-[2px] cursor-pointer">
          <TypographySmall
            text={membership?.name as string}
            className="text-[10px] text-white truncate"
          />
          <div className="w-[10px] h-[10px] text-white">
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
        <div className="text-[10px] text-white">
          {membership?.level}/{membership?.max_level}
        </div>
      </Link>
      <Progress
        value={(user.highest_score / currentBrandMembership) * 100}
        className="w-full h-[8px] bg-[#ffffff26] border border-[hsla(0,0%,100%,.1)]"
      />
    </div>
  );
});
export default CardLevel;
