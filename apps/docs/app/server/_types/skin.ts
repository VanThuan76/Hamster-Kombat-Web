import { IUser } from "./user";

export interface ISkin {
    id: number;
    name: string;
    en_name: string
    description: string;
    en_description: string;
    image: string;
    price: number;
    created_at: string;
    updated_at: string;
    required_level: number;
    image_url: string;
}

export interface IResponseBuySkin {
    user: IUser;
    skin: ISkin;
}
