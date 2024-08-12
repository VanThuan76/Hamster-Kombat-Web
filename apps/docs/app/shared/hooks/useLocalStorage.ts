import { useEffect, useState } from "react";

type SetValue<T> = T | ((prevValue: T) => T);

function useLocalStorage<T>(key: string, defaultValue: T): [T, (value: SetValue<T>) => void] {
    // Ràng buộc T phải là string, number hoặc boolean để tương thích với localStorage
    const [value, setValue] = useState<T>(() => {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : defaultValue;
        } catch (error) {
            console.error('Error reading localStorage key “' + key + '”:', error);
            return defaultValue;
        }
    });

    useEffect(() => {
        function handler(e: StorageEvent) {
            if (e.key === key) {
                const lsi = localStorage.getItem(key);
                setValue(lsi ? JSON.parse(lsi) : defaultValue);
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

export default useLocalStorage;
