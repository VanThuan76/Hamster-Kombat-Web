'use client';

import { type PropsWithChildren, useEffect } from 'react';
import { useRouter } from '@shared/next-intl/navigation';

import { THEME, TonConnectUIProvider } from '@tonconnect/ui-react';
import { AppRoot } from '@telegram-apps/telegram-ui';

import { ErrorBoundary } from '@shared/components/ErrorBoundary';
import { ErrorPage } from '@shared/components/ErrorPage';

import { useDidMount } from '@shared/hooks/useDidMount';
import { useAppDispatch } from '@shared/redux/store';
import { setInitDataTelegram } from '@shared/redux/store/appSlice';
import { useTelegramMock } from '@shared/hooks/useTelegramMock';
import { useTelegramInitialization } from '@shared/hooks/useTelegramInitialization';
import { toast } from '@shared/hooks/useToast';

const { SDKProvider, useLaunchParams } = require('@telegram-apps/sdk-react');

function App(props: PropsWithChildren) {
    const dispatch = useAppDispatch()
    const router = useRouter();

    const { lp, initData } = useTelegramInitialization();

    useEffect(() => {
        if (initData) {
            dispatch(setInitDataTelegram(initData));
        } else {
            toast({
                variant: 'error',
                title: `Failed to get information from telegram app. Please check settings on telegram`,
            });
        }
    }, [initData])

    // useEffect(() => {
    //     if (['tdesktop', 'weba', 'web'].includes(lp.platform)) {
    //         router.push('/qr', undefined);
    //     }
    // }, [lp, router]);

    return (
        <AppRoot
            appearance='dark'
            platform={['macos', 'ios'].includes(lp.platform) ? 'ios' : 'base'}
        >
            {props.children}
        </AppRoot>
    );
}

