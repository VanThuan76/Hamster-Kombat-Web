import Image from 'next/image';

const CoinIcon = ({ width = 18, height = 18, priority = true, className }: { width: number, height: number, priority?: boolean, className?: string }) => {
    return (
        <Image
            src="/project/icon_coin.png"
            alt="@coin"
            width={width}
            height={height}
            priority={priority}
            className={className}
        />
    );
};

export default CoinIcon;
