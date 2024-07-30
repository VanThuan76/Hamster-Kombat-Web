import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface IDefaultState {
    user: {
        id: number;
        username: string;
        photo_url: string;
        last_name: string;
        first_name: string;
        is_bot: boolean;
        is_premium: boolean;
        language_code: string;
        revenue: number;
        profit_per_hour: number;
        exchange_id: number
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
    exchange: {
        name: string;
        icon: string
    };
}

const initialState: IDefaultState = {
    user: {
        id: 0,
        username: "",
        photo_url: "",
        last_name: "",
        first_name: "",
        is_bot: false,
        is_premium: false,
        language_code: "",
        revenue: 0,
        profit_per_hour: 0,
        exchange_id: 0
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
    exchange: {
        name: '',
        icon: '/project/icon_ava_plus.png'
    },
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
        setExchange: (state, action: PayloadAction<IDefaultState["exchange"]>) => {
            state.exchange = action.payload;
        },
        setUpdateRevenue: (state, action: PayloadAction<number>) => {
            state.user.revenue = action.payload;
        },
    },
});

export const { setInitUser, setMembership, setExchange, setUpdateRevenue } = appSlice.actions;
export default appSlice.reducer;