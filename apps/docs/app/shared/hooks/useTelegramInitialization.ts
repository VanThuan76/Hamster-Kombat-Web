import { useEffect } from "react";

const {
    useInitData,
    useLaunchParams,
    useMiniApp,
    useThemeParams,
    useViewport,
    postEvent,
    initBackButton,
    bindMiniAppCSSVars,
    bindThemeParamsCSSVars,
    bindViewportCSSVars,
} = require('@telegram-apps/sdk-react');

export function useTelegramInitialization() {
    const [backButton] = initBackButton();
    const lp = useLaunchParams();
    const miniApp = useMiniApp();
    const themeParams = useThemeParams();
    const viewport = useViewport();
    const initData = useInitData();

    useEffect(() => {
        if (postEvent) {
            postEvent('web_app_set_header_color', { color: '#000' });
            postEvent('web_app_expand');
            postEvent('web_app_setup_swipe_behavior');
        }
        backButton.show();
    }, []);

    useEffect(() => bindMiniAppCSSVars(miniApp, themeParams), [miniApp, themeParams]);
    useEffect(() => bindThemeParamsCSSVars(themeParams), [themeParams]);
    useEffect(() => viewport && bindViewportCSSVars(viewport), [viewport]);

    return { lp, initData };
}