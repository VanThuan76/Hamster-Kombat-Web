import { setCookie } from "cookies-next";
import { useMutation, UseMutationResult } from "@tanstack/react-query";

import useLocalStorage from "@shared/hooks/useLocalStorage";
import { useAppDispatch } from "@shared/redux/store/index";
import { axiosInstance } from "@shared/axios.http";
import { setFriends, setInitUser, setRanks, setStateEnergy, setUpdateRevenue } from "@shared/redux/store/appSlice";
import { APP_SAVE_KEY } from "@shared/constant/app";

import { queryClient } from "./config";

import { IBaseResponse } from "../_types/base";
import { IFriendUser, IRankUsers, IUpdateRevenueByUser, IUpdateSkinByUser, IUser } from "../_types/user";

import USER_PATHS from "../_path/user-path";


const { initHapticFeedback } = require('@telegram-apps/sdk-react');

export const userLoginAction: () => UseMutationResult<IBaseResponse<IUser>, Error, any> = () => {
    const dispatch = useAppDispatch();
    const haptic = initHapticFeedback();

    const [energy, setEnergy] = useLocalStorage<number>('current_energy', 1000);
    const [profit, setProfit] = useLocalStorage<number>('profit_revenue', 0);

    return useMutation<IBaseResponse<IUser>, Error>({
        mutationFn: (body) =>
            axiosInstance.post<IBaseResponse<IUser>>(USER_PATHS.LOGIN, body),
        onSuccess: async data => {
            if (!data.data) return;
            queryClient.invalidateQueries({ queryKey: ['AUTH_USER', 'USER'] });
            setCookie(APP_SAVE_KEY.TELEGRAM_ID, data.data.telegram_id);
            haptic.notificationOccurred('success');
            if (data.data.revenue === 0) {
                setEnergy(1000);
                setProfit(0);
            }
            const dataCurrentInitUser = {
                ...data.data,
                tap_value: data.data?.tap_value || 1,
                energy_limit: data.data?.energy_limit || 1000, //Fixed
                profit_per_hour: data.data.profitPerHour?.profit_per_hour || 0, //Fixed
            }
            dispatch(setInitUser(dataCurrentInitUser));
            dispatch(setStateEnergy({ amount: data.data?.energy_limit || 1000, isReset: false })) //Fixed
        },
        onError(error, variables, context) {
            console.log(error);
            return haptic.notificationOccurred('error');
        },
    });
};

export const useRankUsers: () => UseMutationResult<IBaseResponse<IRankUsers[]>, Error, { user_id: number }> = () => {
    const dispatch = useAppDispatch();

    return useMutation<IBaseResponse<IRankUsers[]>, Error, { user_id: number }>({
        mutationFn: (user_id: { user_id: number }) =>
            axiosInstance.post<IBaseResponse<IRankUsers[]>>(USER_PATHS.RANK, user_id),
        onSuccess: async data => {
            if (!data.data) return;
            queryClient.invalidateQueries({ queryKey: ['GET_LIST_RANK_USERS', 'USERS'] });
            dispatch(setRanks(data.data.map(item => ({ ...item, image: process.env.NEXT_PUBLIC_DOMAIN_BACKEND + '/' + item.image }))));
        },
        onError(error, variables, context) {
            console.log(error);
        },
    });
};

export const useUpdateRevenue: () => UseMutationResult<IBaseResponse<IUpdateRevenueByUser>, Error, { user_id: number, amount: number }> = () => {
    const dispatch = useAppDispatch();

    return useMutation<IBaseResponse<IUpdateRevenueByUser>, Error, { user_id: number, amount: number }>({
        mutationFn: (body: { user_id: number, amount: number }) =>
            axiosInstance.post<IBaseResponse<IUpdateRevenueByUser>>(USER_PATHS.UPDATE_REVENUE_BY_USER, body),
        onSuccess: async data => {
            if (!data.data) return;
            queryClient.invalidateQueries({ queryKey: ['UPDATE_REVENUE', 'USER'] });
            dispatch(setUpdateRevenue(data.data.revenue))
        },
        onError: (error, variables, context) => {
            console.log(error);
        },
    });
};

export const useUpdateSkin: () => UseMutationResult<IBaseResponse<IUpdateSkinByUser>, Error, { user_id: number, skin_id: number }> = () => {
    const dispatch = useAppDispatch();

    return useMutation<IBaseResponse<IUpdateSkinByUser>, Error, { user_id: number, skin_id: number }>({
        mutationFn: (body: { user_id: number, skin_id: number }) =>
            axiosInstance.post<IBaseResponse<IUpdateSkinByUser>>(USER_PATHS.UPDATE_SKIN_BY_USER, body),
        onSuccess: async data => {
            if (!data.data) return;
            queryClient.invalidateQueries({ queryKey: ['UPDATE_SKIN', 'USER'] });
        },
        onError: (error, variables, context) => {
            console.log(error);
        },
    });
};

export const useFriends: () => UseMutationResult<IBaseResponse<IFriendUser>, Error, { id: number }> = () => {
    const dispatch = useAppDispatch();

    return useMutation<IBaseResponse<IFriendUser>, Error, { id: number }>({
        mutationFn: ({ id }) =>
            axiosInstance.get<IBaseResponse<IFriendUser>>(`${USER_PATHS.FRIENDS}/${id}`),
        onSuccess: async data => {
            if (!data.data) return;
            queryClient.invalidateQueries({ queryKey: ['GET_LIST_FRIENDS', 'USER'] });
            dispatch(setFriends(data.data.userFriends));
        },
        onError(error, variables, context) {
            console.log(error);
        },
    });
};
