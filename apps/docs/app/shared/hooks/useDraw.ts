import { useAppDispatch, useAppSelector } from '@shared/redux/store';
import { closeDrawer, openDrawer } from '@shared/redux/store/appSlice';

export type DrawerType = "infoProfit" | "infoMine" | "cardMine" | 'editExchange' | 'walletConnect' | 'calendarEarn' | 'itemEarn' | 'energyBoost';
export type DrawerData = any

export type DrawerProps = {
    type: DrawerType | null,
    data: DrawerData
    isOpen: boolean,
}

function useDraw() {
    const { drawerStore } = useAppSelector(state => state.app)
    const dispatch = useAppDispatch();

    const onOpen = (type: DrawerType, data?: any) => {
        dispatch(openDrawer({ type, data, isOpen: true }));
    };

    const onClose = () => {
        dispatch(closeDrawer());
    };

    return {
        isOpen: drawerStore.isOpen,
        type: drawerStore.type,
        data: drawerStore.data,
        onOpen,
        onClose
    };
}

export { useDraw };
