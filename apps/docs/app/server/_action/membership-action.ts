import { useMutation, UseMutationResult, UseQueryResult } from "@tanstack/react-query";
import { axiosInstance } from "@shared/axios.http";
import { useAppDispatch } from "@shared/redux/store/index";
import { setMembership, setMemberships } from "@shared/redux/store/appSlice";

import { queryClient } from "./config";

import { IBaseResponse } from "../_types/base";

import { IMembership, IUserMembership } from "../_types/membership";

import MEMBERSHIP_PATHS from "../_path/membership-path";

export const useMemberships: () => UseMutationResult<IBaseResponse<IMembership[]>, Error, any> = () => {
    const dispatch = useAppDispatch();

    return useMutation<IBaseResponse<IMembership[]>, Error>({
        mutationFn: () =>
            axiosInstance.get<IBaseResponse<IMembership[]>>(MEMBERSHIP_PATHS.GET_ALL),
        onSuccess: async data => {
            if (!data.data) return;
            queryClient.invalidateQueries({ queryKey: ['GET_LIST_MEMBERSHIP', 'MEMBERSHIP'] });
            dispatch(setMemberships(data.data.map(item => ({ ...item, image: process.env.NEXT_PUBLIC_DOMAIN_BACKEND + '/' + item.image }))));
        },
        onError(error, variables, context) {
            console.log(error);
        },
    });
};


export const useMembershipByUser: () => UseMutationResult<IBaseResponse<IUserMembership>, Error, { user_id: number }> = () => {
    const dispatch = useAppDispatch();
    return useMutation<IBaseResponse<IUserMembership>, Error, { user_id: number }>({
        mutationFn: (user_id: { user_id: number }) =>
            axiosInstance.post<IBaseResponse<IUserMembership>>(MEMBERSHIP_PATHS.GET_BY_USER, user_id),
        onSuccess: async data => {
            if (!data.data) return;
            queryClient.invalidateQueries({ queryKey: ['GET_MEMBERSHIP_USER', 'MEMBERSHIP'] });

            const membershipData = {
                current_level: data.data.current_level,
                max_level: data.data.max_level,
                required_money: data.data.required_money,
                required_short_money: data.data.required_short_money,
                ...data.data.membership
            }

            dispatch(setMembership(membershipData));
        },
        onError(error, variables, context) {
            console.log(error);
        },
    });
};
