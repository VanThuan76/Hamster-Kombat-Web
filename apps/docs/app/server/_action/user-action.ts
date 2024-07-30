import { setCookie } from "cookies-next";
import { useMutation, UseMutationResult } from "@tanstack/react-query";

import { useAppDispatch } from "@shared/redux/store/index";
import { axiosInstance } from "@shared/axios.http";
import { setInitUser } from "@shared/redux/store/appSlice";
import { APP_SAVE_KEY } from "@shared/constant/app";

import { queryClient } from "./config";

import { IBaseResponse } from "../_types/base";
import { IUpdateRevenueByUser, IUser } from "../_types/user";

import USER_PATHS from "../_path/user-path";


const { initHapticFeedback } = require('@telegram-apps/sdk-react');

export const userLoginAction: () => UseMutationResult<IBaseResponse<IUser>, Error, any> = () => {
    const dispatch = useAppDispatch();
    const haptic = initHapticFeedback();

    return useMutation<IBaseResponse<IUser>, Error>({
        mutationFn: (body) =>
            axiosInstance.post<IBaseResponse<IUser>>(USER_PATHS.LOGIN, body),
        onSuccess: async data => {
            if (!data.data) return;
            queryClient.invalidateQueries({ queryKey: ['AUTH_USER', 'USER'] });
            setCookie(APP_SAVE_KEY.TELEGRAM_ID, data.data.telegram_id);
            haptic.notificationOccurred('success');
            const dataCurrentInitUser = {
                ...data.data,
                profit_per_hour: data.data.profitPerHour?.profit_per_hour || 0,
                exchange_id: data.data.profitPerHour?.exchange_id || 0
            }
            dispatch(setInitUser(dataCurrentInitUser));
        },
        onError(error, variables, context) {
            console.log(error);
            return haptic.notificationOccurred('error');
        },
    });
};


export const useUpdateRevenue: () => UseMutationResult<IBaseResponse<IUpdateRevenueByUser>, Error, { user_id: number, amount: number }> = () => {
    const dispatch = useAppDispatch();
    const haptic = initHapticFeedback();

    return useMutation<IBaseResponse<IUpdateRevenueByUser>, Error, { user_id: number, amount: number }>({
        mutationFn: (body: { user_id: number, amount: number }) =>
            axiosInstance.post<IBaseResponse<IUpdateRevenueByUser>>(USER_PATHS.UPDATE_REVENUE_BY_USER, body),
        onSuccess: async data => {
            if (!data.data) return;
            queryClient.invalidateQueries({ queryKey: ['UPDATE_REVENUE', 'USER'] });
            haptic.notificationOccurred('success');
        },
        onError: (error, variables, context) => {
            console.log(error);
            haptic.notificationOccurred('error');
        },
    });
};
