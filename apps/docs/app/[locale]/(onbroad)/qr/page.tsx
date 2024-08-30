'use client'

import Image from "next/image"
import Link from "next/link"
import { useTranslations } from "next-intl"

import TypographyLarge from "@ui/components/typography/large"

export default function Page(): JSX.Element {
    const t = useTranslations("other")

    return (
        <div className="relative flex flex-col items-center justify-center w-full h-screen p-5 pb-40 space-y-2 overflow-y-auto text-center bg-black">
            <TypographyLarge text={t("qr")}  className="text-white text-[32px]" />
            <div className="flex items-center justify-center w-full">
                <Link href="https://t.me/austin_vu_bot/HamsterKombatLocal" target="_blank">
                    <Image src="/project/qr_tele.png" alt="@tele" width={240} height={240} className="object-cover rounded-lg" />
                </Link>
            </div>
        </div>
    )
}
