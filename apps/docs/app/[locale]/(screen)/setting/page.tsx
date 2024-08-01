'use client'

import { useRouter } from '@shared/next-intl/navigation';
import { useTranslations, useLocale } from 'next-intl';

import TypographyLarge from "@ui/components/typography/large"
import TypographySmall from "@ui/components/typography/small"

import { useAppSelector } from "@shared/redux/store/index";
import { LANGUAGES } from "@shared/constant/app"

const { initHapticFeedback } = require('@telegram-apps/sdk-react');

export default function Page(): JSX.Element {
    const t = useTranslations('screens.setting')

    const { user } = useAppSelector(state => state.app);

    const locale = useLocale()
    const router = useRouter()
    const haptic = initHapticFeedback();

    return (
        <div className="w-full h-screen relative overflow-y-auto overflow-hidden p-5 space-y-4 text-center bg-black">
            <TypographyLarge text={t('title')} className="text-white text-4xl" />
            <div className="w-full flex justify-between items-center rounded-2xl min-h-[64px] px-3 bg-[#272a2f] cursor-pointer" onClick={() => {
                router.push('/setting/languages')
                haptic.impactOccurred('medium');
            }}>
                <div className="flex flex-col justify-start items-start">
                    <TypographySmall text={t('language')} className="text-[14px] text-white" />
                    <TypographySmall text={LANGUAGES.find(item => item.code === locale)?.name || ''} className="text-[14px] text-[#8b8e93]" />
                </div>
                <div className="earn-item-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" xmlSpace="preserve"><path d="M9 20.6c-.3 0-.6-.1-.8-.3-.4-.4-.4-1.2 0-1.6l6.7-6.7-6.7-6.7c-.4-.4-.4-1.2 0-1.6s1.2-.4 1.6 0l7.5 7.5c.4.4.4 1.2 0 1.6l-7.5 7.5c-.2.2-.5.3-.8.3z" fill="currentColor"></path></svg>
                </div>
            </div>
            <div className="w-full flex justify-between items-center rounded-2xl min-h-[64px] px-3 bg-[#272a2f] cursor-pointer" onClick={() => {
                router.push('/setting/exchanges')
                haptic.impactOccurred('medium');
            }}>
                <div className="flex flex-col justify-start items-start">
                    <TypographySmall text={t('exchange')} className="text-[14px] text-white" />
                    <TypographySmall text={user.exchange.name} className="text-[14px] text-[#8b8e93]" />
                </div>
                <div className="earn-item-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" xmlSpace="preserve"><path d="M9 20.6c-.3 0-.6-.1-.8-.3-.4-.4-.4-1.2 0-1.6l6.7-6.7-6.7-6.7c-.4-.4-.4-1.2 0-1.6s1.2-.4 1.6 0l7.5 7.5c.4.4.4 1.2 0 1.6l-7.5 7.5c-.2.2-.5.3-.8.3z" fill="currentColor"></path></svg>
                </div>
            </div>
            <div className="w-full flex justify-between items-center rounded-2xl min-h-[64px] px-3 bg-[#272a2f]">
                <div className="flex justify-start items-center gap-2">
                    <TypographySmall text={t('delete_account')} className="text-[14px] text-white" />
                </div>
                <div className="earn-item-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" xmlSpace="preserve"><path d="M9 20.6c-.3 0-.6-.1-.8-.3-.4-.4-.4-1.2 0-1.6l6.7-6.7-6.7-6.7c-.4-.4-.4-1.2 0-1.6s1.2-.4 1.6 0l7.5 7.5c.4.4.4 1.2 0 1.6l-7.5 7.5c-.2.2-.5.3-.8.3z" fill="currentColor"></path></svg>
                </div>
            </div>
        </div>
    )
}
