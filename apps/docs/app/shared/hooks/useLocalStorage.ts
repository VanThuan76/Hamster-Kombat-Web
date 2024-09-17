import { useEffect, useState } from "react";
import { useAppSelector } from "@shared/redux/store/index";

type SetValue<T> = T | ((prevValue: T) => T);

function useLocalStorage<T>(key: string, defaultValue: T): [T, (value: SetValue<T>) => void] {
    const { user } = useAppSelector((state) => state.app);

    const [value, setValue] = useState<T>(() => {
        try {
            const item = localStorage.getItem(key);
            const itemTime = localStorage.getItem(key + "_timestamp");
            if (item && itemTime) {
                const parsedItem = JSON.parse(item);
                const elapsedTime = Date.now() - parseInt(itemTime, 10);
                if (key === "current_energy") {
                    return updateEnergy(parsedItem, elapsedTime);
                } else if (key === "current_money") {
                    return updateMoney(parsedItem, elapsedTime, user.profit_per_hour);
                }
                return parsedItem;
            }
            return defaultValue;
        } catch (error) {
            console.error('Error reading localStorage key “' + key + '”:', error);
            return defaultValue;
        }
    });

    useEffect(() => {
        function handler(e: StorageEvent) {
            if (e.key === key) {
                const lsi = localStorage.getItem(key);
                const lsiTime = localStorage.getItem(key + "_timestamp");
                if (lsi && lsiTime) {
                    const parsedItem = JSON.parse(lsi);
                    const elapsedTime = Date.now() - parseInt(lsiTime, 10);
                    if (key === "current_energy") {
                        setValue(updateEnergy(parsedItem, elapsedTime));
                    } else if (key === "current_money") {
                        setValue(updateMoney(parsedItem, elapsedTime, user.profit_per_hour));
                    } else {
                        setValue(parsedItem);
                    }
                } else {
                    setValue(defaultValue);
                }
            }
        }

        window.addEventListener("storage", handler);

        return () => {
            window.removeEventListener("storage", handler);
        };
    }, [key, defaultValue, user.profit_per_hour]);

    const setValueWrap = (value: SetValue<T>) => {
        try {
            setValue(prevValue => {
                const newValue = typeof value === "function" ? (value as (prevValue: T) => T)(prevValue) : value;
                localStorage.setItem(key, JSON.stringify(newValue));
                localStorage.setItem(key + "_timestamp", Date.now().toString());
                const event = new StorageEvent("storage", { key, newValue: JSON.stringify(newValue) });
                window.dispatchEvent(event);
                return newValue;
            });
        } catch (e) {
            console.error('Error setting localStorage key “' + key + '”:', e);
        }
    };

    return [value, setValueWrap];
}

function updateEnergy<T>(item: T, elapsedTime: number): T {
    if (typeof item === 'object' && item !== null && 'energy' in item && 'maxEnergy' in item) {
        const energyRecoveryRate = 3 / 1000; // Energy recovered per millisecond (3 per second)
        const recoveredEnergy = Math.floor(elapsedTime * energyRecoveryRate);
        const newEnergy = Math.min((item as any).energy + recoveredEnergy, (item as any).maxEnergy);
        return { ...item, energy: newEnergy };
    }
    return item;
}

function updateMoney<T>(item: T, elapsedTime: number, profitPerHour: number): T {
    if (typeof item === 'object' && item !== null && 'money' in item) {
        const hoursElapsed = Math.min(elapsedTime / (1000 * 60 * 60), 3); // Convert milliseconds to hours and cap at 3 hours
        const profitRevenue = profitPerHour * hoursElapsed;
        const newMoney = (item as any).money + profitRevenue; // Increase money by profitRevenue
        return { ...item, money: newMoney };
    }
    return item;
}

export default useLocalStorage;