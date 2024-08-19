"use client";

import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Provider } from "react-redux";
import { Toaster } from "@shared/toaster";
import { store } from './redux/store/index';

export default function Providers({ children }: { children: React.ReactNode; }) {
    const [queryClient] = React.useState(() => new QueryClient());

    return (
        <QueryClientProvider client={queryClient}>
            <Provider store={store}>
                {children}
                <Toaster />
            </Provider>;
        </QueryClientProvider>
    );
}
