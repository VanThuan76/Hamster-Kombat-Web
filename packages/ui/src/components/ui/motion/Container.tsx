"use client";

import React, { memo, useEffect, useState } from "react";
import { m } from "framer-motion";

interface MotionContainerProps {
  children: React.ReactNode;
  className?: string;
  direction?: "left" | "right" | "top" | "bottom";
  type?: "slide" | "scale";
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  onTouchStart?: React.TouchEventHandler<HTMLDivElement>;
}

const MotionContainer = memo(
  ({
    children,
    className,
    onClick,
    onTouchStart,
    direction = "right",
    type = "slide",
  }: MotionContainerProps) => {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
      setIsClient(true);
    }, []);

    let initial, animate;
    if (type === "slide") {
      switch (direction) {
        case "left":
          initial = { x: "-100%", opacity: 0 };
          animate = { x: "0%", opacity: 1 };
          break;
        case "right":
          initial = { x: "100%", opacity: 0 };
          animate = { x: "0%", opacity: 1 };
          break;
        case "top":
          initial = { y: "-100%", opacity: 0 };
          animate = { y: "0%", opacity: 1 };
          break;
        case "bottom":
          initial = { y: "100%", opacity: 0 };
          animate = { y: "0%", opacity: 1 };
          break;
        default:
          initial = { x: "100%", opacity: 0 };
          animate = { x: "0%", opacity: 1 };
      }
    } else if (type === "scale") {
      initial = { scale: 0, opacity: 0 };
      animate = { scale: 1, opacity: 1 };
    }

    return isClient ? (
      <m.div
        initial={initial}
        animate={animate}
        transition={{ duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }}
        className={className}
        onClick={onClick}
        onTouchStart={onTouchStart}
      >
        {children}
      </m.div>
    ) : null;
  },
);

export default MotionContainer;
