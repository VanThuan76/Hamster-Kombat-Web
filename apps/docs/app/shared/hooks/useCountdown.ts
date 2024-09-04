import { format as formatTime } from "date-fns"
import { useEffect, useRef, useState } from "react"
import useLocalStorage from "./useLocalStorage"

/**
 * @name Time
 * @description Time as minutes and seconds.
 */
type Time = {
    minutes: number
    seconds: number
}

/**
 * @name Countdown
 * @description State of the countdown timer.
 */
type Countdown = {
    minutes: number
    seconds: number
    formatted: string
    isActive: boolean
    isInactive: boolean
    isRunning: boolean
    isPaused: boolean
    start: VoidFunction
    pause: VoidFunction
    resume: VoidFunction
    reset: (time?: Time) => void
}

const calculateInitialTime = ({ minutes, seconds }: Time): number => {
    const initialMinutes = minutes * 60 * 1000
    const initialSeconds = seconds * 1000
    const initialTime = initialMinutes + initialSeconds

    return initialTime
}

const calculateRemainingMinutes = (remainingTime: number): number =>
    Math.floor(remainingTime / (60 * 1000))

const calculateRemainingSeconds = (remainingTime: number): number =>
    Math.floor((remainingTime / 1000) % 60)

type useCountdownParams = {
    minutes?: number
    seconds?: number
    format?: string
    autoStart?: boolean
    onCompleted?: VoidFunction
}

/**
 * @name useCountdown
 * @description React hook countdown timer.
 */
const useCountdown = ({
    minutes = 0,
    seconds = 0,
    format = "mm:ss",
    autoStart = false,
    onCompleted,
}: useCountdownParams = {}): Countdown => {
    const id = useRef(0);

    // Lấy thời gian kết thúc từ localStorage (nếu có)
    const initialEndTime = () => {
        const savedEndTime = localStorage.getItem("countdown_end_time");
        if (savedEndTime) {
            const endTime = parseInt(savedEndTime, 10);
            const remaining = endTime - Date.now();
            if (remaining > 0) {
                return remaining;
            }
        }
        return calculateInitialTime({ minutes, seconds });
    };

    const [remainingTime, setRemainingTime] = useState(initialEndTime);

    // status
    const [isActive, setIsActive] = useState(false);
    const [isInactive, setIsInactive] = useState(true);
    const [isRunning, setIsRunning] = useState(false);
    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {
        if (autoStart) {
            start();
        }

        return () => window.clearInterval(id.current);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const calculateRemainingTime = () => {
        setRemainingTime((time) => {
            if (time - 1000 <= 0) {
                window.clearInterval(id.current);
                onCompleted?.();

                setIsActive(false);
                setIsInactive(true);
                setIsRunning(false);
                setIsPaused(false);

                localStorage.removeItem("countdown_end_time");
                return 0;
            }

            return time - 1000;
        });
    };

    const start = (): void => {
        if (isRunning) {
            return;
        }

        const endTime = Date.now() + remainingTime;
        localStorage.setItem("countdown_end_time", String(endTime));

        id.current = window.setInterval(calculateRemainingTime, 1000);

        setIsActive(true);
        setIsInactive(false);
        setIsRunning(true);
        setIsPaused(false);
    };

    const pause = (): void => {
        if (isPaused || isInactive) {
            return;
        }

        window.clearInterval(id.current);

        setIsActive(true);
        setIsInactive(false);
        setIsRunning(false);
        setIsPaused(true);
    };

    const reset = (time: Time = { minutes, seconds }) => {
        window.clearInterval(id.current);

        const newRemainingTime = calculateInitialTime(time);
        setRemainingTime(newRemainingTime);

        if (autoStart) {
            start();
        } else {
            setIsActive(false);
            setIsInactive(true);
            setIsRunning(false);
            setIsPaused(false);
        }
    };

    const countdown: Countdown = {
        minutes: calculateRemainingMinutes(remainingTime),
        seconds: calculateRemainingSeconds(remainingTime),
        formatted: formatTime(remainingTime, format),
        isActive,
        isInactive,
        isRunning,
        isPaused,
        start,
        pause,
        resume: start,
        reset,
    };

    return countdown;
};


export default useCountdown
