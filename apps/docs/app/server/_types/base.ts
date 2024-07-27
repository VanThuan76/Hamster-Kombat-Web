export interface IBaseResponse<T> {
    status_code: number;
    data: T;
    message: string;
}