'use client';

import React from 'react';
import { Button } from '@ui/components/button';
import { useAppSelector } from "@shared/redux/store"

const { initUtils } = require('@telegram-apps/sdk-react');

const InviteFriends = () => {
    const { user } = useAppSelector(state => state.app)

    const utils = initUtils();

    const handleInviteFriends = () => {
        utils.shareURL(
            `${process.env.NEXT_PUBLIC_URL_TELEGRAM_BOT}/?startapp=teleId${user.telegram_id}`,
            "Chơi với tôi, trở thành CEO của sàn giao dịch tiền mã hóa và nhận airdrop token! 💸 +2k Xu như một món quà lần đầu 🔥 +25k Xu nếu bạn có Telegram Premium");
    };

    return (
        <Button
            className="w-full h-[60px] bg-[#5a60ff]/85 hover:bg-[#5a60ff] text-white rounded-2xl scale-animated"
            onClick={handleInviteFriends}
        >
            Mời bạn bè
            <div className="icon ml-2 w-[24px] h-[24px]">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlSpace="preserve"
                    viewBox="0 0 24 24"
                >
                    <path
                        d="M12 7.1c.8 0 1.6.2 2.3.7.7.5 1.2 1.1 1.5 1.9.3.8.4 1.6.2 2.4-.2.8-.6 1.5-1.1 2.1-.6.6-1.3 1-2.1 1.1-.8.2-1.6.1-2.4-.2-.8-.3-1.4-.8-1.9-1.5s-.7-1.5-.7-2.3c0-1.1.4-2.1 1.2-2.9.9-.8 1.9-1.3 3-1.3zM16.5 6H18v1.5c0 .2.1.4.2.5.1.1.3.2.5.2s.4-.1.5-.2c.1-.1.2-.3.2-.5V6H21c.2 0 .4-.1.5-.2.1-.1.2-.3.2-.5s-.1-.4-.2-.5c-.1-.1-.3-.2-.5-.2h-1.5V3c0-.2-.1-.4-.2-.5-.1-.1-.3-.2-.5-.2s-.4.1-.5.2c-.2.1-.3.3-.3.5v1.5h-1.5c-.2 0-.4.1-.5.2-.1.1-.2.3-.2.5s.1.4.2.5c.1.2.3.3.5.3zm4.3 3.8c-.2 0-.4.1-.5.3-.1.2-.2.4-.1.6.1.5.1.9.1 1.4 0 2-.7 4-2.1 5.5-.5-.8-1.2-1.5-2-2-.1 0-.2-.1-.2-.1-.1 0-.2 0-.2.1-1 .9-2.3 1.4-3.7 1.4s-2.6-.5-3.7-1.4c-.1-.1-.1-.1-.2-.1s-.2 0-.2.1c-.8.5-1.5 1.2-2 2-1.1-1.2-1.7-2.7-2-4.2-.2-1.6 0-3.2.6-4.6.7-1.4 1.7-2.7 3-3.5C8.9 4.4 10.5 4 12.1 4c.5 0 .9 0 1.4.1.2 0 .4 0 .6-.1.2-.1.3-.3.3-.5s0-.4-.1-.6c-.1-.2-.3-.3-.5-.3-2-.3-4.1 0-6 .9s-3.5 2.2-4.5 4-1.3 3.9-1 6c.3 2 1.3 3.9 2.7 5.4 1.5 1.5 3.3 2.4 5.4 2.7 2 .3 4.1 0 6-1 1.8-.9 3.3-2.5 4.2-4.3.9-1.8 1.2-3.9.9-6 0-.2-.1-.4-.3-.5-.1 0-.3-.1-.4 0z"
                        fill="currentColor"
                    ></path>
                </svg>
            </div>
        </Button>
    );
};

export default InviteFriends;

