"use client";

import { CtfPicture } from "./CtfPicture";

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
      <CtfPicture
        url="/project/icon_coin.png"
        width={width}
        height={height}
        title="@coin"
        nextImageProps={{
          priority: priority,
          loading: "eager",
          className: className,
        }}
      />
    </div>
  );
};

export default CoinIcon;
