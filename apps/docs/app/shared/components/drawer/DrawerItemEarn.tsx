'use client'

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Button } from "@ui/components/button"

import Drawer from "@ui/components/drawer"
import TypographyLarge from "@ui/components/typography/large";
import TypographySmall from "@ui/components/typography/small";

import CoinIcon from "@shared/components/CoinIcon"

import { useDraw } from "@shared/hooks/useDraw";
import { useAppSelector } from "@shared/redux/store";
import { useRouter } from "@shared/next-intl/navigation";
import { formatCoinStyleDot } from "@shared/utils/formatNumber"

import { useUpdateEarn } from "@server/_action/earn-action";
import { EarnDetail } from "@server/_types/earn";

const { initUtils } = require('@telegram-apps/sdk-react');

export default function DrawerItemEarn(): JSX.Element {
    const { earns, user } = useAppSelector(state => state.app)
    const { isOpen, data, onClose, type } = useDraw()
    const isDrawerOpen = isOpen && type === "itemEarn"

    const t = useTranslations('screens.earn')

    const router = useRouter()
    const utils = initUtils();
    const updateEarn = useUpdateEarn()

    function containsHttps(link: string) {
        return link.includes('https://');
    }

    function handleSuccess(earn: EarnDetail) {
        earn.link !== null && containsHttps(earn.link) ? utils.openLink(earn.link, { tryBrowser: true }) : earn.link !== null && router.push(earn.link)
        earn.is_completed === 0 && updateEarn.mutate({
            user_id: user.id,
            user_earn_id: earn.user_earn_id,
            is_completed: 1
        })
        onClose()
    }

    return (
        <Drawer isOpen={isDrawerOpen} onClose={onClose} className="w-full card-has-glow min-h-[50%] h-[60%] border-none">
            <div className="w-full flex flex-col justify-center items-center gap-8">
                <div className="relative visible">
                    <div className="relative z-10">
                        <Image src={process.env.NEXT_PUBLIC_DOMAIN_BACKEND + '/' + data?.image} alt={data?.name} width={115} height={115} priority={true} />
                    </div>
                </div>
                <div className="w-full flex flex-col justify-center items-center gap-5">
                    <TypographyLarge text={data?.name} className="text-white text-center text-[32px] font-bold" />
                    <div className="flex justify-center items-center gap-1">
                        <CoinIcon width={28} height={28} />
                        <TypographySmall text={`+${formatCoinStyleDot(data?.reward)}`} className="text-2xl text-white ml-1" />
                    </div>
                </div>
                <Button className="w-full h-[80px] bg-[#5a60ff] hover:bg-[#5a60ff]/90 text-white flex justify-center items-center gap-2 rounded-2xl" onClick={() => handleSuccess(data)}>
                    <TypographyLarge
                        text={earns.find(item => item.type === 3)?.earn[0]?.is_completed === 0 ? t('btn_require') : t('btn_back')}
                        className="text-white text-xl font-bold"
                    />
                    <CoinIcon width={28} height={28} />
                </Button>
            </div>
        </Drawer>
    )
}