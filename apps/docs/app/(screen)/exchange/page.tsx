'use client'

import Image from "next/image"
import { useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { Progress } from "@ui/components/progress"
import { Button } from "@ui/components/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from "@ui/components/card"
import { Avatar, AvatarImage, AvatarFallback } from "@ui/components/avatar"
import { DialogDescription, DialogHeader, DialogTitle } from "@ui/components/dialog"
import { useAppSelector } from "@shared/redux/store/index"

import MotionContainer from "@ui/components/motion/container"
import TypographySmall from "@ui/components/typography/small"
import TypographyLarge from "@ui/components/typography/large"

import MineButton from "@shared/components/MineButton"
import MemoTypographyLarge from "@shared/components/MemoTypographyLarge"
import CardProfit from "@shared/components/CardProfit"

const { initHapticFeedback } = require('@telegram-apps/sdk-react');

export default function Page(): JSX.Element {
    const { user } = useAppSelector(state => state.app)

    const haptic = initHapticFeedback();
    const router = useRouter()

    const [isSecretFeature, setSecretFeature] = useState(false)
    const [progress, setProgress] = useState(80)
    const [points, setPoints] = useState(770);
    const [energy, setEnergy] = useState(1000);

    function handleIncludedCoin() {
        setPoints(points + 1);
        setEnergy(energy - 1);
    }

    const formattedPoints = useMemo(() => points.toLocaleString(), [points]);

    const formattedEnergy = useMemo(() => energy.toLocaleString(), [energy]);

    return (
        <div className="w-full h-screen relative overflow-y-auto overflow-hidden">
            <DialogHeader className="p-4">
                <DialogTitle className="flex justify-start items-center gap-2">
                    <Avatar className="bg-[#1c1f24] rounded-lg w-[32px] h-[32px]">
                        <AvatarImage src="/project/icon_ava_user.png" alt="@user" sizes="sm" className="w-[32px] h-[32px]" />
                        <AvatarFallback>User</AvatarFallback>
                    </Avatar>
                    <TypographySmall text={`${user?.first_name} ${user?.last_name}`} className="text-xs" />
                </DialogTitle>
                <DialogDescription className="w-full flex justify-between items-center">
                    <div className="flex flex-[0.5] flex-col justify-start items-start gap-1 pr-5">
                        <div
                            className="w-full flex justify-between items-start cursor-pointer"
                            onClick={() => {
                                router.push('/rank')
                                haptic.impactOccurred('medium');

                            }}
                        >
                            <div className="flex justify-start items-center gap-[2px]">
                                <TypographySmall text="Bronze" className="text-[10px] text-white" />
                                <div className="w-[10px] h-[10px] text-white"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" xmlSpace="preserve"><path d="M9 20.6c-.3 0-.6-.1-.8-.3-.4-.4-.4-1.2 0-1.6l6.7-6.7-6.7-6.7c-.4-.4-.4-1.2 0-1.6s1.2-.4 1.6 0l7.5 7.5c.4.4.4 1.2 0 1.6l-7.5 7.5c-.2.2-.5.3-.8.3z" fill="currentColor"></path></svg></div>
                            </div>
                            <div className="text-[10px] text-white">1/11</div>
                        </div>
                        <Progress
                            value={progress}
                            className="w-full h-[8px] bg-[#ffffff26] border border-[hsla(0,0%,100%,.1)]"
                        />
                    </div>
                    <CardProfit />
                </DialogDescription>
            </DialogHeader>
            <Card className="card-has-glow w-full min-h-[110vh] border-none">
                <CardHeader>
                    <MotionContainer className="w-full flex flex-row justify-between items-center gap-2">
                        <div
                            className="relative w-full flex flex-col justify-center items-center bg-[#272a2f] rounded-xl cursor-pointer"
                            onClick={() => {
                                router.push('/earn')
                                haptic.impactOccurred('medium');
                            }}
                        >
                            <Image src="/project/icon_daily_reward.png" alt="@card" width={56} height={56} />
                            <TypographySmall text="Danh sách nhiệm vụ" className="text-[10px] text-white" />
                            <span className="text-[#8b8e93] text-[10px] my-2">07:03</span>
                            <div className="absolute top-[7px] right-[7px] w-[6px] h-[6px] rounded-full bg-white flash"></div>
                            {/* TODO: active task */}
                            {/* <div className="user-attraction-item-completed">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="white"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="lucide lucide-check small-icon"
                                    style={{ width: '10px', height: '10px' }}
                                >
                                    <path d="M20 6 9 17l-5-5" />
                                </svg>
                            </div> */}
                        </div>
                        <div className="relative w-full flex flex-col justify-center items-center bg-[#272a2f] rounded-xl cursor-pointer" onClick={() => setSecretFeature(!isSecretFeature)}>
                            <Image src="/project/icon_daily_cipher.png" alt="@card" width={56} height={56} />
                            <TypographySmall text="Mật mã hàng ngày" className="text-[10px] text-white" />
                            <div className="absolute top-[7px] right-[7px] w-[6px] h-[6px] rounded-full bg-white flash"></div>
                            <span className="text-[#8b8e93] text-[10px] my-2">02:13</span>
                        </div>
                        <div
                            className="relative w-full flex flex-col justify-center items-center bg-[#272a2f] rounded-xl cursor-pointer"
                            onClick={() => {
                                router.push('/mine')
                                haptic.impactOccurred('medium');
                            }}
                        >
                            <Image src="/project/icon_daily_combo.png" alt="@card" width={56} height={56} />
                            <TypographySmall text="Thẻ kết hợp hàng ngày" className="text-[10px] text-white" />
                            <div className="absolute top-[7px] right-[7px] w-[6px] h-[6px] rounded-full bg-white flash"></div>
                            <span className="text-[#8b8e93] text-[10px] my-2">19:03</span>
                        </div>
                    </MotionContainer>
                </CardHeader>
                <CardDescription>
                    <MotionContainer className="w-full flex justify-center items-center gap-2" type="scale">
                        <Image src="/project/icon_coin.png" alt="@coin" width={40} height={40} />
                        <MemoTypographyLarge text={formattedPoints} className="text-white text-3xl" />
                    </MotionContainer>
                </CardDescription>
                <CardContent className="mt-5 w-full flex flex-col gap-5 justify-center items-center">
                    {isSecretFeature && <div className="w-full flex justify-between items-center bg-[#272a2f] rounded-lg p-2">
                        <TypographyLarge text="Mật mã hàng ngày" className="text-white text-[14px]" />
                        <Button className="flex justify-center items-center gap-2 bg-button-mine rounded-md p-2">
                            <Image src="/project/icon_coin.png" alt="@coin" width={18} height={18} />
                            <TypographySmall text='+1.000.000' className="text-white text-[14px]" />
                        </Button>
                    </div>}
                    <MineButton handleIncreaseCoin={handleIncludedCoin} isSecretFeature={isSecretFeature} />
                </CardContent>
                <CardFooter className="w-full flex justify-between items-center">
                    <div className="w-full flex justify-start items-center gap-1">
                        <Image src="/project/icon_flash.svg" alt="@flash" width={26} height={26} />
                        <MemoTypographyLarge text={`${formattedEnergy} / 1000`} className="text-white text-base" />
                    </div>
                    <div
                        className="w-full flex justify-end items-center gap-1 cursor-pointer"
                        onClick={ () => {
                            router.push('/boost')
                            haptic.impactOccurred('medium');
                        }}
                    >
                        <Image src="/project/icon_rocket.png" alt="@rocket" width={48} height={48} />
                        <TypographyLarge text="Boost" className="text-white text-base" />
                    </div>
                </CardFooter>
            </Card>
        </div>
    )
}