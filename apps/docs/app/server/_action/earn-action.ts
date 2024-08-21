import { useMutation, UseMutationResult, UseQueryResult } from "@tanstack/react-query";
import { toast } from "@shared/hooks/useToast";
import { axiosInstance } from "@shared/axios.http";
import { useAppDispatch, useAppSelector } from "@shared/redux/store/index";
import { setEarns, setHighestScore, setMembership, setUpdateProfitPerHour, setUpdateRevenue } from "@shared/redux/store/appSlice";

import { queryClient } from "./config";

import { IBaseResponse } from "../_types/base";

import { IEarn, IResponseUpdateEarn, IUpdateEarn } from "../_types/earn";

import EARN_PATHS from "../_path/earn-path";

const { useHapticFeedback, initHapticFeedback } = require('@telegram-apps/sdk-react');

export const useEarnByUser: () => UseMutationResult<IBaseResponse<IEarn[]>, Error, { user_id: number }> = () => {
    const dispatch = useAppDispatch();
    return useMutation<IBaseResponse<IEarn[]>, Error, { user_id: number }>({
        mutationFn: (user_id: { user_id: number }) =>
            axiosInstance.post<IBaseResponse<IEarn[]>>(EARN_PATHS.GET_BY_USER, user_id),
        onSuccess: async data => {
            if (!data.data) return;
            queryClient.invalidateQueries({ queryKey: ['GET_EARN_USER', 'EARN'] });
            dispatch(setEarns(data.data));
        },
        onError(error, variables, context) {
            console.log(error);
        },
    });
};

export const useUpdateEarn: () => UseMutationResult<IBaseResponse<IResponseUpdateEarn>, Error, IUpdateEarn> = () => {
    const { membership } = useAppSelector(state => state.app)

    const dispatch = useAppDispatch();
    const haptics = useHapticFeedback();
    const haptic = initHapticFeedback();

    return useMutation<IBaseResponse<IResponseUpdateEarn>, Error, IUpdateEarn>({
        mutationFn: (body: IUpdateEarn) =>
            axiosInstance.post<IBaseResponse<IResponseUpdateEarn>>(EARN_PATHS.UPDATE_BY_USER, body),
        onMutate: () => {
            toast({
                variant: 'default',
                title: 'Đang xử lý dữ liệu...',
            });
        },
        onSuccess: async data => {
            if (!data.data) return;
            queryClient.invalidateQueries({ queryKey: ['UPDATE_EARN', 'EARN'] });
            dispatch(setEarns(data.data.earns));
            dispatch(setUpdateRevenue(data.data.user.revenue))
            dispatch(setUpdateProfitPerHour(data.data.profitPerHour.profit_per_hour))
            dispatch(setHighestScore(data.data.user.highest_score))

            const membershipData = {
                ...membership,
                name: data.data.membership.membership?.name,
                money: data.data.membership.membership?.money,
                level: data.data.membership.membership?.level,
                short_money: data.data.membership.membership?.short_money
            }
            dispatch(setMembership(membershipData)) //Fix

            toast({
                variant: 'success',
                title: `Upgrade is yours! Cointelegraph +1 lvl`,
            });
            haptics.notificationOccurred('success');
            haptic.impactOccurred('soft')
        },
        onError(error, variables, context) {
            console.log(error);
            return haptics.notificationOccurred('error');
        },
    });
};
