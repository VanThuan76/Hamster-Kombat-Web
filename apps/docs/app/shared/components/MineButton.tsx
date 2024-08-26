"use client";

import dynamic from "next/dynamic";
import React, { useMemo, useState, useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "@shared/next-intl/navigation";
import { cn } from "@ui/lib/utils";

import { Button } from "@ui/components/button";
import PlusSign from "@ui/components/motion/PlusSign";
import MotionContainer from "@ui/components/motion/Container";
import TypographyLarge from "@ui/components/typography/large";
import MemoTypographyLarge from "@shared/components/MemoTypographyLarge";
import TypographySmall from "@ui/components/typography/small";
import AnimatedCounter from "@ui/components/motion/AnimatedCounter";

import { toast } from "@shared/hooks/useToast";
import { setStateEnergy, setUpdateRevenue } from "@shared/redux/store/appSlice";
import { useAppDispatch, useAppSelector } from "@shared/redux/store/index";
import CoinIcon from "@shared/components/CoinIcon";
import useLocalStorage from "@shared/hooks/useLocalStorage";

import { useUpdateRevenue } from "@server/_action/user-action";
import { CtfPicture } from "./CtfPicture";

const AnimatePresenceWrapper = dynamic(
  () =>
    import("@ui/components/motion/AnimatePresenceWrapper").then(
      (mod) => mod.default,
    ),
  { ssr: false },
);

const { initHapticFeedback } = require("@telegram-apps/sdk-react");

const MineButton = ({
  ref,
  isScreenMine,
  tabScreenMine,
  isSecretFeature,
}: {
  ref?: any;
  isScreenMine?: boolean;
  tabScreenMine?: any;
  isSecretFeature?: boolean;
}) => {
  const {
    user,
    membership,
    stateEnergy,
    isResetStateEnergy,
    isAnimatedCouterCoin,
  } = useAppSelector((state) => state.app);

  const t = useTranslations("components.mine_button");

  const maxEnergy = user.energy_limit;
  const haptic = initHapticFeedback();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [energy, setEnergy] = useLocalStorage<number>(
    "current_energy",
    stateEnergy,
  );
  const [plusSigns, setPlusSigns] = useState<
    { id: number; x: number; y: number }[]
  >([]);
  const [profit, setProfit] = useLocalStorage<number>("profit_revenue", 0);
  const [revenue, setRevenue] = useState(user.revenue);
  const [prevRevenue, setPrevRevenue] = useState(user.revenue);
  const [clickCount, setClickCount] = useState(0);

  const formattedRevenue = useMemo(() => revenue, [revenue]);
  const formattedEnergy = useMemo(() => energy, [energy]);

  const updateRevenue = useUpdateRevenue();

  function handleIncludedCoin() {
    if (formattedEnergy < user.tap_value) {
      toast({
        variant: "destructive",
        title: "Không đủ năng lượng",
      });
      return;
    }
    const newRevenue = clickCount + 1 + user.tap_value;
    const newEnergy = energy - user.tap_value;

    setPrevRevenue(revenue);
    setEnergy(newEnergy);
    setClickCount((prevCount) => prevCount + 1);

    dispatch(setStateEnergy({ amount: newEnergy, isReset: false }));
    dispatch(setUpdateRevenue(user.revenue + user.tap_value));

    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    // Tạo mới timeout để gửi số liệu tích lũy lên server sau 1 giây
    saveTimeoutRef.current = setTimeout(() => {
      // Gửi cập nhật lên server
      updateRevenue.mutate({
        user_id: user.id,
        amount: newRevenue,
      });
    }, 1000);
  }

  const handleCardTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.touches[0]!.clientX - rect.left - rect.width / 2;
    const y = e.touches[0]!.clientY - rect.top - rect.height / 2;
    card.style.transform = `perspective(1500px) rotateX(${-y / 10}deg) rotateY(${x / 10}deg)`;

    haptic.impactOccurred("medium");

    const xPlus = e.touches[0]!.clientX - rect.left;
    const yPlus = e.touches[0]!.clientY - rect.top;
    const newPlusSign = { id: Date.now(), x: xPlus, y: yPlus };

    requestAnimationFrame(() => {
      setPlusSigns((current) => [...current, newPlusSign]);

      requestAnimationFrame(() => {
        card.style.transform = "";
        handleIncludedCoin();

        setTimeout(() => {
          setPlusSigns((current) =>
            current.filter((pos) => pos.id !== newPlusSign.id),
          );
        }, 500);
      });
    });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setEnergy((prevEnergy) => {
        const newEnergy = Math.min(prevEnergy + 3, maxEnergy);
        dispatch(setStateEnergy({ amount: newEnergy, isReset: false }));
        return newEnergy;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [energy, maxEnergy]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setRevenue(user.revenue);
    });

    return () => {
      clearTimeout(timeoutId);
    };
  }, [user.revenue]);

  useEffect(() => {
    if (!isResetStateEnergy) return;
    setEnergy(stateEnergy);
  }, [stateEnergy, isResetStateEnergy]);

  return (
    <div ref={ref}>
      <MotionContainer
        className={cn(
          "w-full flex justify-center items-center gap-2",
          !isScreenMine && "mb-3",
        )}
        type="scale"
      >
        <CoinIcon width={40} height={40} />
        {isAnimatedCouterCoin ? (
          <AnimatedCounter
            from={prevRevenue}
            to={Math.round(formattedRevenue)}
            className="text-3xl font-semibold text-white"
          />
        ) : (
          <MemoTypographyLarge
            text={String(
              Math.round(formattedRevenue).toLocaleString("en-US", {
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              }),
            )}
            className="text-3xl font-semibold text-white"
          />
        )}
      </MotionContainer>
      {isSecretFeature && (
        <div className="w-full px-6">
          <div className="w-full bg-[#272a2f] flex justify-between items-center rounded-lg px-2 py-1">
            <TypographyLarge
              text={t("daily_cipher")}
              className="text-white text-[14px]"
            />
            <Button className="flex items-center justify-center gap-2 p-2 rounded-md bg-button-mine">
              <CoinIcon width={18} height={18} />
              <TypographySmall
                text="+1.000.000"
                className="text-white text-[14px]"
              />
            </Button>
          </div>
        </div>
      )}
      {isScreenMine && tabScreenMine}
      <div className="flex flex-col items-center justify-center w-full p-4">
        <MotionContainer
          className={cn(
            "relative user-tap-button-inner select-none cursor-pointer",
            isSecretFeature && "user-tap-button-inner-secret",
          )}
          type="scale"
          onTouchStart={
            formattedEnergy >= user.tap_value ? handleCardTouchStart : () => {}
          }
        >
          <div
            className={cn(
              "user-tap-button-circle overflow-hidden",
              isSecretFeature && "user-tap-button-circle-secret",
              formattedEnergy < user.tap_value &&
                "user-tap-button-inner-disabled",
            )}
          >
            <CtfPicture
              url={
                process.env.NEXT_PUBLIC_DOMAIN_BACKEND + "/" + membership.image
              }
              width={320}
              height={320}
              title="avatar"
              nextImageProps={{
                priority: true,
                className: "relative object-cover w-full h-full z-10",
              }}
            />
          </div>
          <AnimatePresenceWrapper>
            {plusSigns.map((pos) => (
              <PlusSign
                isActive={formattedEnergy < user.tap_value ? false : true}
                numberPlus={user.tap_value}
                type={isSecretFeature ? "dot" : "plus"}
                key={pos.id}
                x={pos.x}
                y={pos.y}
              />
            ))}
          </AnimatePresenceWrapper>
        </MotionContainer>
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center justify-start w-full gap-1">
            <div className="w-[32px] h-[26px]">
              <CtfPicture
                url="/project/icon_flash.png"
                width={32}
                height={26}
                title="@flash"
                nextImageProps={{
                  priority: true,
                }}
              />
            </div>
            <MemoTypographyLarge
              text={`${formattedEnergy} / ${maxEnergy}`}
              className="text-base text-white"
            />
          </div>
          <div
            className="flex items-center justify-end w-full gap-1 cursor-pointer"
            onClick={() => {
              router.push("/boost", undefined);
              haptic.impactOccurred("soft");
            }}
          >
            <div className="w-[32px] h-[26px]">
              <CtfPicture
                url="/project/icon_rocket.png"
                width={32}
                height={26}
                title="@rocket"
                nextImageProps={{
                  priority: true,
                }}
              />
            </div>
            <TypographyLarge
              text={t("boost")}
              className="text-[14px] text-white"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MineButton;
