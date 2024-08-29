'use client'
import React, { useMemo } from "react";
import PlusSign from "@ui/components/motion/PlusSign";
import AnimatePresenceWrapper from "@ui/components/motion/AnimatePresenceWrapper";

interface PlusSignAnimationProps {
    plusSigns: { id: number; x: number; y: number }[];
    formattedEnergy: number;
    isSecretFeature: boolean;
    user: {
        tap_value: number;
    };
}

const PlusSignAnimation: React.FC<PlusSignAnimationProps> = ({ plusSigns, formattedEnergy, user, isSecretFeature }) => {
    const renderedPlusSigns = useMemo(() => (
        plusSigns.slice(-10).map((pos) => (
            <PlusSign
                isActive={formattedEnergy >= user.tap_value}
                numberPlus={user.tap_value}
                type={isSecretFeature ? "dot" : "plus"}
                key={pos.id}
                x={pos.x}
                y={pos.y}
            />
        ))
    ), [plusSigns, formattedEnergy, user.tap_value, isSecretFeature]);

    return (
        <AnimatePresenceWrapper>
            {renderedPlusSigns}
        </AnimatePresenceWrapper>
    );
};

export default PlusSignAnimation;
