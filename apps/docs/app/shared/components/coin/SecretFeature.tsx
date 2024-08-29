'use client'
import React from "react";
import { useTranslations } from "next-intl";
import { Button } from "@ui/components/button";

import TypographyLarge from "@ui/components/typography/large";
import TypographySmall from "@ui/components/typography/small";
import CoinIcon from "@shared/components/CoinIcon";

const SecretFeature = () => {
    const t = useTranslations("components.mine_button");

    return (
        <div className="w-full px-6">
            <div className="w-full bg-[#272a2f] flex justify-between items-center rounded-lg px-2 py-1">
                <TypographyLarge text={t("daily_cipher")} className="text-white text-[14px]" />
                <Button className="flex items-center justify-center gap-2 p-2 rounded-md bg-button-mine">
                    <CoinIcon width={18} height={18} />
                    <TypographySmall text="+1.000.000" className="text-white text-[14px]" />
                </Button>
            </div>
        </div>
    );
};

export default SecretFeature;
