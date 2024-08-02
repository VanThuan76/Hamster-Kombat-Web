'use client'
import React, { useEffect, useRef, useState, useCallback } from 'react';

type CoinProps = {
    count: number;
    x_start_from: number;
    x_start_to: number;
    y_start_from: number;
    y_start_to: number;
    x_end_from: number;
    x_end_to: number;
    y_end_from: number;
    y_end_to: number;
    direction_y: 'from_bottom' | 'from_top';
    random_end_x: boolean;
    timeout_fly?: number;
    delay: number;
};

type Coin = {
    x_start: number;
    y_start: number;
    dx: number;
    dy: number;
    opacity_start: number;
    d_opacity: number;
    date: number;
    id: number;
    timeout_fly: number;
};

const lt = 20; // Kích thước của đồng xu
const coinImageSrc = '/project/icon_coin.png'; // Đường dẫn hình ảnh từ thư mục public

const CoinsAnimationCanvas: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [coins, setCoins] = useState<Coin[]>([]);
    const [animationActive, setAnimationActive] = useState(false);
    const [animationFrameId, setAnimationFrameId] = useState<number | null>(null);
    const [hideTimeoutId, setHideTimeoutId] = useState<number | null>(null);
    const coinImage = useRef<HTMLImageElement>(new Image());
    const [canvasReady, setCanvasReady] = useState(false);

    useEffect(() => {
        coinImage.current.src = coinImageSrc;
        coinImage.current.onload = () => console.log('Coin image loaded');
        coinImage.current.onerror = () => console.error('Failed to load coin image');
    }, []);

    const updateCanvasSize = useCallback(() => {
        const canvas = canvasRef.current;
        if (canvas) {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            console.log('Canvas size updated to', canvas.width, canvas.height);
            setCanvasReady(true); // Đánh dấu canvas đã sẵn sàng
        } else {
            console.log('Canvas ref is null');
        }
    }, []);

    const drawCoins = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) {
            console.log('Canvas ref is null in drawCoins');
            return;
        }
        const context = canvas.getContext('2d');
        if (!context) return;

        context.clearRect(0, 0, canvas.width, canvas.height);
        const currentTime = Date.now();

        coins.forEach(coin => {
            const elapsedTime = currentTime - coin.date;
            if (elapsedTime > coin.timeout_fly) return;

            const progress = elapsedTime / coin.timeout_fly;
            const x = coin.x_start + coin.dx * progress - lt / 2;
            const y = coin.y_start + coin.dy * progress - lt / 2;
            const opacity = coin.opacity_start + coin.d_opacity * progress;

            if (x >= 0 && x <= canvas.width && y >= 0 && y <= canvas.height) {
                context.globalAlpha = opacity;
                context.drawImage(coinImage.current, x, y, lt, lt);
            }
        });

        const newAnimationFrameId = requestAnimationFrame(drawCoins);
        setAnimationFrameId(newAnimationFrameId);

        if (coins.length <= 0) {
            cancelAnimationFrame(newAnimationFrameId);
            setAnimationFrameId(null);
            if (hideTimeoutId) clearTimeout(hideTimeoutId);
            const newHideTimeoutId = window.setTimeout(() => setAnimationActive(false), 3000);
            setHideTimeoutId(newHideTimeoutId);
        }
    }, [coins, hideTimeoutId]);

    const handleAnimateCoins = useCallback((props: CoinProps) => {
        if (!canvasReady) return; // Đợi canvas sẵn sàng trước khi bắt đầu hoạt động

        console.log('Animating coins with props', props);
        setAnimationActive(true);
        updateCanvasSize();

        if (hideTimeoutId) {
            clearTimeout(hideTimeoutId);
            setHideTimeoutId(null);
        }

        setTimeout(() => {
            const newCoins: Coin[] = [];
            const maxCount = Math.min(200, props.count);
            for (let i = 0; i < maxCount; i++) {
                setTimeout(() => {
                    const x_start = getRandomInRange(props.x_start_from, props.x_start_to);
                    const x_end = props.random_end_x ? getRandomInRange(props.x_end_from, props.x_end_to) : x_start;
                    const y_start = props.direction_y === 'from_bottom' ? window.innerHeight : getRandomInRange(props.y_start_from, props.y_start_to);
                    const y_end = props.direction_y === 'from_bottom' ? y_start - getRandomInRange(props.y_end_from, props.y_end_to) : y_start + getRandomInRange(props.y_end_from, props.y_end_to);
                    const opacity_start = 1;
                    const opacity_end = Math.random() * 0.5;
                    const dx = x_end - x_start;
                    const dy = y_end - y_start;
                    const d_opacity = opacity_end - opacity_start;
                    const timeout_fly = (props.timeout_fly ?? 1000) / 3;

                    const coin: Coin = {
                        x_start,
                        y_start,
                        dx,
                        dy,
                        opacity_start,
                        d_opacity,
                        date: Date.now(),
                        id: i,
                        timeout_fly,
                    };

                    console.log('Adding coin', coin);
                    newCoins.push(coin);
                    setCoins(prev => [...prev, coin]);

                    setTimeout(() => {
                        setCoins(prev => prev.filter(c => c.id !== i));
                    }, timeout_fly);
                }, props.delay * i);
            }

            setTimeout(() => drawCoins(), 50);
        }, 50);
    }, [drawCoins, hideTimeoutId, updateCanvasSize, canvasReady]);

    const getRandomInRange = (min: number, max: number) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    useEffect(() => {
        updateCanvasSize();
        window.addEventListener('resize', updateCanvasSize);

        return () => {
            window.removeEventListener('resize', updateCanvasSize);
            if (animationFrameId) cancelAnimationFrame(animationFrameId);
            if (hideTimeoutId) clearTimeout(hideTimeoutId);
        };
    }, [updateCanvasSize, animationFrameId, hideTimeoutId]);

    useEffect(() => {
        const handleCoinAnimate = (event: CustomEvent<CoinProps>) => {
            console.log('coins-animate event received', event.detail);
            handleAnimateCoins(event.detail);
        };

        window.addEventListener('coins-animate', handleCoinAnimate as EventListener);
        return () => {
            window.removeEventListener('coins-animate', handleCoinAnimate as EventListener);
        };
    }, [handleAnimateCoins]);

    return (
        <div className="coin-animation-container" style={{ position: 'relative', width: '100%', height: '100%' }}>
            {animationActive && (
                <canvas
                    ref={canvasRef}
                    className="absolute top-0 left-0 w-full h-full z-[500000]"
                />
            )}
        </div>
    );
};

export default CoinsAnimationCanvas;


// const startCoinAnimation = () => {
//     const event = new CustomEvent('coins-animate', {
//         detail: {
//             count: 10,
//             x_start_from: 0,
//             x_start_to: 100,
//             y_start_from: 0,
//             y_start_to: 100,
//             x_end_from: 0,
//             x_end_to: 100,
//             y_end_from: 0,
//             y_end_to: 100,
//             direction_y: 'from_bottom',
//             random_end_x: true,
//             timeout_fly: 2000,
//             delay: 100
//         }
//     });
//     window.dispatchEvent(event);
// };