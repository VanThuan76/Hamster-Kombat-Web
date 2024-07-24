'use client'

import React from "react";
const {
    SDKProvider,
} = require('@telegram-apps/sdk-react');

const SdkTeleSolidWrapper = ({ children }: { children: React.ReactNode }) => {
    return (
        <SDKProvider acceptCustomStyles>
            {children}
        </SDKProvider>
    );
}

export default SdkTeleSolidWrapper;