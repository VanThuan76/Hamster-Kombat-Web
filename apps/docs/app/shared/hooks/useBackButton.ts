'use client'

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useRouter } from '@shared/next-intl/navigation';

const { initBackButton } = require('@telegram-apps/sdk-react');

const useBackButton = () => {
    const router = useRouter();
    const pathName = usePathname()

    useEffect(() => {
        const [bb] = initBackButton();
        if (!pathName.includes('/exchange')) {
            bb.show();
            const handleClick = () => {
                router.push('/exchange', undefined);
            };
            bb.on('click', handleClick);

            // Cleanup function to remove event listener
            return () => {
                bb.off('click', handleClick);
            };
        } else {
            bb.hide();
        }
    }, [pathName, router]);
};

export default useBackButton;
