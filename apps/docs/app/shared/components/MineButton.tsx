'use client'

import Image from "next/image"
import { useState } from "react";
import { cn } from "@ui/lib/utils"

import PlusSign from "@ui/components/motion/PlusSign"
import MotionContainer from "@ui/components/motion/container"
import AnimatePresenceWrapper from "@ui/components/motion/AnimatePresenceWrapper"

const MineButton = ({ isSecretFeature, handleIncreaseCoin }: { isSecretFeature?: boolean, handleIncreaseCoin: any }) => {
    const [plusSigns, setPlusSigns] = useState<{ id: number, x: number; y: number }[]>([]);

    const handleCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        card.style.transform = `perspective(1500px) rotateX(${-y / 10}deg) rotateY(${x / 10}deg)`;

        if (navigator.vibrate) {
            navigator.vibrate(50);
        }

        const xPlus = e.clientX - rect.left;
        const yPlus = e.clientY - rect.top;
        const newPlusSign = { id: Date.now(), x: xPlus, y: yPlus };

        requestAnimationFrame(() => {
            setPlusSigns(current => [...current, newPlusSign]);

            requestAnimationFrame(() => {
                setTimeout(() => {
                    card.style.transform = '';
                    handleIncreaseCoin()
                }, 100);
                setTimeout(() => {
                    setPlusSigns(current => current.filter(pos => pos.id !== newPlusSign.id));
                }, 500);
            });
        });
    };

    return (
        <MotionContainer className={cn("relative user-tap-button-inner select-none cursor-pointer", isSecretFeature && 'user-tap-button-inner-secret')} type="scale" onClick={handleCardClick}>
            <div className={cn("user-tap-button-circle", isSecretFeature && 'user-tap-button-circle-secret')}>
                <Image src="/project/ava_bronze.png" alt="avatar" width={268} height={268} className="z-30" />
            </div>
            <AnimatePresenceWrapper>
                {plusSigns.map((pos) => (
                    <PlusSign type={isSecretFeature ? "dot" : "plus"} key={pos.id} x={pos.x} y={pos.y} />
                ))}
            </AnimatePresenceWrapper>
        </MotionContainer>
    );
}

export default MineButton;