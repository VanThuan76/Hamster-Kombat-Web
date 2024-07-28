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