"use client";

import Image from "next/image";
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

import { useUpdateBoost } from "@server/_action/boost-action";
import { setUpdateRevenue } from "@shared/redux/store/appSlice";

const { initHapticFeedback } = require("@telegram-apps/sdk-react");

export default function DrawerEnergyLimitBoost(): JSX.Element {
  const { user } = useAppSelector((state) => state.app);
  const { isOpen, data, onClose, type } = useDraw();
  const isDrawerOpen = isOpen && type === "energyLimitBoost";

  const dispatch = useAppDispatch();
  const haptic = initHapticFeedback();
  const t = useTranslations("screens.boost");

  const updateBoost = useUpdateBoost();

  async function handleSuccess() {
    try {
      await dispatch(
        setUpdateRevenue(user.revenue - data?.next?.required_money),
      ); // Fix

      onClose();
      haptic.impactOccurred("soft");

      await updateBoost.mutateAsync({
        user_id: user.id,
        current_user_boots_id: data?.current?.user_boots_id,
        current_boots_level: data?.current?.level,
        next_user_boots_id: data?.next?.user_boots_id,
        next_boots_level: data?.next?.level,
        type: 1,
        sub_type: 3,
      });

      console.log("Successfully");
    } catch (error) {
      console.error("Error in handleSuccess:", error);
    }
  }

  return (
    <Drawer
      isOpen={isDrawerOpen}
      onClose={onClose}
      className="w-full card-has-glow min-h-[60%] border-none"
    >
      <div className="flex flex-col items-center justify-center w-full gap-8">
        <div className="relative z-10">
          <Image
            src="/project/icon_boost-energy.png"
            alt="@icon_boost-energy"
            width={115}
            height={115}
            priority={true}
            quality={75}
          />
        </div>
        <div className="flex flex-col items-center justify-center w-full gap-5">
          <TypographyLarge
            text={t("energy_limit")}
            className="text-white text-[32px] font-bold"
          />
          <TypographySmall
            text={t("des_energy_limit_1")}
            className="text-white text-[14px] max-w-[280px] font-normal"
          />
          <TypographySmall
            text={t("des_energy_limit_2") + " " + String(data?.next?.level)}
            className="text-white text-base max-w-[280px] font-normal"
          />
          <div className="flex items-center justify-center gap-2">
            <CoinIcon
              width={28}
              height={28}
              className={cn(
                data?.next?.required_money > user.revenue &&
                  "coin-is-grayscale",
              )}
            />
            <TypographyLarge
              text={String(formatCoinStyleDot(data?.next?.required_money))}
              className="text-xl font-bold text-white"
            />
          </div>
        </div>
        {data?.next?.required_money > user.revenue ? (
          <Button className="w-full h-[80px] bg-[#4e4f50cc] hover:bg-[#4e4f50cc] text-white flex justify-center items-center gap-2 rounded-2xl pointer-events-none">
            <TypographyLarge
              text={t("not_enough_money")}
              className="text-xl font-bold text-white"
            />
          </Button>
        ) : (
          <Button
            className="w-full h-[80px] bg-[#5a60ff] hover:bg-[#5a60ff]/90 text-white flex justify-center items-center gap-2 rounded-2xl"
            onClick={handleSuccess}
          >
            <TypographyLarge
              text={t("earn")}
              className="text-xl font-bold text-white"
            />
            <CoinIcon width={28} height={28} />
          </Button>
        )}
      </div>
    </Drawer>
  );
}
