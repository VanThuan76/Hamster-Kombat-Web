const { createSharedPathnamesNavigation } = require('next-intl/navigation');

export const locales = ['en', 'vi'] as const;
export const localePrefix = 'always'; // Default

export const { Link, redirect, usePathname, useRouter } =
    createSharedPathnamesNavigation({ locales, localePrefix });