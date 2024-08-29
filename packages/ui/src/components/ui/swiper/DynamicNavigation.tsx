'use client'

import 'swiper/css';
import 'swiper/css/navigation';

import React, { useState, useEffect, useRef } from 'react';
import { cn } from "@ui/lib/utils"

const { Swiper, SwiperSlide } = require('swiper/react');
const { Navigation } = require('swiper/modules');

type DynamicNavigationSwiperProps = {
    items: React.ReactNode[];
    isRank?: boolean;
    className?: string;
    activeSlideChange?: number;
    onSlideChange?: (index: number) => void;
    isNavigation?: boolean
};

const DynamicNavigationSwiper: React.FC<DynamicNavigationSwiperProps> = ({ items, isRank = true, className, activeSlideChange, onSlideChange, isNavigation = true }) => {
    const swiperRef = useRef<any>(null);
    const [activeSlide, setActiveSlide] = useState<number>(activeSlideChange || 0);

    useEffect(() => {
        if (swiperRef.current && activeSlideChange !== undefined) {
            swiperRef.current.slideTo(activeSlideChange);
            setActiveSlide(activeSlideChange);
        }
    }, [activeSlideChange]);

    return (
        <Swiper
            navigation={isNavigation}
            modules={[Navigation]}
            className={cn(isRank && "swiper", className)}
            onSlideChange={(swiper: any) => {
                setActiveSlide(swiper.activeIndex);
                if (onSlideChange) onSlideChange(swiper.activeIndex);
            }}
            initialSlide={activeSlide}
            onSwiper={(swiper: any) => {
                swiperRef.current = swiper;
            }}
        >
            {items.map((item, index) => (
                <SwiperSlide key={index}>{item}</SwiperSlide>
            ))}
        </Swiper>
    );
};

export default DynamicNavigationSwiper;
