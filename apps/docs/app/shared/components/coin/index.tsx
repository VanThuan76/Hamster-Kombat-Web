'use client'
import React, { useMemo, useState, useEffect, useRef } from "react";
import { toast } from "@shared/hooks/useToast";
import { useTranslations } from "next-intl";
import { useRouter } from "@shared/next-intl/navigation";
import { useAppDispatch, useAppSelector } from "@shared/redux/store/index";
import { setStateEnergy, setUpdateRevenue } from "@shared/redux/store/appSlice";

import { useUpdateRevenue } from "@server/_action/user-action";
import useLocalStorage from "@shared/hooks/useLocalStorage";

import CoinDisplay from "./CoinDisplay";
import SecretFeature from "./SecretFeature";
import AnimatedButton from "./AnimatedButton";
import PlusSignAnimation from "./PlusSignAnimation";
import EnergyDisplay from "./EnergyDisplay";

const { initHapticFeedback } = require("@telegram-apps/sdk-react");

const MineCoinButton = ({
    isScreenMine,
    tabScreenMine,
    isSecretFeature,
}: {
    isScreenMine: boolean;
    tabScreenMine: boolean;
    isSecretFeature: boolean;
}) => {
    const {
        user,
        membership,
        stateEnergy,
        isResetStateEnergy,
        isAnimatedCouterCoin,
    } = useAppSelector((state) => state.app);

    const t = useTranslations("components.mine_button");
    const maxEnergy = user.energy_limit;
    const haptic = initHapticFeedback();
    const dispatch = useAppDispatch();
    const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const [energy, setEnergy] = useLocalStorage<number>("current_energy", stateEnergy);
    const [plusSigns, setPlusSigns] = useState<{ id: number; x: number; y: number }[]>([]);
    const [revenue, setRevenue] = useState(user.revenue);
    const [prevRevenue, setPrevRevenue] = useState(user.revenue);
    const [clickCount, setClickCount] = useState(0);

    const formattedRevenue = useMemo(() => revenue, [revenue]);
    const formattedEnergy = useMemo(() => energy, [energy]);

    const updateRevenue = useUpdateRevenue();

    const handleCardTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();
        const x = e.touches[0]!.clientX - rect.left - rect.width / 2;
        const y = e.touches[0]!.clientY - rect.top - rect.height / 2;

        card.style.transform = `perspective(1500px) rotateX(${-y / 10}deg) rotateY(${x / 10}deg)`;
        haptic.impactOccurred("medium");

        const xPlus = e.touches[0]!.clientX - rect.left;
        const yPlus = e.touches[0]!.clientY - rect.top;
        const newPlusSign = { id: Date.now(), x: xPlus, y: yPlus };

        requestAnimationFrame(() => {
            setPlusSigns((current) => [...current, newPlusSign]);

            requestAnimationFrame(() => {
                card.style.transform = "";
                handleIncludedCoin(e.touches.length);

                setTimeout(() => {
                    setPlusSigns((current) =>
                        current.filter((pos) => pos.id !== newPlusSign.id),
                    );
                }, 300);
            });
        });
    };


    const handleIncludedCoin = (numberOfFingers: number) => {
        if (formattedEnergy < user.tap_value) {
          toast({
            variant: "destructive",
            title: "Không đủ năng lượng",
          });
          return;
        }

        const newRevenue = clickCount + numberOfFingers * user.tap_value;
        const newEnergy = energy - user.tap_value * numberOfFingers;

        setPrevRevenue(revenue);
        setEnergy(newEnergy);
        setClickCount((prevCount) => prevCount + numberOfFingers);

        dispatch(setStateEnergy({ amount: newEnergy, isReset: false }));
        dispatch(setUpdateRevenue(user.revenue + numberOfFingers * user.tap_value));

        if (saveTimeoutRef.current) {
          clearTimeout(saveTimeoutRef.current);
        }

        saveTimeoutRef.current = setTimeout(() => {
          updateRevenue.mutate({
            user_id: user.id,
            amount: newRevenue,
          });
        }, 500);
      };

      useEffect(() => {
        const interval = setInterval(() => {
          setEnergy((prevEnergy) => {
            const newEnergy = Math.min(prevEnergy + 3, maxEnergy);
            if (newEnergy !== prevEnergy) {
              dispatch(setStateEnergy({ amount: newEnergy, isReset: false }));
            }
            return newEnergy;
          });
        }, 1000);

        return () => clearInterval(interval);
      }, [dispatch, maxEnergy]);

    useEffect(() => {
        setRevenue(user.revenue);
    }, [user.revenue]);

    useEffect(() => {
        if (!isResetStateEnergy) return;
        setEnergy(stateEnergy);
    }, [stateEnergy, isResetStateEnergy]);

    return (
        <React.Fragment>
            <CoinDisplay
                revenue={formattedRevenue}
                prevRevenue={prevRevenue}
                isAnimatedCouterCoin={isAnimatedCouterCoin}
            />
            {isSecretFeature && <SecretFeature />}
            {isScreenMine && tabScreenMine}
            <AnimatedButton
                handleCardTouchStart={handleCardTouchStart}
                formattedEnergy={formattedEnergy}
                user={user}
                membershipImage={membership.image}
            />
            <PlusSignAnimation
                plusSigns={plusSigns}
                formattedEnergy={formattedEnergy}
                user={user}
                isSecretFeature={isSecretFeature}
            />
            <EnergyDisplay formattedEnergy={String(formattedEnergy)} maxEnergy={String(maxEnergy)} />
        </React.Fragment>
    );
};

export default MineCoinButton;
