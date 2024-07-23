'use client'
import React, { useState, ReactNode, ReactElement, cloneElement } from "react";

import { Button } from "@ui/components/button"
import TypographyLarge from "@ui/components/typography/large"
import Drawer from "@ui/components/drawer"

interface DrawerMinCardProps {
    drawerTrigger: ReactElement;
    drawerContent: ReactNode;
}

const DrawerMinCard = ({ drawerTrigger, drawerContent }: DrawerMinCardProps) => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const handleOpenDrawer = () => setIsDrawerOpen(true);
    const handleCloseDrawer = () => setIsDrawerOpen(false);

    function handleClickDone() {
        setIsDrawerOpen(false)
    }

    return (
        <>
            {cloneElement(drawerTrigger, { onClick: handleOpenDrawer })}
            <Drawer
                isOpen={isDrawerOpen}
                onClose={handleCloseDrawer}
                className="w-full card-has-glow h-[67%] md:h-[63%] border-none"
            >
                {drawerContent}
                <Button className="mt-5 w-full h-[80px] bg-[#5a60ff] hover:bg-[#5a60ff]/90 text-white flex justify-center items-center gap-2 rounded-2xl" onClick={handleClickDone}>
                    <TypographyLarge text="Nhận" className="text-white text-xl font-bold" />
                </Button>
            </Drawer>
        </>
    );
}

export default DrawerMinCard;
