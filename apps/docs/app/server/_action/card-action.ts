import { useMutation, UseMutationResult, UseQueryResult } from "@tanstack/react-query";
import { axiosInstance } from "@shared/axios.http";

import { queryClient } from "./config";

import { IBaseResponse } from "../_types/base";

import { IBuyCard, ICard, ICardByUserAndCategory } from "../_types/card";

import CARD_PATHS from "../_path/card-path";

const { initHapticFeedback } = require('@telegram-apps/sdk-react');

export const useCardByCategory: () => UseMutationResult<IBaseResponse<ICard[]>, Error, { category_id: number }> = () => {

    return useMutation<IBaseResponse<ICard[]>, Error, { category_id: number }>({
        mutationFn: (category_id: { category_id: number }) =>
            axiosInstance.post<IBaseResponse<ICard[]>>(CARD_PATHS.GET_CARD_BY_CATEGORY, category_id),
        onSuccess: async data => {
            if (!data.data) return;
            queryClient.invalidateQueries({ queryKey: ['GET_CARD_CATEGORY', 'CARD'] });
            return data.data
        },
        onError(error, variables, context) {
            console.log(error);
        },
    });
};

export const useCardByUserAndCategory: () => UseMutationResult<IBaseResponse<ICardByUserAndCategory[]>, Error, { user_id: number, category_id: number, exchange_id: number }> = () => {

    return useMutation<IBaseResponse<ICardByUserAndCategory[]>, Error, { user_id: number, category_id: number, exchange_id: number }>({
        mutationFn: (body: { user_id: number, category_id: number, exchange_id: number }) =>
            axiosInstance.post<IBaseResponse<ICardByUserAndCategory[]>>(CARD_PATHS.GET_CARD_BY_USER_CATEGORY, body),
        onSuccess: async data => {
            if (!data.data) return;
            queryClient.invalidateQueries({ queryKey: ['GET_CARD_USER_CATEGORY', 'CARD'] });
            return data.data
        },
        onError(error, variables, context) {
            console.log(error);
        },
    });
};

export const useBuyCard: () => UseMutationResult<IBaseResponse<any>, Error, IBuyCard> = () => {
    const haptic = initHapticFeedback();

    return useMutation<IBaseResponse<any>, Error, IBuyCard>({
        mutationFn: (body: IBuyCard) =>
            axiosInstance.post<IBaseResponse<any>>(CARD_PATHS.BUY_CARD, body),
        onSuccess: async data => {
            if (!data.data) return;
            queryClient.invalidateQueries({ queryKey: ['BUY_CARD', 'CARD'] });
            haptic.notificationOccurred('success');
        },
        onError(error, variables, context) {
            console.log(error);
            return haptic.notificationOccurred('error');
        },
    });
};