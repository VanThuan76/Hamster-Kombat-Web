"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

import { cn } from "@ui/lib/utils";
import TypographySmall from "@ui/components/typography/small"

import navItems from "../shared/constant/navItems";

export const BottomNav = () => {
    const path = usePathname();
    const checkPath = path.split("/")[1] //Fixed

    function isSvg(filePath: string) {
        return filePath.endsWith('.svg');
    }

    return (
        <div
            className={cn(
                "flex w-[90%] fixed bottom-2 inset-x-0 mx-auto border border-transparent dark:border-white/[0.2] rounded-2xl dark:bg-black bg-[#272a2f] shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] z-[5000] px-4 py-1 items-center justify-center space-x-4",
            )}
        >
            {navItems.map((navItem: any, idx: number) => (
                <Link
                    key={`link=${idx}`}
                    href={navItem.link}
                    className={cn(
                        "relative w-full dark:text-neutral-50 flex flex-col justify-center items-center gap-1 space-x-1 text-neutral-600 dark:hover:text-neutral-300 hover:text-neutral-500 cursor-pointer px-3 py-1",
                        checkPath === navItem.link.split("/")[1] ? 'bg-[#1c1f24] rounded-xl' : 'bg-transparent'
                    )}
                >
                    <Image
                        src={navItem.icon}
                        alt={navItem.name}
                        width={28}
                        height={28}
                        className={cn(isSvg(navItem.icon) && "hover:filter hover:brightness-0 hover:invert", checkPath === navItem.link.split("/")[1] && isSvg(navItem.icon) && 'filter brightness-0 invert')}
                    />
                    <TypographySmall text={navItem.name} className={cn('text-[10px]', checkPath === navItem.link.split("/")[1] ? 'text-white' : 'text-[#8b8e93]')} />
                </Link>
            ))}
        </div>
    );
};
