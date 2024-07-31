'use client'

import Image from "next/image"
import { useState } from "react"
import { useRouter } from '@shared/next-intl/navigation';
import { Progress } from "@ui/components/progress"
import { Card, CardHeader } from "@ui/components/card"
import { Avatar, AvatarImage, AvatarFallback } from "@ui/components/avatar"
import { DialogDescription, DialogHeader, DialogTitle } from "@ui/components/dialog"
import { useAppSelector } from "@shared/redux/store/index"

import MotionContainer from "@ui/components/motion/container"
import TypographySmall from "@ui/components/typography/small"

import MineButton from "@shared/components/MineButton"
import CardProfit from "@shared/components/CardProfit"

const { initHapticFeedback } = require('@telegram-apps/sdk-react');

function UserCardExist({ user }: { user: any }) {
    const router = useRouter()

    return (
        <DialogTitle className="w-full flex justify-between items-center">
            <div className="inline-flex justify-start items-center" onClick={() => router.push("/skin")}>
                <div className="user-info-avatar">
                    <Avatar className="bg-[#1c1f24] rounded-lg w-[32px] h-[32px]">
                        <AvatarImage src="/project/icon_ava_user.png" alt="@user" sizes="sm" className="w-[32px] h-[32px]" />
                        <AvatarFallback>User</AvatarFallback>
                    </Avatar>
                </div>
                <div className="user-info-avatar-skin">
                    <TypographySmall text="Mua skin" className="text-[9px] font-semibold w-full" />
                    <div className="w-[110%]">
                        <Image src="/project/_skin.png" alt="@skin" width={33} height={30} priority />
                    </div>
                </div>
                <TypographySmall text={`${user?.first_name} ${user?.last_name}`} className="text-xs" />
            </div>
            <div className="inline-flex gap-1 justify-end items-center">
                <div className="w-[18px] h-[18px]">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16.55 16.87"><path d="M15.15,2.13c-2-1.61-5.05-.88-6.57.45a4.81,4.81,0,0,0-.86,5.75l-6.13,6a7.18,7.18,0,0,0-.49,2.34l.83.57s1.41.42,2-.05A2.67,2.67,0,0,0,5,15.47a.66.66,0,0,1,.16-.57A.72.72,0,0,1,6,14.79a.66.66,0,0,0,.64-.15l.06-.06a.71.71,0,0,0,.21-.7A1.06,1.06,0,0,1,7.1,13a1,1,0,0,1,.75-.31A1.43,1.43,0,0,0,9,12.26l.9-.87A5.38,5.38,0,0,0,16,10.17C18.05,8,17.53,4,15.15,2.13ZM13.94,6.82a1.47,1.47,0,0,1-2,0,1.4,1.4,0,0,1,0-2,1.47,1.47,0,0,1,2,0A1.4,1.4,0,0,1,13.94,6.82Z" transform="translate(-0.73 -0.56)" fill="#9e740b"></path><path d="M15.16,2.13A5.36,5.36,0,0,0,6.45,8.05L1.1,13.37a1.18,1.18,0,0,0-.28.44,1.13,1.13,0,0,0-.09.51L.79,16c.3.18.31.72.31.72l1.4.1a1.3,1.3,0,0,0,1-.37L3.89,16a1.23,1.23,0,0,0,.36-1.05.68.68,0,0,1,.16-.61.71.71,0,0,1,.74-.12.69.69,0,0,0,.67-.15L5.88,14a.73.73,0,0,0,.22-.72,1.08,1.08,0,0,1,.24-.89,1,1,0,0,1,.75-.31,1.52,1.52,0,0,0,1.16-.46l.84-.84a5.36,5.36,0,0,0,6.07-8.64Zm-1.92,4A1.45,1.45,0,1,1,11.19,4,1.45,1.45,0,0,1,13.24,6.1Z" transform="translate(-0.73 -0.56)" fill="#ffca28"></path><path d="M.79,16s.17.12.31.72L7.78,9.9c.21-.24-.76-.12-1,.17Z" transform="translate(-0.73 -0.56)" fill="#dba010"></path><path d="M8.5,2.8A3.08,3.08,0,0,0,7.16,5.05a3.53,3.53,0,0,0,.27,2.39c.39.69.93.32.72-.35A3,3,0,0,1,8,6a3.32,3.32,0,0,1,.12-1.09,5.71,5.71,0,0,1,1-1.73C9.33,2.83,9,2.54,8.5,2.8ZM4.65,11.21c-.4.34,0-.72.32-1.08A15.3,15.3,0,0,1,6.5,8.57c.23-.11.22.53.12.65A26.42,26.42,0,0,1,4.65,11.21Z" transform="translate(-0.73 -0.56)" fill="#fff59d"></path></svg>
                </div>
                <TypographySmall text="0" className="text-xs" />
            </div>
        </DialogTitle>
    )
}

