import { IExchanges } from "./exchanges";

export interface ICard {
    id: number;
    name: string;
    description: string;
    image: null;
    category_id: number;
    order: number;
    status: null;
    created_at: string;
    updated_at: string;
    created_by: null;
    updated_by: null;
    card_profits: ICardProfit[];
}

export interface ICardProfit {
    id: number;
    card_id: number;
    card_name: null;
    level: number;
    profit: number;
    required_card: number;
    required_money: number;
    required_short_money: string;
    status: null;
    created_at: string;
    updated_at: string;
    created_by: null;
    updated_by: null;
    required_card_text: string;
}

export interface ICardByUserAndCategory {
    id: number;
    card_profit_id: number;
    user_id: number;
    exchange_id: number;
    card_id: number;
    level: number;
    status: null;
    created_at: string;
    updated_at: string;
    created_by: null;
    updated_by: null;
    name: string;
    description: string;
    image: null;
    category_id: number;
    order: number;
    card_name: null;
    profit: number;
    required_card: number;
    required_money: number;
    required_short_money: string;
    max_level: number;
    card: ICard;
    card_profit: ICardProfit;
    exchange: IExchanges;
}
export interface IBuyCard {
    card_id: number;
    card_profit_id: number;
    level: number;
    user_id: number;
    exchange_id: number;
}