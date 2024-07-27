export interface IUserMembership {
    membership: IMembership;
    current_level: number;
    max_level: number;
    required_money: number;
    required_short_money: string;
}

export interface IMembership {
    id: number;
    name: string;
    image: string;
    money: number;
    level: number;
    created_at: string;
    updated_at: string;
    short_money: string;
    image_url: string;
}