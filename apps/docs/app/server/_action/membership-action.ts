import {
  useMutation,
  UseMutationResult,
  UseQueryResult,
} from "@tanstack/react-query";
import { axiosInstance } from "@shared/axios.http";
import { useAppDispatch, useAppSelector } from "@shared/redux/store/index";
import { setImageUrls, setMembership } from "@shared/redux/store/appSlice";

import { queryClient } from "./config";

import { IBaseResponse } from "../_types/base";

import { IUserMembership } from "../_types/membership";

import MEMBERSHIP_PATHS from "../_path/membership-path";

export const useMembershipByUser: () => UseMutationResult<
  IBaseResponse<IUserMembership>,
  Error,
  { user_id: number }
> = () => {
  const { imageUrls } = useAppSelector((state) => state.app);
  const dispatch = useAppDispatch();

  return useMutation<
    IBaseResponse<IUserMembership>,
    Error,
    { user_id: number }
  >({
    mutationFn: (user_id: { user_id: number }) =>
      axiosInstance.post<IBaseResponse<IUserMembership>>(
        MEMBERSHIP_PATHS.GET_BY_USER,
        user_id,
      ),
    onSuccess: async (data) => {
      if (!data.data) return;

      const membershipData = {
        current_level: data.data.current_level,
        max_level: data.data.max_level,
        required_money: data.data.required_money,
        required_short_money: data.data.required_short_money,
        ...data.data.membership,
        image: data.data.skin
          ? data.data.skin.image
          : data.data.membership.image,
      };

      const membershipImageUrl = data.data.skin
        ? `${process.env.NEXT_PUBLIC_DOMAIN_BACKEND}/${data.data.skin.image}`
        : `${process.env.NEXT_PUBLIC_DOMAIN_BACKEND}/${data.data.membership.image}`;

      const uniqueImageUrls = Array.from(
        new Set([...imageUrls, membershipImageUrl]),
      );

      dispatch(setImageUrls(uniqueImageUrls));

      dispatch(setMembership(membershipData));

      queryClient.invalidateQueries({
        queryKey: ["GET_MEMBERSHIP_USER", "MEMBERSHIP"],
      });
    },
    onError(error, variables, context) {
      console.log(error);
    },
  });
};
