import { ISkin } from "./skin";

export interface IAuth {
    telegram_id: string;
    first_name: string;
    last_name: string;
    username: string;
    language_code: string;
}

export interface IUser {
    id: number;
    name?: string;
    email?: string;
    email_verified_at?: string;
    created_at: string;
    updated_at: string;
    telegram_id: string;
    first_name: string;
    last_name: string;
    username: string;
    language_code: string;
    last_login: string;
    membership_id: number;
    revenue: number;
    skin_id: number;
    highest_score: number;
    is_first_login: number;
    profitPerHour: {
        id: number,
        user_id: number,
        profit_per_hour: number,
        created_at: string,
        updated_at: string,
        exchange_id: number,
        is_active: number
    }
}

export interface IUpdateRevenueByUser {
    user_id: number;
    revenue: number
}

export interface IUpdateSkinByUser {
    user: IUser;
    skin: ISkin;
}

export interface IRankUsers {
    id: number;
    name: string;
    image: string;
    money: number;
    level: number;
    created_at: string;
    updated_at: string;
    short_money: string;
    rank: Rank[];
    currentUser?: Rank[];
}

interface Rank {
    id: number;
    first_name: string;
    last_name: string;
    highest_score: number;
    exchange_id: number;
    name: string;
    image: string;
}

export interface IFriendUser {
    user: IFriend;
    userFriends: IFriend[];
}

export interface IFriend {
    id: number;
    name: null;
    email: null;
    email_verified_at: null;
    created_at: string;
    updated_at: string;
    telegram_id: string;
    first_name: string;
    last_name: string;
    username: string;
    language_code: string;
    last_login: string;
    membership_id: number;
    revenue: number;
    skin_id: number;
    highest_score: number;
    is_first_login: number;
    wallet: null;
    highScore: null;
    plays: null;
}