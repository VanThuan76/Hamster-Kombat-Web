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
        language_code: string
    } | undefined;
    exchange: {
        name: string;
        icon: string
    };
    coin: number;
    energy: number;
}

const initialState: IDefaultState = {
    user: undefined,
    exchange: {
        name: '',
        icon: '/project/icon_ava_plus.png'
    },
    coin: 0,
    energy: 100
};

export const appSlice: any = createSlice({
    name: "app",
    initialState,
    reducers: {
        setInitUser: (state, action: PayloadAction<IDefaultState["user"]>) => {
            state.user = action.payload;
        },
        setCoin: (state, action: PayloadAction<number>) => {
            state.coin = action.payload;
        },
        setEnergy: (state, action: PayloadAction<number>) => {
            state.energy = action.payload;
        },
        setExchange: (state, action: PayloadAction<IDefaultState["exchange"]>) => {
            state.exchange = action.payload;
        }
    },
});

export const { setInitUser, setCoin, setEnergy, setExchange } = appSlice.actions;
export default appSlice.reducer;