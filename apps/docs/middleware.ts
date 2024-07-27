import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
    locales: ['en', 'vi'],
    defaultLocale: 'vi',
    localePrefix: 'always',
});

export const config = {
    matcher: [
        '/',
        '/(vi|en)/:path*',
        '/(vi|en)/screens/:path*', 
    ],
};