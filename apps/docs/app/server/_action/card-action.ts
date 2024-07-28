import { useMutation, UseMutationResult, UseQueryResult } from "@tanstack/react-query";
import { axiosInstance } from "@shared/axios.http";

import { queryClient } from "./config";

import { IBaseResponse } from "../_types/base";

import { ICard } from "../_types/card";

import CARD_PATHS from "../_path/card-path";

export const useCardByCategory: () => UseMutationResult<IBaseResponse<ICard[]>, Error, { category_id: number }> = () => {

    return useMutation<IBaseResponse<ICard[]>, Error, { category_id: number }>({
        mutationFn: (category_id: { category_id: number }) =>
            axiosInstance.post<IBaseResponse<ICard[]>>(CARD_PATHS.GET_CARD_BY_CATEGORY, category_id),
        onSuccess: async data => {
            if (!data.data) return;
            queryClient.invalidateQueries({ queryKey: ['GET_MEMBERSHIP_USER', 'MEMBERSHIP'] });
            return data.data
        },
        onError(error, variables, context) {
            console.log(error);
        },
    });
};