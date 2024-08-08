import { useMutation, UseMutationResult, UseQueryResult } from "@tanstack/react-query";
import { toast } from "@shared/hooks/useToast";
import { axiosInstance } from "@shared/axios.http";
import { useAppDispatch, useAppSelector } from "@shared/redux/store/index";
import { setEarns, setMembership, setUpdateRevenue } from "@shared/redux/store/appSlice";

import { queryClient } from "./config";

import { IBaseResponse } from "../_types/base";

import { IEarn, IResponseUpdateEarn, IUpdateEarn } from "../_types/earn";

import EARN_PATHS from "../_path/earn-path";

const { useHapticFeedback } = require('@telegram-apps/sdk-react');

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

            const membershipData = {
                ...membership,
                name: data.data.membership[0]?.name,
                image: process.env.NEXT_PUBLIC_DOMAIN_BACKEND + '/' + data.data.membership[0]?.image,
                money: data.data.membership[0]?.money,
                level: data.data.membership[0]?.level,
                short_money: data.data.membership[0]?.short_money
            }

            dispatch(setMembership(membershipData)) //Fix

            toast({
                variant: 'success',
                title: `Upgrade is yours! Cointelegraph 2 lvl`,
            });
            haptics.notificationOccurred('success');
        },
        onError(error, variables, context) {
            console.log(error);
            return haptics.notificationOccurred('error');
        },
    });
};
