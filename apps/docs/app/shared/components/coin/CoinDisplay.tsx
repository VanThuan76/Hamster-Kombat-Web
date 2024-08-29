'use client'

import React, { useMemo } from "react";
import { cn } from "@ui/lib/utils";

import AnimatedCounter from "@ui/components/motion/AnimatedCounter";
import MemoTypographyLarge from "@shared/components/MemoTypographyLarge";
import MotionContainer from "@ui/components/motion/Container";
import CoinIcon from "@shared/components/CoinIcon";

interface CoinDisplayProps {
    revenue: number;
    prevRevenue: number;
    isAnimatedCouterCoin: boolean;
}

const CoinDisplay = ({ revenue, prevRevenue, isAnimatedCouterCoin }: CoinDisplayProps) => {
    const formattedRevenue = useMemo(() => revenue, [revenue]);

    return (
        <MotionContainer
            className={cn("w-full flex justify-center items-center gap-2")}
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
                        })
                    )}
                    className="text-3xl font-semibold text-white"
                />
            )}
        </MotionContainer>
    );
};

export default CoinDisplay;
