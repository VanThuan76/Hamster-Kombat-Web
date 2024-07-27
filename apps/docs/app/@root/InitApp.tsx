'use client'

import React, { useEffect } from 'react';

import { userLoginAction } from '@server/_action/user-action';

const {
    useInitData,
    initBackButton,
    initHapticFeedback
} = require('@telegram-apps/sdk-react');

const InitApp = ({ children }: { children: React.ReactNode }) => {
    const useInit = userLoginAction()
    const initData = useInitData();

    const haptic = initHapticFeedback();
    const [backButton] = initBackButton();

    function getUserRows(user: any) {
        return {
            telegram_id: String(user.id),
            username: user.username,
            photo_url: user.photoUrl,
            first_name: user.firstName,
            last_name: user.lastName,
            is_bot: user.isBot,
            is_premium: user.isPremium,
            language_code: user.languageCode,
        }
    }

    useEffect(() => {
        const body = getUserRows(initData.user)
        useInit.mutateAsync(body)
        backButton.show();
        haptic.impactOccurred('medium');
    }, [])

    return (
        <React.Fragment>
            {children}
        </React.Fragment>
    );
}

export default InitApp;