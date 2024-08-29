'use client'
import React from "react";
import Image from "next/image";

import MotionContainer from "@ui/components/motion/Container";

interface AnimatedButtonProps {
    handleCardTouchStart: (e: React.TouchEvent<HTMLDivElement>) => void;
    formattedEnergy: number;
    user: {
        tap_value: number;
    },
    membershipImage: string;
}

const AnimatedButton = ({ handleCardTouchStart, formattedEnergy, user, membershipImage }: AnimatedButtonProps) => {
    return (
        <MotionContainer
            type="scale"
            className="flex flex-col items-center justify-center w-full p-4"
        >
            <MotionContainer
                className="relative cursor-pointer select-none user-tap-button-inner"
                type="scale"
                onTouchStart={
                    formattedEnergy >= user.tap_value ? handleCardTouchStart : () => { }
                }
            >
                <div className="overflow-hidden user-tap-button-circle">
                    <Image
                        src={process.env.NEXT_PUBLIC_DOMAIN_BACKEND + "/" + membershipImage}
                        width={320}
                        height={320}
                        alt="avatar"
                        priority={true}
                        className="relative z-10 object-cover w-full h-full"
                    />
                </div>
            </MotionContainer>
        </MotionContainer>
    );
};

export default AnimatedButton;
