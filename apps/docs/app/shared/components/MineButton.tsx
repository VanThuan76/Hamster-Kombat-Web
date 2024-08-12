'use client'

import Image from "next/image"
import dynamic from 'next/dynamic'
import { useTranslations } from "next-intl";
import { useMemo, useState, useEffect, useRef } from "react"
import { useRouter } from '@shared/next-intl/navigation';
import { cn } from "@ui/lib/utils"

import { Button } from "@ui/components/button"
import PlusSign from "@ui/components/motion/PlusSign"
import MotionContainer from "@ui/components/motion/Container"
import TypographyLarge from "@ui/components/typography/large"
import MemoTypographyLarge from "@shared/components/MemoTypographyLarge"
import TypographySmall from "@ui/components/typography/small"

import { toast } from "@shared/hooks/useToast";
import { setStateEnergy } from "@shared/redux/store/appSlice";
import { useAppDispatch, useAppSelector } from "@shared/redux/store/index";
import CoinIcon from "@shared/components/CoinIcon"
import useLocalStorage from "@shared/hooks/useLocalStorage";

import { useUpdateRevenue } from "@server/_action/user-action";


const AnimatePresenceWrapper = dynamic(() => import('@ui/components/motion/AnimatePresenceWrapper').then((mod) => mod.default), { ssr: false })

const { initHapticFeedback } = require('@telegram-apps/sdk-react');

const MineButton = ({ isScreenMine, tabScreenMine, isSecretFeature }: { isScreenMine?: boolean, tabScreenMine?: any, isSecretFeature?: boolean }) => {
    const { user, membership, stateEnergy } = useAppSelector(state => state.app);

    const t = useTranslations('components.mine_button')

    const maxEnergy = user.energy_limit
    const haptic = initHapticFeedback();
    const router = useRouter()
    const dispatch = useAppDispatch()
    const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const [energy, setEnergy] = useLocalStorage<number>('current_energy', stateEnergy);
    const [plusSigns, setPlusSigns] = useState<{ id: number, x: number; y: number }[]>([]);
    const [revenue, setRevenue] = useState(user.revenue);
    const [clickCount, setClickCount] = useState(0);

    const updateRevenue = useUpdateRevenue()

    function handleIncludedCoin() {
        if (formattedEnergy < user.tap_value) {
            toast({
                variant: 'destructive',
                title: 'Không đủ năng lượng',
            });
        } else {
            setClickCount(clickCount + user.tap_value);
            setRevenue(revenue + user.tap_value);
            setEnergy(energy - user.tap_value);
            if (saveTimeoutRef.current) {
                clearTimeout(saveTimeoutRef.current);
            }
            saveTimeoutRef.current = setTimeout(() => {
                dispatch(setStateEnergy(energy + user.tap_value));
                updateRevenue.mutate({ user_id: user.id, amount: clickCount + 1 })
            }, 1000);
        }
    }

    const handleCardTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();
        const x = e.touches[0]!.clientX - rect.left - rect.width / 2;
        const y = e.touches[0]!.clientY - rect.top - rect.height / 2;
        card.style.transform = `perspective(1500px) rotateX(${-y / 10}deg) rotateY(${x / 10}deg)`;

        haptic.impactOccurred('soft');

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
            dispatch(setStateEnergy(energy))
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        setRevenue(user.revenue)
    }, [user.revenue])
    const formattedRevenue = useMemo(() => revenue.toLocaleString(), [revenue]);
    const formattedEnergy = useMemo(() => energy, [energy]);

    return (
        <>
            <MotionContainer className={cn("w-full flex justify-center items-center gap-2", !isScreenMine && "mb-3")} type="scale">
                <CoinIcon width={40} height={40} />
                <MemoTypographyLarge text={formattedRevenue} className="text-white text-3xl" />
            </MotionContainer>
            {isSecretFeature && <div className="w-full px-6">
                <div className="w-full bg-[#272a2f] flex justify-between items-center rounded-lg px-2 py-1">
                    <TypographyLarge text={t('daily_cipher')} className="text-white text-[14px]" />
                    <Button className="flex justify-center items-center gap-2 bg-button-mine rounded-md p-2">
                        <CoinIcon width={18} height={18} />
                        <TypographySmall text='+1.000.000' className="text-white text-[14px]" />
                    </Button>
                </div>
            </div>}
            {isScreenMine && tabScreenMine}
            <div className="w-full flex flex-col justify-center items-center p-4">
                <MotionContainer className={cn("relative user-tap-button-inner select-none cursor-pointer", isSecretFeature && 'user-tap-button-inner-secret')} type="scale" onTouchStart={handleCardTouchStart}>
                    <div className={cn("user-tap-button-circle", isSecretFeature && 'user-tap-button-circle-secret', formattedEnergy < user.tap_value && 'user-tap-button-inner-disabled')}>
                        <Image src={process.env.NEXT_PUBLIC_DOMAIN_BACKEND + '/' + membership.image} alt="avatar" width={268} height={268} className="z-30" priority={true} />
                    </div>
                    <AnimatePresenceWrapper>
                        {plusSigns.map((pos) => (
                            <PlusSign isActive={formattedEnergy < user.tap_value ? false : true} numberPlus={user.tap_value} type={isSecretFeature ? "dot" : "plus"} key={pos.id} x={pos.x} y={pos.y} />
                        ))}
                    </AnimatePresenceWrapper>
                </MotionContainer>
                <div className="w-full flex justify-between items-center">
                    <div className="w-full flex justify-start items-center gap-1">
                        <Image src="/project/icon_flash.svg" alt="@flash" width={26} height={26} priority={true} />
                        <MemoTypographyLarge text={`${formattedEnergy} / ${maxEnergy}`} className="text-white text-base" />
                    </div>
                    <div
                        className="w-full flex justify-end items-center gap-1 cursor-pointer"
                        onClick={() => {
                            router.push('/boost', undefined);
                            haptic.impactOccurred('soft');
                        }}
                    >
                        <Image src="/project/icon_rocket.png" alt="@rocket" width={48} height={48} priority={true} />
                        <TypographyLarge text={t('boost')} className="text-white text-base" />
                    </div>
                </div>
            </div>
        </>
    );
}

export default MineButton;