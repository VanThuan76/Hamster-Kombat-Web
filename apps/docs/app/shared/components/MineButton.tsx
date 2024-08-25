"use client";

import Image from "next/image";
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

  // Biến này sẽ lưu trữ số lần click tích lũy trong một khoảng thời gian
  let accumulatedClicks = 0;

  function handleIncludedCoin() {
    if (formattedEnergy < user.tap_value) {
      toast({
        variant: "destructive",
        title: "Không đủ năng lượng",
      });
    } else {
      // Tính toán trước các giá trị mới
      const newRevenue = revenue + user.tap_value;
      const newEnergy = energy - user.tap_value;

      // Cập nhật giá trị ngay lập tức
      setPrevRevenue(newRevenue);
      setRevenue(newRevenue);
      setEnergy(newEnergy);

      // Tích lũy số lần click vào hàng đợi
      accumulatedClicks += 1;

      // Cập nhật Redux ngay lập tức để đảm bảo Redux luôn đúng
      dispatch(setStateEnergy({ amount: newEnergy, isReset: false }));
      dispatch(
        setUpdateRevenue(user.revenue + accumulatedClicks * user.tap_value),
      );

      // Nếu đã có một timeout đang chạy, chúng ta không tạo thêm timeout mới
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }

      // Đặt một timeout để cập nhật lên server sau một khoảng thời gian ngắn (1 giây)
      saveTimeoutRef.current = setTimeout(() => {
        // Gửi cập nhật lên server với số lần click đã tích lũy
        updateRevenue.mutate({
          user_id: user.id,
          amount: accumulatedClicks * user.tap_value,
        });

        // Reset hàng đợi sau khi cập nhật thành công
        accumulatedClicks = 0;
      }, 1000); // Cứ mỗi giây tích lũy rồi mới cập nhật một lần
    }
  }

  const handleCardTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.touches[0]!.clientX - rect.left - rect.width / 2;
    const y = e.touches[0]!.clientY - rect.top - rect.height / 2;
    card.style.transform = `perspective(1500px) rotateX(${-y / 10}deg) rotateY(${x / 10}deg)`;

    haptic.impactOccurred("soft");

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
              "user-tap-button-circle",
              isSecretFeature && "user-tap-button-circle-secret",
              formattedEnergy < user.tap_value &&
                "user-tap-button-inner-disabled",
            )}
          >
            <Image
              src={
                process.env.NEXT_PUBLIC_DOMAIN_BACKEND + "/" + membership.image
              }
              alt="avatar"
              width={320}
              height={320}
              className="z-30"
              priority={true}
              quality={75}
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
            <Image
              src="/project/icon_flash.png"
              alt="@flash"
              width={32}
              height={26}
              priority={true}
              quality={75}
            />
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
            <Image
              src="/project/icon_rocket.png"
              alt="@rocket"
              width={32}
              height={26}
              priority={true}
              quality={75}
            />
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
