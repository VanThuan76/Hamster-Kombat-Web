import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { axiosInstance } from "@shared/axios.http";

import { IBaseResponse } from "../_types/base";

import { ICategory } from "../_types/category";

import CATEGORY_PATHS from "../_path/category-path";

export const categoryGetAllAction: () => UseQueryResult<ICategory[], Error> = () => {
    return useQuery<IBaseResponse<ICategory[]>, Error, ICategory[]>({
        queryKey: ['GET_LIST_CATEGORY'],
        queryFn: () => axiosInstance.get<IBaseResponse<ICategory[]>>(CATEGORY_PATHS.GET_ALL),
        select(data) {
            return data.data;
        },
    });
};

