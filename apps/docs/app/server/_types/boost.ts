import { IEarn } from "./earn";
import { IUserMembership } from "./membership";
import { IUser } from "./user";

export interface IBoost {
    type: number;
    sub_types: Subtype[];
}
interface Subtype {
    sub_type: number;
    boots: IDetailBoost[];
}
interface IDetailBoost {
    user_boots_id: number;
    boots_id: number;
    name: string;
    required_money: number;
    required_short_money: string;
    is_completed: number;
    level: number;
    image: null;
    value: number;
    order: number;
}

export interface IUpdateBoost {
    user_id: number;
    current_user_boots_id: number;
    current_boots_level: number;
    next_user_boots_id: number;
    next_boots_level: number;
    type: number;
    sub_type: number;
}

export interface IResponseUpdateBoost {
    earns: IEarn[];
    membership: IUserMembership;
    user: IUser;
    boots: IBoost[];
    max_energy: number;
}
