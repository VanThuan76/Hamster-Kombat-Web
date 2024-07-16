'use client'

import React from 'react';
import { motion } from 'framer-motion';

const MotionPlusSign = ({ x, y }: { x: number; y: number }) => {
    return (
        <motion.div
            style={{ position: 'absolute', left: x, top: y, zIndex: 99 }}
            initial={{ scale: 0.5, opacity: 1 }}
            animate={{ scale: 1, y: -100, opacity: 0 }}
            exit={{ scale: 0 }}
            transition={{ duration: 0.5 }}
        >
            <span className="text-5xl text-white">+1</span>
        </motion.div>
    );
};

export default MotionPlusSign;
