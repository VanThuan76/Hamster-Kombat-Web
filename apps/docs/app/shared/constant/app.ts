export const APP_SAVE_KEY = {
    LOCALE: process.env.NEXT_PUBLIC_APP_NAME + "::locale",
    TELEGRAM_ID: process.env.NEXT_PUBLIC_APP_NAME + "::telegram_id",
    TOKEN_KEY: process.env.NEXT_PUBLIC_APP_NAME + "::token_key",
    LOGIN_STATUS: process.env.NEXT_PUBLIC_APP_NAME + "::login_status",
};

export const LANGUAGES = [
    {
        name: 'Tiếng Việt',
        code: 'vi'
    },
    {
        name: 'English',
        code: 'en'
    }
]

export const RANKS = [
    {
        name: 'Bronze',
        from: 0,
        to: 10000
    },
    {
        name: 'Silver',
        from: 10000,
        to: 25000
    },
    {
        name: 'Gold',
        from: 25000,
        to: 100000
    },
    {
        name: 'Platinum',
        from: 100000,
        to: 1000000
    }, {
        name: 'Diamond',
        from: 1000000,
        to: 2000000
    },
    {
        name: 'Epic',
        from: 2000000,
        to: 10000000
    },
    {
        name: 'Legendary',
        from: 10000000,
        to: 20000000
    },
    {
        name: 'Master',
        from: 20000000,
        to: 50000000
    },
    {
        name: 'Grandmaster',
        from: 20000000,
        to: 50000000
    },
    {
        name: 'Lord',
        from: 50000000,
        to: 100000000
    },
    {
        name: 'Creator',
        from: 100000000,
        to: 1800000000
    }
]