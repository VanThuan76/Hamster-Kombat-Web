import { useEffect } from 'react';

export function useVibration(duration: number) {
    useEffect(() => {
        if (navigator.vibrate) {
            navigator.vibrate(duration);
        }
    }, [duration]);
}
