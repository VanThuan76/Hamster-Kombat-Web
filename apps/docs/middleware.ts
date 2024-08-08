import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
    locales: ['en', 'vi', 'hi', 'pt', 'es', 'de', 'fr', 'ru', 'tr'],
    defaultLocale: 'vi',
    localePrefix: 'always',
});

export const config = {
    matcher: [
        '/',
        '/(vi|en|hi|pt|es|de|fr|ru|tr)/:path*',
        '/(vi|en|hi|pt|es|de|fr|ru|tr)/screens/:path*', 
    ],
};