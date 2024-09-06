import { IUserMembership } from "./membership";
import { IUser } from "./user";

export interface IEarn {
    type: number;
    earn: EarnDetail[];
}

export interface EarnDetail {
    user_earn_id: number;
    is_completed: number;
    name: string;
    en_name: string
    description: string;
    en_description: string;
    link: null | string;
    image: null | string;
    reward: number;
    order: number;
}

export interface IUpdateEarn {
    user_id: number;
    user_earn_id: number;
    is_completed: number;
}

export interface IResponseUpdateEarn {
    earns: IEarn[];
    membership: IUserMembership
    user: IUser;
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
