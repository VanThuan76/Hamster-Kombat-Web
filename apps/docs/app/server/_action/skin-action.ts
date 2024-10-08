import {
    useMutation,
    UseMutationResult,
    UseQueryResult,
} from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { axiosInstance } from "@shared/axios.http";
import { useAppDispatch, useAppSelector } from "@shared/redux/store";
import { setImageUrls, setSkins } from "@shared/redux/store/appSlice";
import { toast } from "@shared/hooks/useToast";

import { queryClient } from "./config";

import { IBaseResponse } from "../_types/base";

import { IResponseBuySkin, ISkin } from "../_types/skin";

import SKIN_PATHS from "../_path/skin-path";

const { initHapticFeedback } = require("@telegram-apps/sdk-react");

export const useSkins: () => UseMutationResult<
    IBaseResponse<ISkin[]>,
    Error,
    any
> = () => {
    const { imageUrls } = useAppSelector((state) => state.app);

    const dispatch = useAppDispatch();

    return useMutation<IBaseResponse<ISkin[]>, Error>({
        mutationFn: () =>
            axiosInstance.get<IBaseResponse<ISkin[]>>(SKIN_PATHS.GET_ALL),
        onSuccess: async (data) => {
            if (!data.data) return;

            const skinImageUrls = data.data
                .filter((item) => item.image)
                .map((item) => item.image_url);

            const uniqueImageUrls = Array.from(
                new Set([...imageUrls, ...skinImageUrls]),
            );

            dispatch(setImageUrls(uniqueImageUrls));

            dispatch(setSkins(data.data));

            queryClient.invalidateQueries({ queryKey: ["GET_LIST_SKINS", "SKINS"] });
        },
        onError(error, variables, context) {
            console.log(error);
        },
    });
};

export const useBuySkin: () => UseMutationResult<
    IBaseResponse<IResponseBuySkin>,
    Error,
    { user_id: number; skin_id: number }
> = () => {
    const t = useTranslations("other");

    const haptic = initHapticFeedback();

    return useMutation<
        IBaseResponse<IResponseBuySkin>,
        Error,
        { user_id: number; skin_id: number }
    >({
        mutationFn: (body: { user_id: number; skin_id: number }) =>
            axiosInstance.post<IBaseResponse<IResponseBuySkin>>(
                SKIN_PATHS.BUY_SKIN,
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
            queryClient.invalidateQueries({ queryKey: ["BUY_SKIN", "SKIN"] });

            haptic.impactOccurred("heavy");

            toast({
                variant: "success",
                title: t("success_action"),
            });
        },
        onError(error, variables, context) {
            console.log(error);
        },
    });
};

export const useUpdateSkin: () => UseMutationResult<
    IBaseResponse<IResponseBuySkin>,
    Error,
    { user_id: number; skin_id: number }
> = () => {
    return useMutation<
        IBaseResponse<IResponseBuySkin>,
        Error,
        { user_id: number; skin_id: number }
    >({
        mutationFn: (body: { user_id: number; skin_id: number }) =>
            axiosInstance.post<IBaseResponse<IResponseBuySkin>>(
                SKIN_PATHS.BUY_SKIN,
                body,
            ),
        onMutate: () => {
            toast({
                variant: "default",
                title: "Đang xử lý dữ liệu...",
            });
        },
        onSuccess: async (data) => {
            if (!data.data) return;
            queryClient.invalidateQueries({ queryKey: ["UPDATE_SKIN", "SKIN"] });

            toast({
                variant: "success",
                title: `Upgrade is yours skin`,
            });
        },
        onError(error, variables, context) {
            console.log(error);
        },
    });
};
