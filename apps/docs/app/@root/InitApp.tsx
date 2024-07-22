'use client'

import React, { useEffect } from 'react';

import { setInitUser } from '@shared/redux/store/appSlice';
import { useAppDispatch } from '@shared/redux/store/index';

const {
    useInitData,
    initBackButton
} = require('@telegram-apps/sdk-react');

const InitApp = ({ children }: { children: React.ReactNode }) => {
    const dispatch = useAppDispatch()

    const [backButton] = initBackButton();
    const initData = useInitData();

    function getUserRows(user: any) {
        return {
            id: user.id,
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
        dispatch(setInitUser(initData ? getUserRows(initData.user) : undefined))
        backButton.show();
    }, [])

    return (
        <>
            {children}
        </>
    );
}

export default InitApp;