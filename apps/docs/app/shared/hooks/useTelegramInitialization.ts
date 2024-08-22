import { useEffect, useMemo } from "react";

const {
    postEvent,
    useInitData,
    useLaunchParams,
    useMiniApp,
    useThemeParams,
    useViewport,
    initBackButton,
    bindMiniAppCSSVars,
    bindThemeParamsCSSVars,
    bindViewportCSSVars,
} = require("@telegram-apps/sdk-react");


function getUserRows(user: any) {
    return {
        id: user.id.toString(),
        username: user.username,
        photo_url: user.photoUrl,
        last_name: user.lastName,
        first_name: user.firstName,
        is_bot: user.isBot,
        is_premium: user.isPremium,
        language_code: user.languageCode,
        allows_to_write_to_pm: user.allowsWriteToPm,
        added_to_attachment_menu: user.addedToAttachmentMenu
    };
}

export function useTelegramInitialization() {
    const [backButton] = initBackButton();
    const lp = useLaunchParams();
    const miniApp = useMiniApp();
    const themeParams = useThemeParams();
    const viewport = useViewport();
    const initData = useInitData();

    useEffect(() => {
        try {
            lp.platform === 'ios' && postEvent('web_app_set_header_color', { color: '#000' });
            lp.platform === 'ios' && postEvent('web_app_expand');
            lp.platform === 'ios' && postEvent('web_app_setup_swipe_behavior', { allow_vertical_swipe: false })
            backButton && backButton.show();
        } catch (error) {
            console.log(error);
        }
    }, []);

    useEffect(() => bindMiniAppCSSVars(miniApp, themeParams), [miniApp, themeParams]);
    useEffect(() => bindThemeParamsCSSVars(themeParams), [themeParams]);
    useEffect(() => viewport && bindViewportCSSVars(viewport), [viewport]);

    const userRows = useMemo<any | undefined>(() => {
        return initData && initData.user ? getUserRows(initData.user) : undefined;
    }, [initData]);

    return { lp, initData: userRows };
}
