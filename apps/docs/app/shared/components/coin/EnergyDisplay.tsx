'use client'
import React from "react";
import Image from "next/image";

import TypographyLarge from "@ui/components/typography/large";

interface EnergyDisplayProps {
    formattedEnergy: string;
    maxEnergy: string;
}

const EnergyDisplay = ({ formattedEnergy, maxEnergy }: EnergyDisplayProps) => {
    return (
        <div className="flex items-center justify-between w-full">
            <div className="flex items-center justify-start w-full gap-1">
                <div className="w-[32px] h-[26px]">
                    <Image
                        src="/project/icon_flash.png"
                        width={32}
                        height={26}
                        alt="@flash"
                        priority={true}
                    />
                </div>
                <TypographyLarge text={`${formattedEnergy} / ${maxEnergy}`} className="text-base text-white" />
            </div>
        </div>
    );
};

export default EnergyDisplay;
