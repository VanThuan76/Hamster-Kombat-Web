'use client'

import Image from "next/image"
import Link from "next/link"

import TypographyLarge from "@ui/components/typography/large"
import { useTranslations } from "next-intl"

export default function Page(): JSX.Element {
    const t = useTranslations("other")
    return (
        <div className="w-full h-screen relative flex flex-col justify-center items-center space-y-2 overflow-y-auto p-5 text-center bg-black pb-40">
            <TypographyLarge text={t("qr")} className="text-white text-[32px]" />
            <div className="w-full flex justify-center items-center">
                <Link href="https://t.me/austin_vu_bot/HamsterKombatLocal" target="_blank">
                    <Image src="/project/qr_tele.png" alt="@tele" width={240} height={240} className="object-cover rounded-lg" />
                </Link>
            </div>
        </div>
    )
}