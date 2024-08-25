import { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "@shared/redux/store/index";
import {
  setIsProfitRevenueActive,
  setUpdateRevenue,
} from "@shared/redux/store/appSlice";
import useLocalStorage from "./useLocalStorage";
import { useUpdateRevenue } from "@server/_action/user-action";

const useProfitByHour = () => {
  const { user } = useAppSelector((state) => state.app);
  const dispatch = useAppDispatch();

  const lastUpdateRef = useRef(Date.now()); // Sử dụng useRef để theo dõi lastUpdate
  const intervalIdRef = useRef<NodeJS.Timeout | null>(null); // Sử dụng useRef để lưu intervalId

  const [profit, setProfit] = useLocalStorage<number>("profit_revenue", 0);
  const [profitTime, setProfitTime] = useLocalStorage<number>(
    "profit_revenue_time",
    0,
  );

  const updateRevenue = useUpdateRevenue();

  useEffect(() => {
    // Thiết lập trạng thái active dựa trên profit
    if (profit > 0) {
      dispatch(setIsProfitRevenueActive(true));
    } else {
      lastUpdateRef.current = Date.now();
      dispatch(setIsProfitRevenueActive(false));
    }
  }, []);

  useEffect(() => {
    const profitPerSecond = user.profit_per_hour / 3600;
    let profitTemp = profit; // Biến tạm để lưu giá trị hiện tại của profit

    // Cài đặt interval để cập nhật doanh thu mỗi giây
    const id = setInterval(() => {
      const currentRevenue = user.revenue + profitPerSecond;

      // Cập nhật revenue thông qua dispatch
      dispatch(setUpdateRevenue(currentRevenue));

      // Cộng dồn giá trị profit
      profitTemp += profitPerSecond;

      // Sử dụng setProfit để cập nhật giá trị không làm tròn để lưu chính xác
      setProfit(profitTemp);

      // Tăng queryTime
      setProfitTime((prev) => prev + 1);

      if (profitTime > 180) {
        dispatch(setUpdateRevenue(user.revenue + Math.round(profit))); // Fix
        updateRevenue.mutate({
          user_id: user.id,
          amount: Math.round(profit),
        });
        setProfitTime(0);
        setProfit(0);
      }
    }, 1000);

    intervalIdRef.current = id;

    return () => {
      if (intervalIdRef.current) clearInterval(intervalIdRef.current);
    };
  }, [user.profit_per_hour, user.revenue, profit]);

  return null;
};

export default useProfitByHour;
