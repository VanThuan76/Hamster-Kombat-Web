'use client'

import React, { useEffect } from "react";
import { useTelegramMock } from "@shared/hooks/useTelegramMock";
const {
    SDKProvider,
    useLaunchParams
} = require('@telegram-apps/sdk-react');

const SdkTeleSolidWrapper = ({ children }: { children: React.ReactNode }) => {
    // Mock Telegram environment in development mode if needed.
    if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useTelegramMock();
    }

    const debug = useLaunchParams().startParam === 'debug';

    // Enable debug mode to see all the methods sent and events received.
    useEffect(() => {
        if (debug) {
            import('eruda').then((lib) => lib.default.init());
        }
    }, [debug]);

    return (
        <SDKProvider acceptCustomStyles debug={debug}>
            {children}
        </SDKProvider>
    );
}

export default SdkTeleSolidWrapper;