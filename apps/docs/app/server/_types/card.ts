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
  card_name: string;
  card_name_en: string;
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
  is_bought: number;
}

export interface IBuyCard {
  card_id: number;
  card_profit_id: number;
  level: number;
  user_id: number;
  exchange_id: number;
}

export interface ICategoryOfCard {
  id: number;
  name: string;
  en_name: string
  description: string;
  en_description: string
  order: number;
  status?: null;
  created_at: string;
  updated_at: string;
  created_by?: null;
  updated_by?: null;
  cardList: CardList[];
}
export interface CardList {
  id: number;
  name: string;
  en_name: string;
  description: string;
  en_description: string
  image?: null | string;
  category_id: number;
  order: number;
  status?: null;
  created_at: string;
  updated_at: string;
  created_by?: null;
  updated_by?: null;
  card_profits: CardProfit[];
}
export interface CardProfit {
  id: number;
  card_id: number;
  card_name?: null;
  level: number;
  profit: number;
  required_card: ICardProfit;
  required_money: number;
  required_short_money?: null | string;
  status?: null;
  created_at: string;
  updated_at: string;
  created_by?: null;
  updated_by?: null;
  is_purchased: boolean;
  next_level?: NextLevel;
}

interface NextLevel {
  id: number;
  card_id: number;
  card_name?: null;
  level: number;
  profit: number;
  required_card: ICardProfit;
  required_money: number;
  required_short_money?: null | string;
  status?: null;
  created_at: string;
  updated_at: string;
  created_by?: null;
  updated_by?: null;
}
