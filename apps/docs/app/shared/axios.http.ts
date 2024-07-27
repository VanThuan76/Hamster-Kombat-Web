import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { deleteCookie, getCookie } from "cookies-next";
import { APP_SAVE_KEY } from "./constant/app";

class Axios {
    private api: AxiosInstance;

    constructor(baseURL: string, noAuth: boolean, token?: string) {
        this.api = axios.create({
            baseURL,
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!noAuth) {
            if (token) {
                this.api.interceptors.request.use(
                    (config) => {
                        config.headers.Authorization = `Bearer ${token}`;
                        return config;
                    },
                    (error) => {
                        return Promise.reject(error);
                    },
                );
            }
            this.api.interceptors.request.use(
                (config) => {
                    const accessToken = this.getAccessToken();
                    if (accessToken) {
                        config.headers.Authorization = `Bearer ${accessToken}`;
                    }
                    return config;
                },
                (error) => {
                    return Promise.reject(error);
                },
            );
        }

        this.handleResponse(this.api);
    }

    handleResponse(axios: AxiosInstance) {
        axios.interceptors.response.use(
            async (response: AxiosResponse) => {
                if (typeof window !== "undefined") {
                    const statusCode = response.data.statusCode;
                    switch (statusCode) {
                        case 403:
                            deleteCookie(APP_SAVE_KEY.TOKEN_KEY);
                            break;
                        case 401:
                            try {
                            } catch (e) {
                                return Promise.reject(response);
                            }
                            break;
                        case 400:
                            return Promise.reject(response);
                        default:
                            break;
                    }
                }
                return response;
            },
            async (error) => {
                if (error.response.status === 403 && typeof window !== "undefined") {
                    window.location.href = "/login";
                    deleteCookie(APP_SAVE_KEY.TOKEN_KEY);
                }
                if (error.response.status === 401 && typeof window !== "undefined") {
                    try {
                        window.location.href = "/login";
                    } catch (e) { }
                }
                return Promise.reject(error);
            },
        );
    }
    async get<T>(url: string, configs?: AxiosRequestConfig): Promise<T> {
        try {
            const response = await this.api.get<T>(url, configs);
            return response.data;
        } catch (error) {
            console.error("GET request failed:", error);
            throw error;
        }
    }

    async post<T>(
        url: string,
        data: any,
        configs?: AxiosRequestConfig,
    ): Promise<T> {
        try {
            const response = await this.api.post<T>(url, data, configs);

            return response.data;
        } catch (error) {
            console.error("POST request failed:", error);
            throw error;
        }
    }

    async put<T>(
        url: string,
        data?: any,
        configs?: AxiosRequestConfig,
    ): Promise<T> {
        try {
            const response = await this.api.put<T>(url, data, configs);
            return response.data;
        } catch (error) {
            console.error("PUT request failed:", error);
            throw error;
        }
    }

    async patch<T>(
        url: string,
        data?: any,
        configs?: AxiosRequestConfig,
    ): Promise<T> {
        try {
            const response = await this.api.patch<T>(url, data, configs);
            return response.data;
        } catch (error) {
            console.error("PATCH request failed:", error);
            throw error;
        }
    }

    async delete<T>(url: string, configs?: AxiosRequestConfig): Promise<T> {
        try {
            const response = await this.api.delete<T>(url, configs);
            return response.data;
        } catch (error) {
            console.error("DELETE request failed:", error);
            throw error;
        }
    }

    private getAccessToken(): string {
        return getCookie(APP_SAVE_KEY.TOKEN_KEY) as string;
    }
}

export const axiosInstance = new Axios(
    process.env.NEXT_PUBLIC_API_URL as string,
    false,
);
export const axiosInstanceNoAuth = new Axios(
    process.env.NEXT_PUBLIC_API_URL as string,
    true,
);
export const axiosInstanceChatBot = new Axios(
    process.env.NEXT_PUBLIC_API_URL as string,
    true,
    process.env.COZE_AI_TOKEN,
);
