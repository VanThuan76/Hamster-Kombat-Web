export interface IBoost {
    type: number;
    boots: IDetailBoost[];
}

interface IDetailBoost {
    user_boots_id: number;
    boots_id: number;
    name: string;
    required_money: number;
    sub_type: number;
    level: number;
    image: null;
    value: number;
    order: number;
}