"use client";

import Image from "next/image";

import { useTranslations } from "next-intl";
import { Button } from "@ui/components/button";

import Drawer from "@ui/components/drawer";
import TypographyLarge from "@ui/components/typography/large";

import useLocalStorage from "@shared/hooks/useLocalStorage";
import { useDraw } from "@shared/hooks/useDraw";
import { formatCoin } from "@shared/utils/formatNumber";
import {
  setIsProfitRevenueActive,
  setUpdateRevenue,
} from "@shared/redux/store/appSlice";

import { useUpdateRevenue } from "@server/_action/user-action";

import { useAppDispatch, useAppSelector } from "@shared/redux/store/index";
import CoinIcon from "@shared/components/CoinIcon";

const { initHapticFeedback } = require("@telegram-apps/sdk-react");

export default function DrawerGetProfit(): JSX.Element {
  const dispatch = useAppDispatch();
  const haptic = initHapticFeedback();

  const { user, isProfitRevenueActive } = useAppSelector((state) => state.app);
  const { isOpen, onClose, type } = useDraw();

  const [profit, setProfit] = useLocalStorage<number>("profit_revenue", 0);

  const isDrawerOpen = isProfitRevenueActive && isOpen && type === "getProfit";
  const updateRevenue = useUpdateRevenue();

  const t = useTranslations("components.drawer_change_exchange");

  async function handleGetProfit() {
    try {
      haptic.impactOccurred("medium");

      await dispatch(setUpdateRevenue(user.revenue + Math.round(profit))); // Fix
      await dispatch(setIsProfitRevenueActive(false));

      onClose();

      await updateRevenue.mutateAsync({
        user_id: user.id,
        amount: Math.round(profit),
      });

      setProfit(0);

      console.log("Successfully");
    } catch (error) {
      console.error("Error in handleSuccess:", error);
    }
  }

  return (
    <Drawer
      isOpen={isDrawerOpen}
      onClose={handleGetProfit}
      className="w-full card-has-glow min-h-[60%] border-none"
    >
      <div className="flex flex-col items-center justify-center w-full gap-8 mt-10">
        <div className="relative w-full min-h-[200px] flex flex-col justify-center items-center gap-5 bg-[#272a2f] px-6 pt-8 -mb-2 rounded-3xl">
          <div className="absolute -top-10 z-10 w-[80px] h-[80px] p-5 bg-[#272a2f] border-4 border-[#1c1f24] rounded-full flex items-center justify-center">
            <Image
              src={user.exchange.icon}
              width={60}
              height={60}
              alt="@imageTask"
              priority={true}
            />
          </div>
          <div className="flex items-center justify-center gap-2">
            <CoinIcon width={60} height={60} className="w-[60px] h-[60px]" />
            <TypographyLarge
              text={String(formatCoin(Math.round(profit)))}
              className="text-white text-[40px] font-bold"
            />
          </div>
          <TypographyLarge
            text={`Sàn giao dịch đã bắt đầu làm việc cho bạn`}
            className="text-white text-[20px] text-center font-bold"
          />
        </div>
        <Button
          className="w-full h-[80px] bg-[#5a60ff] hover:bg-[#5a60ff]/90 text-white flex justify-center items-center gap-2 rounded-2xl"
          onClick={handleGetProfit}
        >
          <TypographyLarge
            text={`Cảm ơn bạn, ${user.exchange.name}`}
            className="text-xl font-bold text-white"
          />
          <svg
            className="w-[24px] h-[24px]"
            xmlns="http://www.w3.org/2000/svg"
            xmlSpace="preserve"
            viewBox="0 0 24 24"
          >
            <path
              d="M22.5 8.8c0 6.6-9.7 11.9-10.1 12.1-.2.1-.3.1-.4.1s-.2 0-.4-.1c-.4-.2-10.1-5.5-10.1-12.1 0-1.5.6-3 1.7-4.1S5.8 3 7.3 3c1.9 0 3.6.8 4.7 2.2C13.1 3.8 14.8 3 16.7 3c1.5 0 3 .6 4.1 1.7 1.1 1.1 1.7 2.6 1.7 4.1z"
              fill="currentColor"
            ></path>
          </svg>
        </Button>
      </div>
    </Drawer>
  );
}
