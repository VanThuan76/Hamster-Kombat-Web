import { useMutation, UseMutationResult, UseQueryResult } from "@tanstack/react-query";
import { toast } from "@shared/hooks/useToast";
import { axiosInstance } from "@shared/axios.http";
import { useAppDispatch } from "@shared/redux/store/index";
import { setEarns } from "@shared/redux/store/appSlice";

import { queryClient } from "./config";

import { IBaseResponse } from "../_types/base";

import { IEarn, IUpdateEarn } from "../_types/earn";

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

export const useUpdateEarn: () => UseMutationResult<IBaseResponse<any[]>, Error, IUpdateEarn> = () => {
    const dispatch = useAppDispatch();
    const haptics = useHapticFeedback();

    return useMutation<IBaseResponse<any[]>, Error, IUpdateEarn>({
        mutationFn: (body: IUpdateEarn) =>
            axiosInstance.post<IBaseResponse<any[]>>(EARN_PATHS.UPDATE_BY_USER, body),
        onMutate: () => {
            toast({
                variant: 'default',
                title: 'Đang xử lý dữ liệu...',
            });
        },
        onSuccess: async data => {
            if (!data.data) return;
            queryClient.invalidateQueries({ queryKey: ['UPDATE_EARN', 'EARN'] });
            haptics.notificationOccurred('success');
            toast({
                variant: 'success',
                title: `Upgrade is yours! Cointelegraph 2 lvl`,
            });
            dispatch(setEarns(data.data));
        },
        onError(error, variables, context) {
            console.log(error);
            return haptics.notificationOccurred('error');
        },
    });
};
