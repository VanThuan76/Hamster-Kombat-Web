import { ICategoryOfCard } from "./card";

export interface IResponseUpdateExchange {
    exchange: IExchanges
    profitPerHour: {
        id: number,
        user_id: number,
        profit_per_hour: number,
        created_at: string,
        updated_at: string,
        exchange_id: number,
        is_active: number
    }
    categoryList: ICategoryOfCard[]
}
export interface IExchanges {
    id: number;
    user_id: number;
    profit_per_hour: number;
    exchange_id: number;
    is_active: number;
    name: string;
    description: string;
    image: string;
}

export interface IExchangesOrigin {
    id: number;
    name: string;
    description: string;
    image: string;
    created_at: string;
    updated_at: string;
    image_url: string;
}