function RootInner({ children }: PropsWithChildren) {
    // Mock Telegram environment in development mode if needed.
    if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useTelegramMock();
    }

    const debug = useLaunchParams().startParam === 'debug';

    function isTonConnectSdkError(error: Error | string) {
        const tonConnectError = 'TON_CONNECT_SDK';
        if (typeof error === 'string') {
            return error.includes(tonConnectError);
        }

        return error.message?.includes(tonConnectError);
    }

    useEffect(() => {
        window.addEventListener('unhandledrejection', function (rejection: PromiseRejectionEvent) {
            // handle rejection
            if (isTonConnectSdkError(rejection.reason)) {
                // ignore TonConnect sdk errors, they are handlded by sentry
                return;
            }
        });
    }, [])

    // Enable debug mode to see all the methods sent and events received.
    useEffect(() => {
        if (debug) {
            import('eruda').then((lib) => lib.default.init());
        }
    }, [debug]);

    return (
        <TonConnectUIProvider
            manifestUrl={`https://${process.env.VERCEL_URL}/tonconnect-manifest.json`}
            uiPreferences={{ theme: THEME.DARK }}
            walletsListConfiguration={{
                includeWallets: [
                    {
                        appName: "tonwallet",
                        name: "TON Wallet",
                        imageUrl: "https://wallet.ton.org/assets/ui/qr-logo.png",
                        aboutUrl: "https://chrome.google.com/webstore/detail/ton-wallet/nphplpgoakhhjchkkhmiggakijnkhfnd",
                        universalLink: "https://wallet.ton.org/ton-connect",
                        jsBridgeKey: "tonwallet",
                        bridgeUrl: "https://bridge.tonapi.io/bridge",
                        platforms: ["chrome", "android"]
                    },
                    {
                        appName: "nicegramWallet",
                        name: "Nicegram Wallet",
                        imageUrl: "https://static.nicegram.app/icon.png",
                        aboutUrl: "https://nicegram.app",
                        universalLink: "https://nicegram.app/tc",
                        deepLink: "nicegram-tc://",
                        jsBridgeKey: "nicegramWallet",
                        bridgeUrl: "https://bridge.tonapi.io/bridge",
                        platforms: ["ios", "android"]
                    },
                    {
                        appName: "binanceTonWeb3Wallet",
                        name: "Binance Web3 Wallet",
                        imageUrl: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAiIGhlaWdodD0iMzAiIHZpZXdCb3g9IjAgMCAzMCAzMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjMwIiBoZWlnaHQ9IjMwIiBmaWxsPSIjMEIwRTExIi8+CjxwYXRoIGQ9Ik01IDE1TDcuMjU4MDYgMTIuNzQxOUw5LjUxNjEzIDE1TDcuMjU4MDYgMTcuMjU4MUw1IDE1WiIgZmlsbD0iI0YwQjkwQiIvPgo8cGF0aCBkPSJNOC44NzA5NyAxMS4xMjlMMTUgNUwyMS4xMjkgMTEuMTI5TDE4Ljg3MSAxMy4zODcxTDE1IDkuNTE2MTNMMTEuMTI5IDEzLjM4NzFMOC44NzA5NyAxMS4xMjlaIiBmaWxsPSIjRjBCOTBCIi8+CjxwYXRoIGQ9Ik0xMi43NDE5IDE1TDE1IDEyLjc0MTlMMTcuMjU4MSAxNUwxNSAxNy4yNTgxTDEyLjc0MTkgMTVaIiBmaWxsPSIjRjBCOTBCIi8+CjxwYXRoIGQ9Ik0xMS4xMjkgMTYuNjEyOUw4Ljg3MDk3IDE4Ljg3MUwxNSAyNUwyMS4xMjkgMTguODcxTDE4Ljg3MSAxNi42MTI5TDE1IDIwLjQ4MzlMMTEuMTI5IDE2LjYxMjlaIiBmaWxsPSIjRjBCOTBCIi8+CjxwYXRoIGQ9Ik0yMC40ODM5IDE1TDIyLjc0MTkgMTIuNzQxOUwyNSAxNUwyMi43NDE5IDE3LjI1ODFMMjAuNDgzOSAxNVoiIGZpbGw9IiNGMEI5MEIiLz4KPC9zdmc+Cg==",
                        aboutUrl: "https://www.binance.com/en/web3wallet",
                        deepLink: "bnc://app.binance.com/cedefi/ton-connect",
                        bridgeUrl: "https://bridge.tonapi.io/bridge",
                        platforms: ["chrome", "safari", "ios", "android"],
                        universalLink: "https://app.binance.com/cedefi/ton-connect"
                    },
                    {
                        appName: "okxTonWallet",
                        name: "OKX Wallet",
                        imageUrl: "https://static.okx.com/cdn/assets/imgs/247/58E63FEA47A2B7D7.png",
                        aboutUrl: "https://www.okx.com/web3",
                        universalLink: "https://www.ouxyi.link/ul/uYJPB0",
                        bridgeUrl: "https://www.okx.com/tonbridge/discover/rpc/bridge",
                        jsBridgeKey: "okxTonWallet",
                        platforms: ["chrome", "safari", "firefox", "ios", "android"]
                    },
                    {
                        appName: "okxTonWalletTr",
                        name: "OKX TR Wallet",
                        imageUrl: "https://static.okx.com/cdn/assets/imgs/247/587A8296F0BB640F.png",
                        aboutUrl: "https://tr.okx.com/web3",
                        universalLink: "https://www.ouxyi.link/ul/uYJPB0?entityId=5",
                        bridgeUrl: "https://www.okx.com/tonbridge/discover/rpc/bridge",
                        jsBridgeKey: "okxTonWallet",
                        platforms: ["chrome", "safari", "firefox", "ios", "android"]
                    }
                ]
            }}
        >
            <SDKProvider acceptCustomStyles debug={debug}>
                <App>
                    {children}
                </App>
            </SDKProvider>
        </TonConnectUIProvider>
    );
}

export default function RootContainer(props: PropsWithChildren) {
    // Unfortunately, Telegram Mini Apps does not allow us to use all features of the Server Side
    // Rendering. That's why we are showing loader on the server side.
    const didMount = useDidMount();

    return didMount ? (
        <ErrorBoundary fallback={ErrorPage}>
            <RootInner {...props} />
        </ErrorBoundary>
    ) : <div>Loading...</div>
}
