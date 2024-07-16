'use client'

import React from 'react';
import { motion } from 'framer-motion';

interface MotionContainerProps {
    children: React.ReactNode;
    className?: string;
    direction?: 'left' | 'right';
    type?: 'slide' | 'scale';
    onClick?: React.MouseEventHandler<HTMLDivElement>;
}

const MotionContainer = ({ children, className, onClick, direction = 'right', type = 'slide' }: MotionContainerProps) => {
    const initialX = direction === 'left' ? '-100%' : '200%';
    const animateX = [initialX, '0%', '20%', '0%'];

    const animateScale = [0, 1.1, 1, 1];

    return (
        <motion.div
            initial={type === 'scale' ? { scale: 0 } : { x: initialX }}
            animate={type === 'scale' ? { scale: animateScale } : { x: animateX }}
            transition={{ duration: 0.5, times: [0, 0.5, 0.75, 1] }}
            className={className}
            onClick={onClick}
        >
            {children}
        </motion.div>
    );
};

export default MotionContainer;
