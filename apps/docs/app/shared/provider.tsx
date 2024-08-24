"use client";

import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Provider } from "react-redux";
import { Toaster } from "@shared/toaster";
import { store } from './redux/store/index';

export default function Providers({ children }: { children: React.ReactNode; }) {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 1000 * 60 * 60 * 24, // 24 giờ
                refetchOnWindowFocus: false, // Không refetch khi focus vào cửa sổ
                refetchOnReconnect: false, // Không refetch khi có kết nối mạng lại
            },
        },
    });

    return (
        <QueryClientProvider client={queryClient}>
            <Provider store={store}>
                {children}
                <Toaster />
            </Provider>;
        </QueryClientProvider>
    );
}
