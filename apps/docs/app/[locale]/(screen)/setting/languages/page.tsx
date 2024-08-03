'use client'

import { useTranslations } from 'next-intl';
import { usePathname, useRouter } from '@shared/next-intl/navigation';

import TypographyLarge from "@ui/components/typography/large"
import TypographySmall from "@ui/components/typography/small"

import useBackButton from "@shared/hooks/useBackButton"
import { LANGUAGES } from "@shared/constant/app"

export default function Page(): JSX.Element {
    const t = useTranslations('screens.setting')

    const router = useRouter()
    const pathname = usePathname()

    const handleLanguageChange = (code: string) => {
        router.push(pathname, { locale: code });
    }
    useBackButton()

    return (
        <div className="w-full min-h-screen relative overflow-y-auto bg-black">
            <div className="p-5 space-y-4 text-center text-white overflow-y-auto h-full">
                <TypographyLarge text={t('language')} className="text-4xl" />
                {LANGUAGES.map((item, i) => {
                    return (
                        <div key={i} className="w-full flex justify-between items-center rounded-2xl min-h-[64px] px-3 bg-[#272a2f]" onClick={() => handleLanguageChange(item.code)}>
                            <TypographySmall text={`${item.name} (${item.code})`} className="text-[14px]" />
                            <div className="earn-item-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" xmlSpace="preserve"><path d="M9 20.6c-.3 0-.6-.1-.8-.3-.4-.4-.4-1.2 0-1.6l6.7-6.7-6.7-6.7c-.4-.4-.4-1.2 0-1.6s1.2-.4 1.6 0l7.5 7.5c.4.4.4 1.2 0 1.6l-7.5 7.5c-.2.2-.5.3-.8.3z" fill="currentColor"></path></svg>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}