import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@shared/axios.http";

import { IBaseResponse } from "../_types/base";

import { IOnboard } from "@server/_types/onbroad";

import ONBROAD_PATHS from "@server/_path/onbroad-path";

export const useGetOnbroadScreen = () => {
    const queryFn = async (): Promise<IOnboard[]> => {
        const response = await axiosInstance.get<IBaseResponse<IOnboard[]>>(ONBROAD_PATHS.SCREEN);
        return response.data;
    };

    return useQuery<IOnboard[], Error>({
        queryKey: ['ONBROAD_SCREEN', 'GET_ALL'],
        queryFn: queryFn,
    });
};
