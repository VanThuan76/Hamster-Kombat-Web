'use client';

import React, { useEffect, useState, useCallback } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";

import { usePathname } from "next/navigation";
import { useRouter } from "@shared/next-intl/navigation";
import { useAppSelector } from "@shared/redux/store/index";
import { cn } from "@ui/lib/utils";

import TypographySmall from "@ui/components/typography/small";

const { initHapticFeedback } = require('@telegram-apps/sdk-react');

export const BottomNav = () => {
    const t = useTranslations('menu')

    const { user } = useAppSelector(state => state.app);

    const [navItems, setNavItems] = useState([
        {
            name: t('exchange'),
            link: "/exchange",
            icon: '/project/icon_ava_plus.png'
        },
        {
            name: t('mine'),
            link: "/mine",
            icon: '/project/icon_mine.svg'
        },
        {
            name: t('friends'),
            link: "/friends",
            icon: '/project/icon_friends.svg'
        },
        {
            name: t('earn'),
            link: "/earn",
            icon: '/project/icon_earn.svg'
        },
        {
            name: "Airdrop",
            link: "/airdrop",
            icon: '/project/icon_hamster-coin.png'
        },
    ]);

    useEffect(() => {
        setNavItems(currentItems =>
            currentItems.map(item =>
                item.link === "/exchange" ? { ...item, icon: user.exchange.icon } : item
            )
        );
    }, [user.exchange.icon]);

    const haptic = initHapticFeedback();
    const router = useRouter();
    const path = usePathname();
    const checkPath = path.split("/");

    const isSvg = useCallback((filePath: string | undefined): boolean => {
        return filePath ? filePath.endsWith('.svg') : false;
    }, []);

    const handleLinkClick = useCallback((link: string) => {
        haptic.impactOccurred('medium');
        router.push(link);
    }, [haptic, router]);

    return (
        <div
            className={cn(
                "flex w-[92%] fixed bottom-1 inset-x-0 mx-auto border border-transparent dark:border-white/[0.2] rounded-2xl dark:bg-black bg-[#272a2f] shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] z-[5000] py-1 items-center justify-center space-x-2",
            )}
        >
            {navItems.map((navItem: any, index: number) => (
                <div
                    key={`link-${index}`}
                    onClick={() => handleLinkClick(navItem.link)}
                    className={cn(
                        "relative w-full dark:text-neutral-50 flex flex-col justify-center items-center text-neutral-600 dark:hover:text-neutral-300 hover:text-neutral-500 cursor-pointer px-2 py-1",
                        checkPath?.includes(navItem.link.split("/")[1]) ? 'bg-[#1c1f24] rounded-xl' : 'bg-transparent'
                    )}
                >
                    <Image
                        src={navItem.icon}
                        alt={navItem.name}
                        width={28}
                        height={28}
                        className={cn(isSvg(navItem.icon) && index !== 0 && "hover:filter hover:brightness-0 hover:invert", checkPath?.includes(navItem.link.split("/")[1]) && index !== 0 && isSvg(navItem.icon) && 'filter brightness-0 invert')}
                        priority
                    />
                    <TypographySmall text={navItem.name} className={cn('text-[10px]', checkPath?.includes(navItem.link.split("/")[1]) ? 'text-white' : 'text-[#8b8e93]')} />
                </div>
            ))}
        </div>
    );
};

export default BottomNav;