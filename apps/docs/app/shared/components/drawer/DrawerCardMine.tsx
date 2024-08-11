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
import { formatCoinStyleDot } from "@shared/utils/formatNumber";

import { useBuyCard } from "@server/_action/card-action";
import { CardList } from "@server/_types/card";

export default function DrawerCardMine(): JSX.Element {
    const { user } = useAppSelector(state => state.app)
    const { isOpen, onClose, data, type } = useDraw()
    const isDrawerOpen = isOpen && type === "cardMine"

    const t = useTranslations('components.drawer_info_profit')

    const buyCard = useBuyCard()

    function handleSuccess(item: CardList) {
        buyCard.mutate({
            card_id: item.card_profits[1]!.card_id,
            card_profit_id: item.card_profits[1]!.id,
            level: item.card_profits[1]!.level,
            exchange_id: user.exchange.id,
            user_id: user.id
        })
        onClose()
    }
    
    if(!data) return <></>

    return (
        <Drawer isOpen={isDrawerOpen} onClose={onClose} className="w-full card-has-glow h-[60%] border-none">
            <div className="mt-2 w-full flex flex-col justify-center items-center gap-2">
                <Image src={`${process.env.NEXT_PUBLIC_DOMAIN_BACKEND}/${data?.image}` || ''} alt="@imageTask" width={115} height={115} priority={true} />
                <TypographySmall text={data?.name} className="text-white text-[28px] font-semibold" />
                <TypographySmall text={data?.description} className="text-white text-[14px] text-center" />
                <div className="flex flex-col justify-center items-center gap-1">
                    <TypographySmall text="Lợi nhuận mỗi giờ" className="text-white text-[10px] font-extralight" />
                    <div className="flex justify-center items-center gap-1">
                        <div className="w-[16px] h-[16px]">
                            <CoinIcon width={18} height={18} className="w-full h-full" />
                        </div>
                        <TypographySmall text={`+${String(formatCoinStyleDot(data.card_profits?.find((child: any) => child.is_purchased)?.profit as number))}`} className="text-white text-[12px]" />
                    </div>
                </div>
                <div className="flex justify-center items-center gap-1">
                    <div className="w-[32px] h-[32px]">
                        <CoinIcon width={32} height={32} className="w-full h-full" />
                    </div>
                    <TypographySmall text={String(formatCoinStyleDot(data.card_profits?.find((child: any) => child.is_purchased)?.required_money as number))} className="text-white text-[12px] !m-1" />
                </div>
                <Button className="w-full h-[80px] bg-[#5a60ff] hover:bg-[#5a60ff]/90 text-white flex justify-center items-center gap-2 rounded-2xl" onClick={() => handleSuccess(data)}>
                    <TypographyLarge text="Chúc bạn may mắn!" className="text-white text-xl font-bold" />
                    <CoinIcon width={28} height={28} />
                </Button>
            </div>
        </Drawer>
    )
}