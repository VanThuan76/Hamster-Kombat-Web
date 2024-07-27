'use client'

import Image from "next/image"
import { useMemo, useState, useEffect } from "react"
import { useRouter } from '@shared/next-intl/navigation';
import { cn } from "@ui/lib/utils"

import { Button } from "@ui/components/button"
import PlusSign from "@ui/components/motion/PlusSign"
import MotionContainer from "@ui/components/motion/container"
import AnimatePresenceWrapper from "@ui/components/motion/AnimatePresenceWrapper"
import TypographyLarge from "@ui/components/typography/large"
import MemoTypographyLarge from "@shared/components/MemoTypographyLarge"
import TypographySmall from "@ui/components/typography/small"

const { initHapticFeedback } = require('@telegram-apps/sdk-react');

const MineButton = ({ isScreenMine, tabScreenMine, isSecretFeature }: { isScreenMine?: boolean, tabScreenMine?: any, isSecretFeature?: boolean }) => {
    const haptic = initHapticFeedback();
    const router = useRouter()

    const maxEnergy = 1000
    const [plusSigns, setPlusSigns] = useState<{ id: number, x: number; y: number }[]>([]);
    const [points, setPoints] = useState(770);
    const [energy, setEnergy] = useState(1000);

    function handleIncludedCoin() {
        setPoints(points + 1);
        setEnergy(energy - 1);
    }

    const handleCardTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();
        const x = e.touches[0]!.clientX - rect.left - rect.width / 2;
        const y = e.touches[0]!.clientY - rect.top - rect.height / 2;
        card.style.transform = `perspective(1500px) rotateX(${-y / 10}deg) rotateY(${x / 10}deg)`;

        haptic.impactOccurred('medium');

        const xPlus = e.touches[0]!.clientX - rect.left;
        const yPlus = e.touches[0]!.clientY - rect.top;
        const newPlusSign = { id: Date.now(), x: xPlus, y: yPlus };

        requestAnimationFrame(() => {
            setPlusSigns(current => [...current, newPlusSign]);

            requestAnimationFrame(() => {
                setTimeout(() => {
                    card.style.transform = '';
                    handleIncludedCoin();
                }, 100);
                setTimeout(() => {
                    setPlusSigns(current => current.filter(pos => pos.id !== newPlusSign.id));
                }, 500);
            });
        });
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setEnergy(prevEnergy => Math.min(prevEnergy + 3, maxEnergy));
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    const formattedPoints = useMemo(() => points.toLocaleString(), [points]);
    const formattedEnergy = useMemo(() => energy, [energy]);

    return (
        <>
            <MotionContainer className={cn("w-full flex justify-center items-center gap-2", !isScreenMine && "mb-3")} type="scale">
                <Image src="/project/icon_coin.png" alt="@coin" width={40} height={40} />
                <MemoTypographyLarge text={formattedPoints} className="text-white text-3xl" />
            </MotionContainer>
            {isSecretFeature && <div className="w-full flex justify-between items-center bg-[#272a2f] rounded-lg p-2">
                <TypographyLarge text="Mật mã hàng ngày" className="text-white text-[14px]" />
                <Button className="flex justify-center items-center gap-2 bg-button-mine rounded-md p-2">
                    <Image src="/project/icon_coin.png" alt="@coin" width={18} height={18} />
                    <TypographySmall text='+1.000.000' className="text-white text-[14px]" />
                </Button>
            </div>}
            {isScreenMine && tabScreenMine}
            <div className="w-full flex flex-col justify-center items-center p-4">
                <MotionContainer className={cn("relative user-tap-button-inner select-none cursor-pointer", isSecretFeature && 'user-tap-button-inner-secret')} type="scale" onTouchStart={handleCardTouchStart}>
                    <div className={cn("user-tap-button-circle", isSecretFeature && 'user-tap-button-circle-secret')}>
                        <Image src="/project/ava_bronze.png" alt="avatar" width={268} height={268} className="z-30" />
                    </div>
                    <AnimatePresenceWrapper>
                        {plusSigns.map((pos) => (
                            <PlusSign type={isSecretFeature ? "dot" : "plus"} key={pos.id} x={pos.x} y={pos.y} />
                        ))}
                    </AnimatePresenceWrapper>
                </MotionContainer>
                <div className="w-full flex justify-between items-center">
                    <div className="w-full flex justify-start items-center gap-1">
                        <Image src="/project/icon_flash.svg" alt="@flash" width={26} height={26} />
                        <MemoTypographyLarge text={`${formattedEnergy} / ${maxEnergy}`} className="text-white text-base" />
                    </div>
                    <div
                        className="w-full flex justify-end items-center gap-1 cursor-pointer"
                        onClick={() => {
                            router.push('/boost')
                            haptic.impactOccurred('medium');
                        }}
                    >
                        <Image src="/project/icon_rocket.png" alt="@rocket" width={48} height={48} />
                        <TypographyLarge text="Tăng cường" className="text-white text-base" />
                    </div>
                </div>
            </div>
        </>
    );
}

export default MineButton;