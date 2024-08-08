'use client'
import * as React from 'react';

import DrawerEditExchange from './components/drawer/DrawerEditExchange';
import DrawerInfoMine from './components/drawer/DrawerInfoMine';
import DrawerInfoProfit from './components/drawer/DrawerInfoProfit';
import DrawerWalletConnect from './components/drawer/DrawerWalletConnect';
import DrawerCardMine from './components/drawer/DrawerCardMine';
import DrawerCalendarEarn from './components/drawer/DrawerCalendarEarn';
import DrawerItemEarn from './components/drawer/DrawerItemEarn';
import DrawerEnergyBoost from './components/drawer/DrawerEnergyBoost';

const DrawerProvider = () => {
    const [isMounted, setIsMounted] = React.useState(false)

    React.useEffect(() => {
        setIsMounted(true)
    }, [])

    if (!isMounted) {
        return null
    }
    return (
        <React.Fragment>
            <DrawerInfoProfit />
            <DrawerEditExchange />
            <DrawerWalletConnect />
            <DrawerInfoMine />
            <DrawerCardMine />
            <DrawerCalendarEarn />
            <DrawerItemEarn />
            <DrawerEnergyBoost />
        </React.Fragment>
    );
}

export default DrawerProvider;