import { useMutation, UseMutationResult, UseQueryResult } from "@tanstack/react-query";
import { toast } from "@shared/hooks/useToast";
import { axiosInstance } from "@shared/axios.http";
import { useAppDispatch, useAppSelector } from "@shared/redux/store/index";
import { setMembership, setUpdateBoost, setUpdateRevenue } from "@shared/redux/store/appSlice";

import { queryClient } from "./config";

import { IBaseResponse } from "../_types/base";

import { IResponseUpdateBoost, IUpdateBoost } from "../_types/boost";

import BOOST_PATHS from "../_path/boost-path";

const { useHapticFeedback } = require('@telegram-apps/sdk-react');

export const useUpdateBoost: () => UseMutationResult<IBaseResponse<IResponseUpdateBoost>, Error, IUpdateBoost> = () => {
    const { membership } = useAppSelector(state => state.app)

    const dispatch = useAppDispatch();
    const haptics = useHapticFeedback();

    return useMutation<IBaseResponse<IResponseUpdateBoost>, Error, IUpdateBoost>({
        mutationFn: (body: IUpdateBoost) =>
            axiosInstance.post<IBaseResponse<IResponseUpdateBoost>>(BOOST_PATHS.UPDATE_BY_USER, body),
        onMutate: () => {
            toast({
                variant: 'default',
                title: 'Đang xử lý dữ liệu...',
            });
        },
        onSuccess: async data => {
            if (!data.data) return;
            queryClient.invalidateQueries({ queryKey: ['UPDATE_BOOST', 'BOOST'] });
            dispatch(setUpdateBoost({boots: data.data.boots, tap_value: data.data.user.tap_value}));
            dispatch(setUpdateRevenue(data.data.user.revenue))

            const membershipData = {
                ...membership,
                name: data.data.membership[0]?.name,
                image: process.env.NEXT_PUBLIC_DOMAIN_BACKEND + '/' + data.data.membership[0]?.image,
                money: data.data.membership[0]?.money,
                level: data.data.membership[0]?.level,
                short_money: data.data.membership[0]?.short_money
            }

            dispatch(setMembership(membershipData)) //Fix

            toast({
                variant: 'success',
                title: `Upgrade is yours! Cointelegraph 2 lvl`,
            });
            haptics.notificationOccurred('success');
        },
        onError(error, variables, context) {
            console.log(error);
            return haptics.notificationOccurred('error');
        },
    });
};