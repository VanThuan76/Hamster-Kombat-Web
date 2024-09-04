"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@ui/components/button";

import Drawer from "@ui/components/drawer";
import TypographyLarge from "@ui/components/typography/large";
import TypographySmall from "@ui/components/typography/small";

import CoinIcon from "@shared/components/CoinIcon";

import { useDraw } from "@shared/hooks/useDraw";
import {
  setStateEnergy,
  setUpdateEnergyBoost,
} from "@shared/redux/store/appSlice";
import { useAppDispatch, useAppSelector } from "@shared/redux/store";

import { useUpdateBoost } from "@server/_action/boost-action";

export default function DrawerEnergyBoost(): JSX.Element {
  const { user, stateBoostEnergy } = useAppSelector((state) => state.app);
  const { isOpen, data, onClose, type } = useDraw();

  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const t = useTranslations("screens.boost");

  const dispatch = useAppDispatch();
  const updateBoost = useUpdateBoost();

  async function handleSuccess() {
    try {
      await dispatch(
        setStateEnergy({ amount: user.energy_limit, isReset: true }),
      );
      await dispatch(
        setUpdateEnergyBoost({ step: stateBoostEnergy.step - 1, delay: 60 }),
      );

      onClose();

      await updateBoost.mutateAsync({
        user_id: user.id,
        current_user_boots_id: data?.current?.user_boots_id,
        current_boots_level: data?.current?.level,
        next_user_boots_id: data?.next?.user_boots_id,
        next_boots_level: data?.next?.level,
        type: 0,
        sub_type: 0,
      });
      console.log("Successfully");
    } catch (error) {
      console.error("Error in handleSuccess:", error);
    }
  }

  useEffect(() => {
    if (isOpen && type === "energyBoost") {
      setIsDrawerOpen(true);
    } else {
      setIsDrawerOpen(false)
    }
  }, [isOpen, type]);

  return (
    <Drawer
      isOpen={isDrawerOpen}
      onClose={onClose}
      className="w-full card-has-glow min-h-[60%] border-none"
    >
      <div className="flex flex-col items-center justify-center w-full gap-8">
        <div className="relative z-10">
          <Image
            src="/project/icon_flash.png"
            alt="@icon_flash"
            width={115}
            height={115}
            priority={true}
            quality={75}
          />
        </div>
        <div className="flex flex-col items-center justify-center w-full gap-5">
          <TypographyLarge
            text={t("full_energy")}
            className="text-white text-[32px] font-bold"
          />
          <TypographySmall
            text={t("des_full_energy")}
            className="text-white text-center text-[14px] max-w-[280px] font-normal"
          />
          <div className="flex items-center justify-center gap-2">
            <CoinIcon width={28} height={28} />
            <TypographyLarge
              text={String(data?.current?.required_money)}
              className="text-xl font-bold text-white"
            />
          </div>
        </div>
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
      </div>
    </Drawer>
  );
}
