import { useMutation, UseMutationResult, UseQueryResult } from "@tanstack/react-query";
import { axiosInstance } from "@shared/axios.http";
import { useAppDispatch } from "@shared/redux/store";
import { setSkins } from "@shared/redux/store/appSlice";

import { queryClient } from "./config";

import { IBaseResponse } from "../_types/base";

import { ISkin } from "../_types/skin";

import SKIN_PATHS from "../_path/skin-path";

export const useSkins: () => UseMutationResult<IBaseResponse<ISkin[]>, Error, any> = () => {
    const dispatch = useAppDispatch();

    return useMutation<IBaseResponse<ISkin[]>, Error>({
        mutationFn: () =>
            axiosInstance.get<IBaseResponse<ISkin[]>>(SKIN_PATHS.GET_ALL),
        onSuccess: async data => {
            if (!data.data) return;
            queryClient.invalidateQueries({ queryKey: ['GET_LIST_SKINS', 'SKINS'] });
            dispatch(setSkins(data.data));
        },
        onError(error, variables, context) {
            console.log(error);
        },
    });
};