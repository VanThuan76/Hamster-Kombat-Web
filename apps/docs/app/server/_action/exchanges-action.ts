import { useMutation, UseMutationResult, UseQueryResult } from "@tanstack/react-query";
import { axiosInstance } from "@shared/axios.http";
import { useAppDispatch } from "@shared/redux/store/index";
import { setExchange } from "@shared/redux/store/appSlice";

import { queryClient } from "./config";

import { IBaseResponse } from "../_types/base";

import { IExchanges } from "../_types/exchanges";

import EXCHANGES_PATHS from "../_path/exchanges-path";

export const useExchangesByUser: () => UseMutationResult<IBaseResponse<IExchanges>, Error, { user_id: number }> = () => {
    const dispatch = useAppDispatch();
    return useMutation<IBaseResponse<IExchanges>, Error, { user_id: number }>({
        mutationFn: (user_id: { user_id: number }) =>
            axiosInstance.post<IBaseResponse<IExchanges>>(EXCHANGES_PATHS.GET_BY_USER, user_id),
        onSuccess: async data => {
            if (!data.data) return;
            queryClient.invalidateQueries({ queryKey: ['GET_MEMBERSHIP_USER', 'MEMBERSHIP'] });
            dispatch(setExchange(data.data));
        },
        onError(error, variables, context) {
            console.log(error);
        },
    });
};
