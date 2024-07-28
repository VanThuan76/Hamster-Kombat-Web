import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { axiosInstance } from "@shared/axios.http";

import { IBaseResponse } from "../_types/base";

import { IGetProfitPerHourByUser } from "../_types/coin";

import COIN_PATHS from "../_path/coin-path";

export const useGetProfitPerHourByUser = () => {
    const fetchGetProfitPerHourByUser = async (): Promise<IGetProfitPerHourByUser[]> => {
        const response = await axiosInstance.get<IBaseResponse<IGetProfitPerHourByUser[]>>(COIN_PATHS.GET_PROFIT_PER_HOUR_BY_USER);
        return response.data;
    };

    return useQuery<IGetProfitPerHourByUser[], Error>({
        queryKey: ['GET_PROFIT_PER_HOUR_BY_USER', 'COIN'],
        queryFn: fetchGetProfitPerHourByUser,
    });
};