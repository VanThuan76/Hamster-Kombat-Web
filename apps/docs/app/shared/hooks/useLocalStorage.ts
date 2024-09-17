import { useEffect, useState } from "react";

type SetValue<T> = T | ((prevValue: T) => T);

function useLocalStorage<T>(key: string, defaultValue: T): [T, (value: SetValue<T>) => void] {
    // Ràng buộc T phải là string, number hoặc boolean để tương thích với localStorage
    const [value, setValue] = useState<T>(() => {
        try {
            const item = localStorage.getItem(key);
            const itemTime = localStorage.getItem(key + "_time");
            if (item && itemTime && key == "current_energy") {
                const parsedItem = JSON.parse(item);
                const elapsedTime = Date.now() - parseInt(itemTime, 10);
                return updateEnergy(parsedItem, elapsedTime);
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
                const lsiTime = localStorage.getItem(key + "_time");
                if (lsi && lsiTime) {
                    const parsedItem = JSON.parse(lsi);
                    const elapsedTime = Date.now() - parseInt(lsiTime, 10);
                    setValue(updateEnergy(parsedItem, elapsedTime));
                } else {
                    setValue(defaultValue);
                }
            }
        }

        window.addEventListener("storage", handler);

        return () => {
            window.removeEventListener("storage", handler);
        };
    }, [key, defaultValue]);

    const setValueWrap = (value: SetValue<T>) => {
        try {
            setValue(prevValue => {
                const newValue = typeof value === "function" ? (value as (prevValue: T) => T)(prevValue) : value;
                // Kiểm tra loại của newValue và chuyển đổi nó thành string trước khi lưu vào localStorage
                localStorage.setItem(key, JSON.stringify(newValue));
                // Dispatch custom event to notify other windows
                localStorage.setItem(key + "_time", Date.now().toString());
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
    // Assuming item has an energy property and a maxEnergy property
    if (typeof item === 'object' && item !== null && 'energy' in item && 'maxEnergy' in item) {
        const energyRecoveryRate = 0.003; // Energy recovered per millisecond
        const recoveredEnergy = Math.floor(elapsedTime * energyRecoveryRate);
        const newEnergy = Math.min((item as any).energy + recoveredEnergy, (item as any).maxEnergy);
        return { ...item, energy: newEnergy };
    }
    return item;
}

export default useLocalStorage;