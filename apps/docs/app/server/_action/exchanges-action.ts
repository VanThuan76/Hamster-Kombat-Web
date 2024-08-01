import { useMutation, UseMutationResult, UseQueryResult } from "@tanstack/react-query";
import { axiosInstance } from "@shared/axios.http";
import { useAppDispatch } from "@shared/redux/store/index";
import { setUserExchange, setExchanges } from "@shared/redux/store/appSlice";

import { queryClient } from "./config";

import { IBaseResponse } from "../_types/base";

import { IExchanges, IExchangesOrigin } from "../_types/exchanges";

import EXCHANGES_PATHS from "../_path/exchanges-path";

export const useExchangesByUser: () => UseMutationResult<IBaseResponse<IExchanges>, Error, { user_id: number }> = () => {
    const dispatch = useAppDispatch();
    return useMutation<IBaseResponse<IExchanges>, Error, { user_id: number }>({
        mutationFn: (user_id: { user_id: number }) =>
            axiosInstance.post<IBaseResponse<IExchanges>>(EXCHANGES_PATHS.GET_BY_USER, user_id),
        onSuccess: async data => {
            if (!data.data) return;
            queryClient.invalidateQueries({ queryKey: ['GET_EXCHANGES_USER', 'EXCHANGES'] });
            dispatch(setUserExchange({ id: data.data.exchange_id, name: data.data.name, icon: process.env.NEXT_PUBLIC_DOMAIN_BACKEND + '/' + data.data.image }));
        },
        onError(error, variables, context) {
            console.log(error);
        },
    });
};

export const useUpdateExchange: () => UseMutationResult<IBaseResponse<IExchanges>, Error, { user_id: number, exchange_id: number }> = () => {
    
    return useMutation<IBaseResponse<IExchanges>, Error, { user_id: number, exchange_id: number }>({
        mutationFn: (body: { user_id: number, exchange_id: number }) =>
            axiosInstance.post<IBaseResponse<IExchanges>>(EXCHANGES_PATHS.UPDATE, body),
        onSuccess: async data => {
            if (!data.data) return;
            queryClient.invalidateQueries({ queryKey: ['UPDATE', 'EXCHANGES'] });
        },
        onError: (error, variables, context) => {
            console.log(error);
        },
    });
};

export const useExchanges: () => UseMutationResult<IBaseResponse<IExchangesOrigin[]>, Error, any> = () => {
    const dispatch = useAppDispatch();

    return useMutation<IBaseResponse<IExchangesOrigin[]>, Error>({
        mutationFn: () =>
            axiosInstance.get<IBaseResponse<IExchangesOrigin[]>>(EXCHANGES_PATHS.GET_ALL),
        onSuccess: async data => {
            if (!data.data) return;
            queryClient.invalidateQueries({ queryKey: ['GET_LIST_EXCHANGES', 'EXCHANGES'] });
            dispatch(setExchanges(data.data.map(item => ({...item, image_url: process.env.NEXT_PUBLIC_DOMAIN_BACKEND + '/' + item.image}))));
        },
        onError(error, variables, context) {
            console.log(error);
        },
    });
};