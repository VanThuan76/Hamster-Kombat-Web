import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { axiosInstance } from "@shared/axios.http";

import { IBaseResponse } from "../_types/base";

import { ICategory } from "../_types/category";

import CATEGORY_PATHS from "../_path/category-path";

export const useCategories = () => {
    const fetchCategories = async (): Promise<ICategory[]> => {
        const response = await axiosInstance.get<IBaseResponse<ICategory[]>>(CATEGORY_PATHS.GET_ALL);
        return response.data;
    };

    return useQuery<ICategory[], Error>({
        queryKey: ['GET_LIST_CATEGORY', 'CATEGORY'],
        queryFn: fetchCategories,
    });
};