"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { useDraw } from "@shared/hooks/useDraw";

import Drawer from "@ui/components/drawer";
import TypographyLarge from "@ui/components/typography/large";
import TypographySmall from "@ui/components/typography/small";

import InfoWalletTON from "../InfoWalletTON";

const DrawerWalletConnect = () => {
  const { isOpen, onClose, type } = useDraw();
  const t = useTranslations("screens.airdrop")

  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  useEffect(() => {
    if (isOpen && type === "walletConnect") {
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
        <div className="relative visible">
          <div className="relative z-10 w-[115px] h-[115px]">
            <Image
              src="/project/airdrop_connect_ton_wallet.png"
              width={115}
              height={115}
              alt="@airdrop_connect_ton_wallet"
              priority={true}
            />
          </div>
        </div>
        <div className="flex flex-col items-center justify-center w-full gap-5">
          <TypographyLarge
            text={t("connect")}
            className="text-white text-[32px] font-bold"
          />
          <TypographySmall
            text="Kết nối ví tiền điện tử của bạn.  Nếu bạn chưa có, hãy tạo một cái trong tài khoản Telegram của bạn"
            className="text-white text-[14px] max-w-[280px] font-normal"
          />
        </div>
        <InfoWalletTON />
      </div>
    </Drawer>
  );
};
export default DrawerWalletConnect;
