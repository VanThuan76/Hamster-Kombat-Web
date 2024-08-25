import {
  useMutation,
  UseMutationResult,
  UseQueryResult,
} from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "@shared/hooks/useToast";
import { axiosInstance } from "@shared/axios.http";
import { useAppDispatch, useAppSelector } from "@shared/redux/store/index";
import {
  setMembership,
  setUpdateBoost,
  setEnergyLimit,
} from "@shared/redux/store/appSlice";

import { queryClient } from "./config";

import { IBaseResponse } from "../_types/base";

import { IResponseUpdateBoost, IUpdateBoost } from "../_types/boost";

import BOOST_PATHS from "../_path/boost-path";

const { useHapticFeedback } = require("@telegram-apps/sdk-react");

export const useUpdateBoost: () => UseMutationResult<
  IBaseResponse<IResponseUpdateBoost>,
  Error,
  IUpdateBoost
> = () => {
  const { membership } = useAppSelector((state) => state.app);

  const t = useTranslations("other");

  const dispatch = useAppDispatch();
  const haptics = useHapticFeedback();

  return useMutation<IBaseResponse<IResponseUpdateBoost>, Error, IUpdateBoost>({
    mutationFn: (body: IUpdateBoost) =>
      axiosInstance.post<IBaseResponse<IResponseUpdateBoost>>(
        BOOST_PATHS.UPDATE_BY_USER,
        body,
      ),
    onMutate: () => {
      toast({
        variant: "default",
        title: t("pending_action"),
      });
    },
    onSuccess: async (data) => {
      if (!data.data) return;
      queryClient.invalidateQueries({ queryKey: ["UPDATE_BOOST", "BOOST"] });
      dispatch(
        setUpdateBoost({
          boots: data.data.boots,
          tap_value: data.data.user.tap_value,
        }),
      );
      dispatch(setEnergyLimit(data.data.max_energy));

      const membershipData = {
        ...membership,
        name: data.data.membership.membership?.name,
        money: data.data.membership.membership?.money,
        level: data.data.membership.membership?.level,
        short_money: data.data.membership.membership?.short_money,
      };

      dispatch(setMembership(membershipData)); //Fix

      toast({
        variant: "success",
        title: t("success_action"),
      });
      haptics.notificationOccurred("success");
    },
    onError(error, variables, context) {
      console.log(error);
      return haptics.notificationOccurred("error");
    },
  });
};