function UserCardDefault({ user }: { user: any }) {
    return (
        <DialogTitle className="flex justify-start items-center gap-2">
            <Avatar className="bg-[#1c1f24] rounded-lg w-[32px] h-[32px]">
                <AvatarImage src="/project/icon_ava_user.png" alt="@user" sizes="sm" className="w-[32px] h-[32px]" />
                <AvatarFallback>User</AvatarFallback>
            </Avatar>
            <TypographySmall text={`${user?.first_name} ${user?.last_name}`} className="text-xs" />
        </DialogTitle>
    )
}

export default function Page(): JSX.Element {
    const { user, membership } = useAppSelector(state => state.app)

    const haptic = initHapticFeedback();
    const router = useRouter()

    const [isSecretFeature, setSecretFeature] = useState(false)

    return (
        <div className="w-full h-screen relative overflow-y-auto overflow-hidden">
            <DialogHeader className="p-4">
                {user !== undefined ? <UserCardExist user={user} /> : <UserCardDefault user={user} />}
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
                                <TypographySmall text={membership?.name as string} className="text-[10px] text-white" />
                                <div className="w-[10px] h-[10px] text-white"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" xmlSpace="preserve"><path d="M9 20.6c-.3 0-.6-.1-.8-.3-.4-.4-.4-1.2 0-1.6l6.7-6.7-6.7-6.7c-.4-.4-.4-1.2 0-1.6s1.2-.4 1.6 0l7.5 7.5c.4.4.4 1.2 0 1.6l-7.5 7.5c-.2.2-.5.3-.8.3z" fill="currentColor"></path></svg></div>
                            </div>
                            <div className="text-[10px] text-white">{membership?.current_level}/{membership?.max_level}</div>
                        </div>
                        <Progress
                            value={Math.round((membership.current_level / membership.max_level) * 100)}
                            className="w-full h-[8px] bg-[#ffffff26] border border-[hsla(0,0%,100%,.1)]"
                        />
                    </div>
                    <CardProfit />
                </DialogDescription>
            </DialogHeader>
            <Card className="card-has-glow w-full h-full border-none">
                <CardHeader>
                    <MotionContainer className="w-full flex flex-row justify-between items-center gap-2">
                        <div
                            className="relative w-full flex flex-col justify-center items-center bg-[#272a2f] rounded-xl cursor-pointer"
                            onClick={() => {
                                router.push('/earn')
                                haptic.impactOccurred('medium');
                            }}
                        >
                            <Image src="/project/icon_daily_reward.png" alt="@card" width={56} height={56} priority />
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
                            <Image src="/project/icon_daily_cipher.png" alt="@card" width={56} height={56} priority />
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
                            <Image src="/project/icon_daily_combo.png" alt="@card" width={56} height={56} priority />
                            <TypographySmall text="Thẻ kết hợp hàng ngày" className="text-[10px] text-white" />
                            <div className="absolute top-[7px] right-[7px] w-[6px] h-[6px] rounded-full bg-white flash"></div>
                            <span className="text-[#8b8e93] text-[10px] my-2">19:03</span>
                        </div>
                    </MotionContainer>
                </CardHeader>
                <MineButton isSecretFeature={isSecretFeature} />
            </Card>
        </div>
    )
}