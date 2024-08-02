import { useMutation, UseMutationResult, UseQueryResult } from "@tanstack/react-query";
import { axiosInstance } from "@shared/axios.http";
import { useAppDispatch } from "@shared/redux/store";
import { setCategoryOfCards } from "@shared/redux/store/appSlice";

import { queryClient } from "./config";

import { IBaseResponse } from "../_types/base";

import { IBuyCard, ICategoryOfCard } from "../_types/card";

import CARD_PATHS from "../_path/card-path";

const { useHapticFeedback } = require('@telegram-apps/sdk-react');

export const useBuyCard: () => UseMutationResult<IBaseResponse<ICategoryOfCard[]>, Error, IBuyCard> = () => {
    const dispatch = useAppDispatch();
    const haptics = useHapticFeedback();

    return useMutation<IBaseResponse<ICategoryOfCard[]>, Error, IBuyCard>({
        mutationFn: (body: IBuyCard) =>
            axiosInstance.post<IBaseResponse<ICategoryOfCard[]>>(CARD_PATHS.BUY_CARD, body),
        onSuccess: async data => {
            if (!data.data) return;
            queryClient.invalidateQueries({ queryKey: ['BUY_CARD', 'CARD'] });
            haptics.notificationOccurred('success');
            dispatch(setCategoryOfCards(data.data));
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