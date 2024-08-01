'use client'

import React, { useEffect, useState } from 'react';

import { userLoginAction } from '@server/_action/user-action';
import { useMembershipByUser } from '@server/_action/membership-action';
import { useExchanges, useExchangesByUser } from '@server/_action/exchanges-action';
import { useCategories } from '@server/_action/category-action';

import Loading from '@shared/components/Loading';

const {
    useInitData,
    initBackButton,
    initMiniApp,
} = require('@telegram-apps/sdk-react');

const InitApp = ({ children }: { children: React.ReactNode }) => {
    const [initialized, setInitialized] = useState(false);

    const categoryInitAction = useCategories();
    const exchangesInitAction = useExchanges();
    const userInitAction = userLoginAction()
    const membershipAction = useMembershipByUser()
    const exchangeByUserAction = useExchangesByUser()

    const [miniApp] = initMiniApp();
    const [backButton] = initBackButton();
    const initData = useInitData();

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
                await exchangeByUserAction.mutateAsync({ user_id: user.data.id });
                await membershipAction.mutateAsync({ user_id: user.data.id });
                await categoryInitAction.mutateAsync({})
                await exchangesInitAction.mutateAsync({})

                //Telegram SDK
                miniApp.setHeaderColor('#000');
                backButton.show();

                setInitialized(true);
            } catch (error) {
                console.error('Error initializing app:', error);
                setInitialized(true);
            }
        };

        initializeApp();
    }, []);

    if (!initialized) {
        return <Loading />
    }

    return (
        <React.Fragment>
            {children}
        </React.Fragment>
    );
}

export default InitApp;