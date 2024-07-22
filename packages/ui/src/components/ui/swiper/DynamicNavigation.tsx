'use client'

import 'swiper/css';
import 'swiper/css/navigation';

import React from 'react';

const { Swiper, SwiperSlide } = require('swiper/react');
const { Navigation } = require('swiper/modules');
import { cn } from "@ui/lib/utils"

type DynamicNavigationSwiperProps = {
  items: React.ReactNode[];
  className?: string;
  onSlideChange?: (index: number) => void;
};

const DynamicNavigationSwiper: React.FC<DynamicNavigationSwiperProps> = ({ items, className, onSlideChange }) => {
  return (
    <Swiper
      navigation={true}
      modules={[Navigation]}
      className={cn("swiper", className)}
      onSlideChange={(swiper: any) => onSlideChange && onSlideChange(swiper.activeIndex)}
    >
      {items.map((item, index) => (
        <SwiperSlide key={index}>{item}</SwiperSlide>
      ))}
    </Swiper>
  );
};

export default DynamicNavigationSwiper;
