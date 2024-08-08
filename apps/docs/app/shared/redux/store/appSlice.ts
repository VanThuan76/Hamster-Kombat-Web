import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { ISkin } from "@server/_types/skin";
import { IEarn } from "@server/_types/earn";
import { IExchangesOrigin } from "@server/_types/exchanges";
import { ICategoryOfCard } from "@server/_types/card";
import { IFriend, IRankUsers } from "@server/_types/user";
export interface IDefaultState {
    user: {
        telegram_id: number,
        id: number;
        username: string;
        photo_url: string;
        last_name: string;
        first_name: string;
        is_bot: boolean;
        is_premium: boolean;
        language_code: string;
        revenue: number;
        highest_score: number;
        profit_per_hour: number;
        exchange: {
            id: number;
            name: string;
            icon: string
        }
    };
    membership: {
        id: number;
        name: string;
        image: string;
        money: number;
        level: number;
        created_at: string;
        updated_at: string;
        short_money: string;
        image_url: string;
        current_level: number;
        max_level: number;
        required_money: number;
        required_short_money: string;
    };
    friends: IFriend[] | [],
    ranks: IRankUsers[] | [],
    earns: IEarn[] | [],
    exchanges: IExchangesOrigin[] | [],
    skins: ISkin[] | [],
    categoryOfCards: ICategoryOfCard[] | [],
    userEnergy: number,
    isEditExchange: boolean
}

const initialState: IDefaultState = {
    user: {
        telegram_id: 0,
        id: 0,
        username: "",
        photo_url: "",
        last_name: "",
        first_name: "",
        is_bot: false,
        is_premium: false,
        language_code: "",
        revenue: 0,
        highest_score: 0,
        profit_per_hour: 0,
        exchange: {
            id: 0,
            name: '',
            icon: '/project/icon_ava_plus.png'
        }
    },
    membership: {
        id: 0,
        name: "",
        image: "",
        money: 0,
        level: 0,
        created_at: "",
        updated_at: "",
        short_money: "",
        image_url: "",
        current_level: 0,
        max_level: 0,
        required_money: 0,
        required_short_money: ""
    },
    friends: [],
    ranks: [],
    earns: [],
    exchanges: [],
    skins: [],
    categoryOfCards: [],
    userEnergy: 1000,
    isEditExchange: false
};

export const appSlice: any = createSlice({
    name: "app",
    initialState,
    reducers: {
        setInitUser: (state, action: PayloadAction<IDefaultState["user"]>) => {
            state.user = action.payload;
        },
        setMembership: (state, action: PayloadAction<IDefaultState["membership"]>) => {
            state.membership = action.payload;
        },
        setUserExchange: (state, action: PayloadAction<any>) => {
            state.user.exchange = action.payload;
            if (action.payload.id !== 0) {
                state.isEditExchange = true
            }
        },
        setUserEnergy: (state, action: PayloadAction<number>) => {
            state.userEnergy = action.payload
        },
        setIsEditUserExchange: (state, action: PayloadAction<boolean>) => {
            state.isEditExchange = action.payload
        },
        setUpdateProfitPerHour: (state, action: PayloadAction<number>) => {
            state.user.profit_per_hour = action.payload;
        },
        setUpdateRevenue: (state, action: PayloadAction<number>) => {
            state.user.revenue = action.payload;
        },
        setExchanges: (state, action: PayloadAction<IExchangesOrigin[]>) => {
            state.exchanges = action.payload;
        },
        setFriends: (state, action: PayloadAction<IFriend[]>) => {
            state.friends = action.payload;
        },
        setSkins: (state, action: PayloadAction<ISkin[]>) => {
            state.skins = action.payload;
        },
        setEarns: (state, action: PayloadAction<IEarn[]>) => {
            state.earns = action.payload;
        },
        setRanks: (state, action: PayloadAction<IRankUsers[]>) => {
            state.ranks = action.payload;
        },
        setCategoryOfCards: (state, action: PayloadAction<ICategoryOfCard[]>) => {
            state.categoryOfCards = action.payload;
        },
    },
});

export const { setInitUser, setMembership, setUserExchange, setUpdateRevenue, setUpdateProfitPerHour, setExchanges, setRanks, setSkins, setEarns, setFriends, setCategoryOfCards, setIsEditUserExchange, setUserEnergy } = appSlice.actions;
export default appSlice.reducer;