import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { axiosInstance } from "@shared/axios.http";
import { useAppDispatch } from "@shared/redux/store/index";
import { setCategories } from "@shared/redux/store/appSlice";

import { IBaseResponse } from "../_types/base";

import { ICategory } from "../_types/category";

import { queryClient } from "./config";

import CATEGORY_PATHS from "../_path/category-path";


export const useCategories: () => UseMutationResult<IBaseResponse<ICategory[]>, Error, any> = () => {
    const dispatch = useAppDispatch();

    return useMutation<IBaseResponse<ICategory[]>, Error>({
        mutationFn: () =>
            axiosInstance.get<IBaseResponse<ICategory[]>>(CATEGORY_PATHS.GET_ALL),
        onSuccess: async data => {
            if (!data.data) return;
            queryClient.invalidateQueries({ queryKey: ['GET_LIST_CATEGORY', 'CATEGORY'] });
            dispatch(setCategories(data.data));
        },
        onError(error, variables, context) {
            console.log(error);
        },
    });
};