'use client'

import Image from "next/image"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { cn } from "@ui/lib/utils"
import { Separator } from "@ui/components/separator"
import { Progress } from "@ui/components/progress"
import { Button } from "@ui/components/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from "@ui/components/card"
import { Avatar, AvatarImage, AvatarFallback } from "@ui/components/avatar"
import { DialogDescription, DialogHeader, DialogTitle } from "@ui/components/dialog"

import MotionContainer from "@ui/components/motion/container"
import PlusSign from "@ui/components/motion/plus-sign"
import DrawerInfoProfit from "@shared/components/drawer-info-profit"

import TypographySmall from "@ui/components/typography/small"
import TypographyLarge from "@ui/components/typography/large"


export default function Page(): JSX.Element {
    const router = useRouter()
    const [isSecretFeature, setSecretFeature] = useState(false)
    const [progress, setProgress] = useState(80)
    const [plusSigns, setPlusSigns] = useState<{ x: number; y: number }[]>([]);

    const handleCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        card.style.transform = `perspective(1000px) rotateX(${-y / 10}deg) rotateY(${x / 10}deg)`;

        const xPlus = e.clientX - rect.left;
        const yPlus = e.clientY - rect.top;

        requestAnimationFrame(() => {
            setPlusSigns(current => [...current, { x: xPlus, y: yPlus }]);

            requestAnimationFrame(() => {
                setTimeout(() => {
                    card.style.transform = '';
                }, 100);
                setTimeout(() => {
                    setPlusSigns(current => current.slice(1));
                }, 300);
            });
        });
    };

    return (
        <div className="w-full h-screen relative overflow-y-auto overflow-hidden">
            <DialogHeader className="p-4">
                <DialogTitle className="flex justify-start items-center gap-2">
                    <Avatar className="bg-[#1c1f24] rounded-lg w-[32px] h-[32px]">
                        <AvatarImage src="/project/icon_ava_user.png" alt="@user" sizes="sm" className="w-[32px] h-[32px]" />
                        <AvatarFallback>User</AvatarFallback>
                    </Avatar>
                    <TypographySmall text="Vu Van Thuan(CEO)" className="text-xs" />
                </DialogTitle>
                <DialogDescription className="w-full flex justify-between items-center">
                    <div className="flex flex-[0.5] flex-col justify-start items-start gap-1 pr-5">
                        <div className="w-full flex justify-between items-start cursor-pointer" onClick={() => router.push('/rank')}>
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
                    <div className="flex justify-between items-center bg-[#ffffff26] border border-white/10 rounded-[20px] text-white flex-1 h-[40px] relative py-1 px-4">
                        <Avatar className="flex justify-start items-center">
                            <AvatarImage src="/project/icon_ava_plus.png" alt="@userPlus" sizes="sm" className="w-[26px] h-[26px]" />
                            <AvatarFallback>UserPlus</AvatarFallback>
                        </Avatar>
                        <Separator orientation="vertical" className="bg-[#ffffff1a] w-[1px]" />
                        <div className="w-full flex flex-1 flex-col justify-start items-center pb-1">
                            <TypographySmall text="Lợi nhuận mỗi giờ" className="text-[8px] text-[#fff6]" />
                            <div className="w-full flex flex-1 justify-center items-center gap-[6px]">
                                <Image src="/project/icon_coin.png" alt="@coin" width={18} height={18} />
                                <TypographySmall text="+10" className="text-xs" />
                                <DrawerInfoProfit />
                            </div>
                        </div>
                        <Separator orientation="vertical" className="bg-[#ffffff1a] w-[1px]" />
                        <div className="pl-4 items-end">
                            <svg width="20" height="20" viewBox="0 0 26 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M25.0247 9.72615C25.0003 9.60294 24.9497 9.48641 24.8763 9.3845C24.8028 9.28259 24.7083 9.19767 24.5992 9.13553L21.3365 7.27615L21.3234 3.59897C21.323 3.47233 21.2951 3.34728 21.2417 3.23247C21.1882 3.11765 21.1105 3.01581 21.0139 2.93397C19.8304 1.93286 18.4675 1.16566 16.9976 0.673185C16.8819 0.634007 16.7592 0.619508 16.6375 0.630623C16.5158 0.641737 16.3978 0.678218 16.2911 0.737717L13 2.5774L9.70559 0.734435C9.59879 0.674602 9.48062 0.637845 9.35872 0.626541C9.23683 0.615237 9.11392 0.629637 8.99793 0.66881C7.52899 1.16445 6.16757 1.93461 4.98606 2.93834C4.88955 3.02006 4.81191 3.12173 4.75847 3.23635C4.70504 3.35096 4.67708 3.47579 4.67653 3.60225L4.66012 7.28272L1.39746 9.14209C1.28831 9.20423 1.19381 9.28915 1.1204 9.39106C1.04698 9.49298 0.996367 9.6095 0.971995 9.73272C0.673397 11.2332 0.673397 12.7778 0.971995 14.2783C0.996367 14.4016 1.04698 14.5181 1.1204 14.62C1.19381 14.7219 1.28831 14.8068 1.39746 14.869L4.66012 16.7283L4.67325 20.4066C4.67364 20.5333 4.70152 20.6583 4.75496 20.7731C4.80841 20.8879 4.88613 20.9898 4.98278 21.0716C6.16629 22.0727 7.5292 22.8399 8.99903 23.3324C9.11478 23.3716 9.23745 23.3861 9.35914 23.375C9.48084 23.3639 9.59885 23.3274 9.70559 23.2679L13 21.4227L16.2943 23.2657C16.4247 23.3383 16.5717 23.376 16.7209 23.3751C16.8165 23.375 16.9114 23.3595 17.002 23.3291C18.4706 22.8337 19.8319 22.0643 21.0139 21.0618C21.1104 20.9801 21.188 20.8784 21.2415 20.7638C21.2949 20.6492 21.3228 20.5243 21.3234 20.3979L21.3398 16.7174L24.6025 14.858C24.7116 14.7959 24.8061 14.711 24.8795 14.6091C24.9529 14.5071 25.0036 14.3906 25.0279 14.2674C25.3249 12.7681 25.3238 11.225 25.0247 9.72615ZM13 16.3751C12.1347 16.3751 11.2888 16.1185 10.5693 15.6377C9.84988 15.157 9.28912 14.4737 8.95799 13.6743C8.62686 12.8749 8.54022 11.9952 8.70903 11.1465C8.87784 10.2979 9.29452 9.51832 9.90637 8.90647C10.5182 8.29461 11.2978 7.87793 12.1464 7.70912C12.9951 7.54031 13.8748 7.62695 14.6742 7.95809C15.4736 8.28922 16.1569 8.84998 16.6376 9.56944C17.1184 10.2889 17.375 11.1348 17.375 12.0001C17.375 13.1604 16.914 14.2732 16.0936 15.0937C15.2731 15.9141 14.1603 16.3751 13 16.3751Z" fill="currentColor"></path>
                            </svg>
                        </div>
                    </div>
                </DialogDescription>
            </DialogHeader>
            <Card className="card-has-glow w-full min-h-[110vh] border-none">
                <CardHeader>
                    <MotionContainer className="w-full flex flex-row justify-between items-center gap-2">
                        <div className="relative w-full flex flex-col justify-center items-center bg-[#272a2f] rounded-xl cursor-pointer" onClick={() => router.push('/earn')}>
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
                        <div className="relative w-full flex flex-col justify-center items-center bg-[#272a2f] rounded-xl cursor-pointer" onClick={() => router.push('/mine')}>
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
                        <TypographyLarge text="770" className="text-white text-3xl" />
                    </MotionContainer>
                </CardDescription>
                <CardContent className="mt-5 w-full flex flex-col gap-5 justify-center items-center">
                    {isSecretFeature && <div className="w-full flex justify-between items-center bg-[#272a2f] rounded-lg p-2">
                        <TypographyLarge text="Mật mã hàng ngày" className="text-white text-[14px]" />
                        <Button className="flex justify-center items-center gap-2 bg-button-mine rounded-md p-2">
                            <Image src="/project/icon_coin.png" alt="@coin" width={18} height={18} />
                            <TypographySmall text="+1.000.000" className="text-white text-[14px]" />
                        </Button>
                    </div>}
                    <MotionContainer className={cn("relative user-tap-button-inner cursor-pointer", isSecretFeature && 'user-tap-button-inner-secret')} type="scale" onClick={handleCardClick}>
                        <div className={cn("user-tap-button-circle", isSecretFeature && 'user-tap-button-circle-secret')}>
                            <Image src="/project/ava_bronze.png" alt="avatar" width={268} height={268} className="z-30" />
                        </div>
                        {plusSigns.map((pos, index) => (
                            <PlusSign type={isSecretFeature ? "dot" : "plus"} key={index} x={pos.x} y={pos.y} />
                        ))}
                    </MotionContainer>
                </CardContent>
                <CardFooter className="w-full flex justify-between items-center">
                    <div className="w-full flex justify-start items-center gap-1">
                        <Image src="/project/icon_flash.svg" alt="@flash" width={26} height={26} />
                        <TypographyLarge text="1000 / 1000" className="text-white text-base" />
                    </div>
                    <div className="w-full flex justify-end items-center gap-1">
                        <Image src="/project/icon_rocket.png" alt="@rocket" width={48} height={48} />
                        <TypographyLarge text="Boost" className="text-white text-base" />
                    </div>
                </CardFooter>
            </Card>
        </div>
    )
}