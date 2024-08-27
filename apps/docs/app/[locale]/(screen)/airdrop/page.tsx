"use client";

import Image from "next/image";

import { useTonWallet } from "@tonconnect/ui-react";
import { useTranslations } from "next-intl";

import MotionContainer from "@ui/components/motion/Container";
import TypographyLarge from "@ui/components/typography/large";
import TypographySmall from "@ui/components/typography/small";

import useBackButton from "@shared/hooks/useBackButton";
import { useDraw } from "@shared/hooks/useDraw";

export default function Page(): JSX.Element {
  const { onOpen } = useDraw();

  const t = useTranslations("screens.airdrop");
  const wallet = useTonWallet();
  useBackButton();

  return (
    <div className="relative w-full min-h-screen p-5 space-y-2 overflow-hidden overflow-y-auto text-center">
      <MotionContainer className="relative w-full" direction="top">
        <div className="icon_earn">
          <svg
            width="275"
            height="275"
            viewBox="0 0 275 275"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g filter="url(#filter0_f_1464_6497)">
              <circle
                cx="137.529"
                cy="137.471"
                r="72.4143"
                fill="#FFD337"
              ></circle>
            </g>
            <circle
              cx="137"
              cy="138"
              r="63.4286"
              fill="white"
              fillOpacity="0.05"
            ></circle>
            <circle
              cx="137"
              cy="138"
              r="74"
              fill="white"
              fillOpacity="0.05"
            ></circle>
            <defs>
              <filter
                id="filter0_f_1464_6497"
                x="0.0999756"
                y="0.0428467"
                width="274.857"
                height="274.857"
                filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB"
              >
                <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="BackgroundImageFix"
                  result="shape"
                ></feBlend>
                <feGaussianBlur
                  stdDeviation="32.5071"
                  result="effect1_foregroundBlur_1464_6497"
                ></feGaussianBlur>
              </filter>
            </defs>
          </svg>
        </div>
        <div className="icon_earn_image w-[106px] h-[106px]">
          <Image
            src="/project/icon_lion_coin.png"
            width={106}
            height={106}
            alt="@hamsterCoin"
            priority={true}
            className="w-full h-full"
          />
        </div>
      </MotionContainer>
      <div className="h-[220px]"></div>
      <MotionContainer className="relative w-full" direction="right">
        <TypographyLarge
          text="Airdrop tasks"
          className="text-white text-[32px]"
        />
      </MotionContainer>
      <MotionContainer className="relative w-full" direction="left">
        <TypographySmall
          text={t("des_airdrop")}
          className="text-base text-white"
        />
      </MotionContainer>
      <div
        className="flex flex-col items-start justify-start gap-2 cursor-pointer"
        onClick={() => onOpen("walletConnect")}
      >
        <TypographySmall
          text="Danh sách công việc"
          className="mt-5 text-base text-white"
        />
        <div
          className="w-full flex justify-between items-center rounded-2xl min-h-[64px] px-3"
          style={{
            background:
              "linear-gradient(98deg, #35a6eb 3.58%, #309adb 101.32%)",
          }}
        >
          <div className="flex items-center justify-start gap-2">
            <MotionContainer type="scale" className="w-[56px] h-[56px]">
              <Image
                src="/project/airdrop_connect_ton_wallet.png"
                width={56}
                height={56}
                alt="@airdrop_connect_ton_wallet"
                priority={true}
              />
            </MotionContainer>
            <div className="flex flex-col items-start justify-start">
              <TypographySmall
                text="Kết nối ví TON của bạn"
                className="text-[14px] text-white font-extralight"
              />
            </div>
          </div>
          <div className="airdrop-item-icon">
            {!wallet ? (
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
            ) : (
              <div className="w-[26px] h-[26px] bg-white flex justify-center items-center rounded-full">
                <div className="w-[14px] h-[14px]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    xmlSpace="preserve"
                  >
                    <path
                      d="M9 19.9c-.3 0-.6-.1-.8-.3L3 14.3c-.4-.4-.4-1.2 0-1.6s1.2-.4 1.6 0L9 17.2 20.2 6c.4-.4 1.2-.4 1.6 0 .4.4.4 1.2 0 1.6l-12 12c-.2.2-.5.3-.8.3z"
                      fill="#309adb"
                    ></path>
                  </svg>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
