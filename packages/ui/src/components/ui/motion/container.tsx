'use client'

import React from 'react';
import { motion } from 'framer-motion';

interface MotionContainerProps {
    children: React.ReactNode;
    className?: string;
    direction?: 'left' | 'right' | 'top' | 'bottom';
    type?: 'slide' | 'scale';
    onClick?: React.MouseEventHandler<HTMLDivElement>;
    onTouchStart?: React.TouchEventHandler<HTMLDivElement>;
}

const MotionContainer = ({ children, className, onClick, onTouchStart, direction = 'right', type = 'slide' }: MotionContainerProps) => {
    let initial, animate;

    if (type === 'slide') {
        switch (direction) {
            case 'left':
                initial = { x: '-100%' };
                animate = { x: ['-100%', '0%', '20%', '0%'] };
                break;
            case 'right':
                initial = { x: '200%' };
                animate = { x: ['200%', '0%', '20%', '0%'] };
                break;
            case 'top':
                initial = { y: '-100%' };
                animate = { y: ['-100%', '0%', '20%', '0%'] };
                break;
            case 'bottom':
                initial = { y: '200%' };
                animate = { y: ['200%', '0%', '20%', '0%'] };
                break;
            default:
                initial = { x: '200%' };
                animate = { x: ['200%', '0%', '20%', '0%'] };
        }
    } else if (type === 'scale') {
        initial = { scale: 0 };
        animate = { scale: [0, 1.1, 1, 1] };
    }

    return (
        <motion.div
            initial={initial}
            animate={animate}
            transition={{ duration: 0.5, times: [0, 0.5, 0.75, 1] }}
            className={className}
            onClick={onClick}
            onTouchStart={onTouchStart}
        >
            {children}
        </motion.div>
    );
};

export default MotionContainer;