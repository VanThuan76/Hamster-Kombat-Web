"use client";

import Image from "next/image";

const CoinIcon = ({
  width = 18,
  height = 18,
  priority = true,
  className,
}: {
  width: number;
  height: number;
  priority?: boolean;
  className?: string;
}) => {
  return (
    <div className={`w-[${width}px] h-[${height}px]`}>
      <Image
        src="/project/icon_coin.png"
        width={width}
        height={height}
        alt="@coin"
        priority={true}
        className={className}
      />
    </div>
  );
};

export default CoinIcon;
