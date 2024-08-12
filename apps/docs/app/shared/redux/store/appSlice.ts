import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { ISkin } from "@server/_types/skin";
import { IEarn } from "@server/_types/earn";
import { IBoost } from "@server/_types/boost";
import { IExchangesOrigin } from "@server/_types/exchanges";
import { ICategoryOfCard } from "@server/_types/card";
import { IFriend, IRankUsers } from "@server/_types/user";

import { DrawerProps } from "@shared/hooks/useDraw";
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
        tap_value: number;
        energy_limit: number;
        exchange: {
            id: number;
            name: string;
            icon: string
        },
        boots: IBoost[] | []
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
    isProfitRevenueActive: boolean;
    stateEnergy: number,
    drawerStore: DrawerProps
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
        tap_value: 1,
        energy_limit: 1000,
        exchange: {
            id: 0,
            name: '',
            icon: '/project/icon_ava_plus.png'
        },
        boots: []
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
    isProfitRevenueActive: false,
    stateEnergy: 0,
    drawerStore: {
        type: null,
        data: {},
        isOpen: false,
    }
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
                state.drawerStore.isOpen = true
                state.drawerStore.type = "editExchange"
            }
        },
        setStateEnergy: (state, action: PayloadAction<number>) => {
            state.stateEnergy = action.payload
        },
        setUpdateProfitPerHour: (state, action: PayloadAction<number>) => {
            state.user.profit_per_hour = action.payload;
        },
        setHighestScore: (state, action: PayloadAction<number>) => {
            state.user.highest_score = action.payload;
        },
        setUpdateRevenue: (state, action: PayloadAction<number>) => {
            state.user.revenue = action.payload;
        },
        setUpdateBoost: (state, action: PayloadAction<any>) => {
            state.user.boots = action.payload.boots;
            state.user.tap_value = action.payload.tap_value
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
        setIsProfitRevenueActive: (state, action: PayloadAction<boolean>) => {
            state.isProfitRevenueActive = action.payload;
            state.drawerStore.isOpen = action.payload;
            state.drawerStore.type = "getProfit"
        },
        openDrawer: (state, action: PayloadAction<DrawerProps>) => {
            state.drawerStore = action.payload
        },
        closeDrawer: (state) => {
            state.drawerStore = { ...state.drawerStore, type: null, data: undefined, isOpen: false };
        }
    },
});

export const { setInitUser, setMembership, setUserExchange, setUpdateRevenue, setUpdateBoost, setUpdateProfitPerHour, setIsProfitRevenueActive, setExchanges, setRanks, setSkins, setEarns, setFriends, setCategoryOfCards, setStateEnergy, setHighestScore, openDrawer, closeDrawer } = appSlice.actions;
export default appSlice.reducer;