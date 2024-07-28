'use client'

import React, { useEffect } from 'react';

import { userLoginAction } from '@server/_action/user-action';
import { useMembershipByUser } from '@server/_action/membership-action';

const {
    useInitData,
    initBackButton,
    initHapticFeedback
} = require('@telegram-apps/sdk-react');

const InitApp = ({ children }: { children: React.ReactNode }) => {
    const userInitAction = userLoginAction()
    const membershipAction = useMembershipByUser()

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
        const initializeApp = async () => {
            try {
                const body = getUserRows(initData.user);
                const user = await userInitAction.mutateAsync(body);
                await membershipAction.mutateAsync({ user_id: user.data.id });
                backButton.show();
                haptic.impactOccurred('medium');
            } catch (error) {
                console.error('Error initializing app:', error);
            }
        };

        initializeApp();
    }, []);

    return (
        <React.Fragment>
            {children}
        </React.Fragment>
    );
}

export default InitApp;