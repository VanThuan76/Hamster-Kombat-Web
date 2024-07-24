'use client'

import { useEffect, useState } from "react";
import TypographySmall from "@ui/components/typography/small";

const CountdownTimer = ({ targetTime }: { targetTime: Date }) => {
    const [timeLeft, setTimeLeft] = useState(targetTime.getTime() - Date.now());

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLeft(targetTime.getTime() - Date.now());
        }, 1000);

        return () => clearInterval(interval);
    }, [targetTime]);

    const formatTime = (ms: number) => {
        const hours = Math.floor(ms / (1000 * 60 * 60));
        const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((ms % (1000 * 60)) / 1000);

        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };

    return (
        <TypographySmall text={formatTime(timeLeft)} className="text-[#8b8e93] text-xs font-extralight" />
    );
};

export default CountdownTimer;
