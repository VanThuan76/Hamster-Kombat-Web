import { useEffect, useRef, useState } from "react";

import { useAppDispatch, useAppSelector } from "@shared/redux/store/index";
import { setIsProfitRevenueActive, setUpdateRevenue } from "@shared/redux/store/appSlice";
import useLocalStorage from "./useLocalStorage";

const useProfitByHour = () => {
    const { user } = useAppSelector(state => state.app);
    const dispatch = useAppDispatch();

    const lastUpdateRef = useRef(Date.now()); // Sử dụng useRef để theo dõi lastUpdate
    const intervalIdRef = useRef<NodeJS.Timeout | null>(null); // Sử dụng useRef để lưu intervalId

    // Sử dụng hook useLocalStorage để lưu trữ giá trị doanh thu
    const [profit, setProfit] = useLocalStorage<number>('profit_revenue', 0);

    useEffect(() => {
        if (profit > 0) {
            dispatch(setIsProfitRevenueActive(true))
        } else {
            lastUpdateRef.current = Date.now();
            dispatch(setIsProfitRevenueActive(false))
        }
    }, [])

    useEffect(() => {
        if (user.profit_per_hour > 0) {
            const profitPerSecond = user.profit_per_hour / 3600;
            const minimumIncrement = 1; // Ngưỡng tối thiểu để cập nhật doanh thu

            // Cập nhật doanh thu mỗi giây
            const id = setInterval(() => {
                const currentTime = Date.now();
                const secondsPassed = (currentTime - lastUpdateRef.current) / 1000;
                const revenueIncrement = profitPerSecond * secondsPassed;

                // Chỉ cập nhật doanh thu nếu revenueIncrement lớn hơn minimumIncrement
                if (revenueIncrement >= minimumIncrement) {
                    // Cập nhật giá trị lưu trữ
                    setProfit(prevProfit => {
                        const newProfit = Math.round(prevProfit + revenueIncrement);
                        dispatch(setUpdateRevenue(user.revenue + Math.round(revenueIncrement)));
                        return newProfit;
                    });
                }

                lastUpdateRef.current = currentTime;
            }, 1000);

            intervalIdRef.current = id;
        }

        return () => {
            if (intervalIdRef.current) clearInterval(intervalIdRef.current);
        };
    }, [user.profit_per_hour, dispatch, user.revenue, setProfit]);

    return null;
};

export default useProfitByHour;
