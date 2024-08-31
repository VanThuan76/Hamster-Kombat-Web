import {
    useMutation,
    UseMutationResult,
    UseQueryResult,
} from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "@shared/hooks/useToast";
import { axiosInstance } from "@shared/axios.http";
import { useAppDispatch, useAppSelector } from "@shared/redux/store";
import {
    setCategoryOfCards,
    setImageUrls,
    setMembership,
} from "@shared/redux/store/appSlice";

import { queryClient } from "./config";

import { IBaseResponse } from "../_types/base";

import { IBuyCard, ICategoryOfCard } from "../_types/card";

import CARD_PATHS from "../_path/card-path";

const { useHapticFeedback } = require("@telegram-apps/sdk-react");

export const useBuyCard: () => UseMutationResult<
    IBaseResponse<any[]>,
    Error,
    IBuyCard
> = () => {
    const { membership } = useAppSelector((state) => state.app);

    const t = useTranslations("other");

    const haptics = useHapticFeedback();
    const dispatch = useAppDispatch();

    return useMutation<IBaseResponse<any[]>, Error, IBuyCard>({
        mutationFn: (body: IBuyCard) =>
            axiosInstance.post<IBaseResponse<any[]>>(CARD_PATHS.BUY_CARD, body),
        onMutate: () => {
            toast({
                variant: "default",
                title: t("pending_action"),
            });
        },
        onSuccess: async (data) => {
            if (!data.data) {
                toast({
                    variant: "default",
                    title: t("not_enough_money"),
                });
                haptics.notificationOccurred("error");
            } else {
                queryClient.invalidateQueries({ queryKey: ["BUY_CARD", "CARD"] });
                dispatch(setCategoryOfCards(data.data[0])); //Fix

                const membershipData = {
                    ...membership,
                    name: data.data[1].membership.membership?.name,
                    money: data.data[1].membership.membership?.money,
                    level: data.data[1].membership.membership?.level,
                    short_money: data.data[1].membership.membership?.short_money,
                };

                dispatch(setMembership(membershipData)); //Fix

                toast({
                    variant: "success",
                    title: t("success_action"),
                });
                haptics.notificationOccurred("success");
            }
        },
        onError(error, variables, context) {
            console.log(error);
            return haptics.notificationOccurred("error");
        },
    });
};

export const useCategoryOfCardByUser: () => UseMutationResult<
    IBaseResponse<ICategoryOfCard[]>,
    Error,
    { user_id: number; exchange_id: number }
> = () => {
    const { imageUrls } = useAppSelector((state) => state.app);
    const dispatch = useAppDispatch();

    return useMutation<
        IBaseResponse<ICategoryOfCard[]>,
        Error,
        { user_id: number; exchange_id: number }
    >({
        mutationFn: (body: { user_id: number; exchange_id: number }) =>
            axiosInstance.post<IBaseResponse<ICategoryOfCard[]>>(
                CARD_PATHS.GET_ALL,
                body,
            ),
        onSuccess: async (data) => {
            if (!data.data) return;

            const cardImageUrls = data.data
                .filter((item) => item.order === 1)
                .flatMap((item) =>
                    item.cardList
                        .filter((chil) => chil.image)
                        .map(
                            (chil) =>
                                `${process.env.NEXT_PUBLIC_DOMAIN_BACKEND}/${chil.image}`,
                        ),
                );

            const uniqueImageUrls = Array.from(
                new Set([...imageUrls, ...cardImageUrls]),
            );

            dispatch(setImageUrls(uniqueImageUrls));

            dispatch(setCategoryOfCards(data.data));

            queryClient.invalidateQueries({
                queryKey: ["GET_LIST_CATEGORY_OF_CARD", "CARD"],
            });
        },
        onError(error, variables, context) {
            console.log(error);
        },
    });
};
