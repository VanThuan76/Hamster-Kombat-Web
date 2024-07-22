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
}

const initialState: IDefaultState = {
    user: undefined,
};

export const appSlice: any = createSlice({
    name: "app",
    initialState,
    reducers: {
        setInitUser: (state, action: PayloadAction<IDefaultState["user"]>) => {
            state.user = action.payload;
        },
    },
});

export const { setInitUser } = appSlice.actions;
export default appSlice.reducer;