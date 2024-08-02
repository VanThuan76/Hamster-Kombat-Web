import { useMutation, UseMutationResult, UseQueryResult } from "@tanstack/react-query";
import { toast } from "@shared/hooks/useToast";
import { axiosInstance } from "@shared/axios.http";
import { useAppDispatch } from "@shared/redux/store";
import { setCategoryOfCards, setUpdateProfitPerHour, setUpdateRevenue } from "@shared/redux/store/appSlice";

import { queryClient } from "./config";

import { IBaseResponse } from "../_types/base";

import { IBuyCard, ICategoryOfCard } from "../_types/card";

import CARD_PATHS from "../_path/card-path";

const { useHapticFeedback } = require('@telegram-apps/sdk-react');

export const useBuyCard: () => UseMutationResult<IBaseResponse<any[]>, Error, IBuyCard> = () => {
    const dispatch = useAppDispatch();
    const haptics = useHapticFeedback();

    return useMutation<IBaseResponse<any[]>, Error, IBuyCard>({
        mutationFn: (body: IBuyCard) =>
            axiosInstance.post<IBaseResponse<any[]>>(CARD_PATHS.BUY_CARD, body),
        onMutate: () => {
            toast({
                variant: 'default',
                title: 'Đang xử lý dữ liệu...',
            });
        },
        onSuccess: async data => {
            if (!data.data) return;
            queryClient.invalidateQueries({ queryKey: ['BUY_CARD', 'CARD'] });
            haptics.notificationOccurred('success');
            dispatch(setCategoryOfCards(data.data[0])); //Fix
            dispatch(setUpdateRevenue(data.data[1].revenue)) //Fix
            dispatch(setUpdateProfitPerHour(data.data[1].profitPerHour.profit_per_hour)) //Fix
            toast({
                variant: 'success',
                title: `Upgrade is yours! Cointelegraph 2 lvl`,
            });
        },
        onError(error, variables, context) {
            console.log(error);
            return haptics.notificationOccurred('error');
        },
    });
};

export const useCategoryOfCardByUser: () => UseMutationResult<IBaseResponse<ICategoryOfCard[]>, Error, { user_id: number, exchange_id: number }> = () => {
    const dispatch = useAppDispatch();

    return useMutation<IBaseResponse<ICategoryOfCard[]>, Error, { user_id: number, exchange_id: number }>({
        mutationFn: (body: { user_id: number, exchange_id: number }) =>
            axiosInstance.post<IBaseResponse<ICategoryOfCard[]>>(CARD_PATHS.GET_ALL, body),
        onSuccess: async data => {
            if (!data.data) return;
            queryClient.invalidateQueries({ queryKey: ['GET_LIST_CATEGORY_OF_CARD', 'CARD'] });
            dispatch(setCategoryOfCards(data.data));
        },
        onError(error, variables, context) {
            console.log(error);
        },
    });
};