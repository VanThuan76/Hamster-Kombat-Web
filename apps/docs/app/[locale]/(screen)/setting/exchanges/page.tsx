'use client'

import Image from "next/image"
import { useRouter } from '@shared/next-intl/navigation';

import MotionContainer from "@ui/components/motion/Container"
import TypographyLarge from "@ui/components/typography/large"
import TypographySmall from "@ui/components/typography/small"

import useBackButton from "@shared/hooks/useBackButton"
import { useAppDispatch, useAppSelector } from "@shared/redux/store/index"
import { setUserExchange } from "@shared/redux/store/appSlice"

import { useUpdateExchange } from "@server/_action/exchanges-action";
import { IExchangesOrigin } from "@server/_types/exchanges";

export default function Page(): JSX.Element {
    const { user, exchanges } = useAppSelector(state => state.app)

    const dispatch = useAppDispatch()
    const router = useRouter()

    const updateExchange = useUpdateExchange()
    useBackButton()

    function handleUpdateExchange(item: IExchangesOrigin) {
        dispatch(setUserExchange({ id: item.id, name: item.name, icon: process.env.NEXT_PUBLIC_DOMAIN_BACKEND + '/' + item.image }));
        updateExchange.mutate({ user_id: user.id, exchange_id: item.id })
        router.push('/exchange', undefined);
    }
    return (
        <div className="w-full h-screen relative overflow-y-auto bg-black pb-14">
            <div className="p-5 space-y-4 text-center text-white overflow-y-auto h-full">
                <TypographyLarge text='Chọn sàn giao dịch' className="text-4xl" />
                {exchanges.map((item, i) => {
                    return (
                        <div key={i} className="w-full flex justify-between items-center rounded-2xl min-h-[64px] px-3 bg-[#272a2f]"
                            onClick={() => handleUpdateExchange(item)}
                        >
                            <div className="flex justify-start items-center gap-2">
                                <MotionContainer type="scale">
                                    <Image src={item.image_url} alt={item.name} width={40} height={40} />
                                </MotionContainer>
                                <TypographySmall text={item.name} className="text-[14px]" />
                            </div>
                            <div className="earn-item-icon">
                                {user.exchange.name.toLowerCase() !== item.name.toLowerCase() ?
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" xmlSpace="preserve"><path d="M9 20.6c-.3 0-.6-.1-.8-.3-.4-.4-.4-1.2 0-1.6l6.7-6.7-6.7-6.7c-.4-.4-.4-1.2 0-1.6s1.2-.4 1.6 0l7.5 7.5c.4.4.4 1.2 0 1.6l-7.5 7.5c-.2.2-.5.3-.8.3z" fill="currentColor"></path></svg>
                                    :
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" xmlSpace="preserve"><path d="M9 19.9c-.3 0-.6-.1-.8-.3L3 14.3c-.4-.4-.4-1.2 0-1.6s1.2-.4 1.6 0L9 17.2 20.2 6c.4-.4 1.2-.4 1.6 0 .4.4.4 1.2 0 1.6l-12 12c-.2.2-.5.3-.8.3z" fill="currentColor"></path></svg>
                                }
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}