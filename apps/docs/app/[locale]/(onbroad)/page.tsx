'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from '@shared/next-intl/navigation';
import { useAppSelector } from '@shared/redux/store';
import { toast } from '@shared/hooks/useToast';

import { useFriends, useRankUsers, userLoginAction } from '@server/_action/user-action';
import { useMembershipByUser } from '@server/_action/membership-action';
import { useExchanges, useExchangesByUser } from '@server/_action/exchanges-action';
import { useCategoryOfCardByUser } from '@server/_action/card-action';
import { useSkins } from '@server/_action/skin-action';
import { useEarnByUser } from '@server/_action/earn-action';

import TypographyLarge from "@ui/components/typography/large";
import TypographySmall from '@ui/components/typography/small';

const OnBroadingPage = () => {
    const { initDataTelegram } = useAppSelector(state => state.app)
    const router = useRouter();
    const userInitAction = userLoginAction();

    const [initialized, setInitialized] = useState(false);
    const [progress, setProgress] = useState(0);

    const actions = [
        useExchanges(),
        useFriends(),
        useEarnByUser(),
        useSkins(),
        useCategoryOfCardByUser(),
        useExchangesByUser(),
        useMembershipByUser(),
        useRankUsers()
    ];

    const urlParams = new URLSearchParams(window.location.search);
    const startAppParam = urlParams.get('startapp') ?? '';
    const matchResult = startAppParam.match(/\d+/);
    const startAppId = matchResult ? matchResult[0] : null;

    async function getUserRows(user: any) {
        return {
            telegram_id: String(user.id),
            username: user.username,
            photo_url: user.photo_url,
            first_name: user.first_name,
            last_name: user.last_name,
            is_bot: user.is_bot,
            is_premium: user.is_premium,
            language_code: user.language_code,
            reference_telegram_id: startAppId
        }
    }

    const fetchData = async (user: any) => {
        try {
            const body = await getUserRows(user);
            const userData = await userInitAction.mutateAsync(body);

            if (!userData.data) {
                toast({
                    variant: 'error',
                    title: 'Expected user.data to be undefined',
                });
            }

            const tasks = actions.map((action, index) => {
                if (!action || !action.mutateAsync) {
                    toast({
                        variant: 'error',
                        title: `Action at index ${index} is not defined or does not have a mutateAsync method.`,
                    });
                    return null; // Filter out invalid actions
                }

                let params = {};
                switch (index) {
                    case 0: case 1: case 2:
                        params = { user_id: userData.data.id };
                        break;
                    case 3: case 4:
                        params = { user_id: userData.data.id, exchange_id: userData.data.profitPerHour?.exchange_id || 51 };
                        break;
                    case 5: case 6: case 7:
                        params = { user_id: userData.data.id };
                        break;
                    default:
                        console.warn(`No specific params for action at index ${index}`);
                }

                return action.mutateAsync(params);
            }).filter(Boolean);

            const results = await Promise.allSettled(tasks); //Refactor

            results.forEach((result, index) => {
                if (result.status === "fulfilled") {
                    toast({
                        variant: 'success',
                        title: `Data completed successfully`,
                    });
                    setProgress(prev => prev + (100 / tasks.length));
                } else {
                    toast({
                        variant: 'error',
                        title: `Task ${index + 1} failed: ${result.reason}`,
                    });
                }
            });

            setInitialized(true);
        } catch (error) {
            console.error('Error initializing app:', error);
        }
    };

    useEffect(() => {
        const initializeApp = async () => {
            try {
                if (initDataTelegram) {
                    await fetchData(initDataTelegram);
                }else{
                    toast({
                        variant: 'destructive',
                        title: `Data telegram is installed`,
                    });
                }
            } catch (error) {
                console.error('Error during initialization:', error);
            }
        };

        initializeApp();
    }, [initDataTelegram]);

    useEffect(() => {
        if (initialized) {
            router.push('/exchange', undefined);
        }
    }, [initialized, router]);

    return (
        <div className="relative w-full flex flex-col items-end justify-end h-screen bg-[url('/project/bg_onbroad.jpg')] bg-cover bg-no-repeat bg-center">
            <div className="absolute top-0 w-full h-[3px]">
                <div className="h-full progress-bar" style={{ width: `${progress}%` }}></div>
            </div>
            <div className='w-full h-[100px] flex flex-col gap-2 items-center justify-center'>
                <svg className='animate-spin' width="58" height="58" viewBox="0 0 58 58" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M56.1013 29C57.1499 29 58.0065 28.1489 57.9379 27.1026C57.5969 21.901 55.8587 16.8745 52.8905 12.5609C49.5627 7.7247 44.8455 4.01233 39.3625 1.91462C33.8796 -0.183096 27.8891 -0.567366 22.183 0.812613C16.477 2.19259 11.3241 5.27183 7.40566 9.64323C3.48722 14.0146 0.987742 19.4723 0.237679 25.2948C-0.512385 31.1172 0.522291 37.0302 3.20491 42.2519C5.88753 47.4737 10.0918 51.7583 15.2618 54.5394C19.8731 57.0199 25.059 58.2001 30.2668 57.9723C31.3144 57.9265 32.0671 56.9823 31.9528 55.94C31.8386 54.8976 30.9005 54.1528 29.8525 54.1882C25.4103 54.3386 20.9949 53.3115 17.0607 51.1952C12.5677 48.7783 8.91395 45.0547 6.5826 40.5167C4.25125 35.9787 3.35206 30.84 4.0039 25.7799C4.65575 20.7199 6.82794 15.9769 10.2333 12.1779C13.6386 8.37887 18.1168 5.70284 23.0757 4.50356C28.0345 3.30427 33.2406 3.63823 38.0056 5.46126C42.7706 7.28429 46.8702 10.5106 49.7622 14.7135C52.2945 18.3937 53.7967 22.6709 54.1312 27.1031C54.2101 28.1487 55.0527 29 56.1013 29Z" fill="url(#paint0_linear_37_172)"></path>
                    <defs>
                        <linearGradient id="paint0_linear_37_172" x1="29" y1="58" x2="29" y2="2.73685e-07" gradientUnits="userSpaceOnUse">
                            <stop stopColor="white"></stop>
                            <stop offset="1" stopColor="#FFC14A"></stop>
                        </linearGradient>
                    </defs>
                </svg>
                <TypographyLarge text="Đang tải" className="text-2xl text-white" />
            </div>
            <div className="loading-launch-bottom">
                <TypographyLarge text="Lion King Token" className="text-2xl text-[#ffc147] font-black" />
                <TypographySmall text="will be launched" className="text-[14px] text-[#fff8] font-bold" />
                <TypographySmall text="on TON" className="mt-2 text-5xl font-black text-white" />
            </div>
        </div>
    );
};

export default OnBroadingPage;
