'use client'

import Image from "next/image";
import { useTranslations } from "next-intl";
import { cn } from "@ui/lib/utils"

import { Button } from "@ui/components/button"
import Drawer from "@ui/components/drawer"
import TypographyLarge from "@ui/components/typography/large";
import TypographySmall from "@ui/components/typography/small";

import CoinIcon from "@shared/components/CoinIcon"

import { useDraw } from "@shared/hooks/useDraw";
import { useAppSelector } from "@shared/redux/store";
import { formatCoinStyleDot } from "@shared/utils/formatNumber";

import { useBuyCard } from "@server/_action/card-action";

export default function DrawerCardMine(): JSX.Element {
    const { user } = useAppSelector(state => state.app)
    const { isOpen, onClose, data, type } = useDraw()
    const isDrawerOpen = isOpen && type === "cardMine"

    const t = useTranslations('components.drawer_info_profit')

    const currentCardProfit = data?.card_profits?.find((child: any) => child.is_purchased) || data?.card_profits?.find((child: any) => child.id === 1)
    const nextCardProfit = currentCardProfit && data?.card_profits?.find((child: any) => child.level === currentCardProfit.level + 1)

    const buyCard = useBuyCard()

    function handleSuccess() {
        buyCard.mutate({
            card_id: nextCardProfit.card_id,
            card_profit_id: nextCardProfit.id,
            level: nextCardProfit.level,
            exchange_id: user.exchange.id,
            user_id: user.id
        })
        onClose()
    }

    if (!data) return <></>

    return (
        <Drawer isOpen={isDrawerOpen} onClose={onClose} className="w-full card-has-glow min-h-[60%] border-none">
            <div className="flex flex-col items-center justify-center w-full gap-2 mt-2">
                <Image src={`${process.env.NEXT_PUBLIC_DOMAIN_BACKEND}/${data?.image}` || ''} alt="@imageTask" width={115} height={115} priority={true} />
                <TypographySmall text={data?.name} className="text-white text-[28px] font-semibold" />
                <TypographySmall text={data?.description} className="text-white text-[14px] text-center" />
                <div className="flex flex-col items-center justify-center gap-1">
                    <TypographySmall text="Lợi nhuận mỗi giờ" className="text-white text-[10px] font-extralight" />
                    <div className="flex items-center justify-center gap-1">
                        <div className="w-[16px] h-[16px]">
                            <CoinIcon width={18} height={18} className={cn("w-full h-full", !data.hasBuy && 'coin-is-grayscale')} />
                        </div>
                        <TypographySmall text={`+${String(formatCoinStyleDot(data.card_profits?.find((child: any) => child.is_purchased)?.next_level.profit as number))}`} className="text-white text-[12px]" />
                    </div>
                </div>
                <div className="flex items-center justify-center gap-1">
                    <div className="w-[32px] h-[32px]">
                        <CoinIcon width={32} height={32} className={cn("w-full h-full", !data.hasBuy && 'coin-is-grayscale')} />
                    </div>
                    <TypographySmall text={String(formatCoinStyleDot(data.card_profits?.find((child: any) => child.is_purchased)?.next_level.required_money as number))} className="text-white text-[12px] !m-1" />
                </div>
                {data.hasBuy ? (
                    <Button className="w-full h-[80px] bg-[#5a60ff] hover:bg-[#5a60ff]/90 text-white flex justify-center items-center gap-2 rounded-2xl" onClick={() => handleSuccess()}>
                        <TypographyLarge text="Chúc bạn may mắn!" className="text-xl font-bold text-white" />
                        <CoinIcon width={28} height={28} />
                    </Button>
                ) : (
                    <Button className="w-full h-[80px] bg-[#4e4f50cc] hover:bg-[#4e4f50cc] text-white flex justify-center items-center gap-2 rounded-2xl pointer-events-none">
                        <TypographyLarge text="Không đủ tiền" className="text-xl font-bold text-white" />
                    </Button>
                )}
            </div>
        </Drawer>
    )
}
