import { IMembership } from "./membership";
import { IUser } from "./user";

export interface IEarn {
    type: number;
    earn: EarnDetail[];
}

interface EarnDetail {
    user_earn_id: number;
    is_completed: number;
    name: string;
    description: string;
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
    membership: IMembership[];
    user: IUser;
}