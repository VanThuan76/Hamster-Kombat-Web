'use client'

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type DrawerProps = {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    className?: string;
};

const Drawer: React.FC<DrawerProps> = ({ isOpen, onClose, children, className }) => {
    return (
        <>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: '100%' }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: '100%' }}
                        transition={{ duration: 0.3 }}
                        className={`fixed bottom-0 left-0 z-[10000] bg-[#1c1f24] border rounded-t-lg ${className}`}
                    >
                        <div className="p-4 z-[10001]">
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 text-[#4e4f50] hover:text-gray-700"
                            >
                                <svg className='w-[32px] h-[32px]' xmlns="http://www.w3.org/2000/svg" xmlSpace="preserve" viewBox="0 0 32 32"><path d="M16 3a13 13 0 0 0-7.2 2.2C6.6 6.6 5 8.6 4 11s-1.2 5-.7 7.5 1.7 4.8 3.6 6.7c1.8 1.8 4.1 3.1 6.7 3.6 2.4.5 5 .2 7.4-.8a13 13 0 0 0 5.8-4.8c1.4-2.1 2.2-4.7 2.2-7.2 0-3.4-1.4-6.8-3.8-9.2C22.8 4.4 19.4 3 16 3zm4.7 16.3c.1.1.2.2.2.3.1.1.1.3.1.4s0 .3-.1.4c-.1.1-.1.2-.2.3-.1.1-.2.2-.3.2-.1.1-.3.1-.4.1s-.3 0-.4-.1c-.1-.1-.2-.1-.3-.2L16 17.4l-3.3 3.3c-.1.1-.2.2-.3.2s-.3.1-.4.1-.3 0-.4-.1-.2-.1-.3-.2c-.1-.1-.2-.2-.2-.3-.1-.1-.1-.3-.1-.4s0-.3.1-.4c.1-.1.1-.2.2-.3l3.3-3.3-3.3-3.3c-.2-.2-.3-.4-.3-.7s.1-.5.3-.7c.2-.2.4-.3.7-.3s.5.1.7.3l3.3 3.3 3.3-3.3c.1-.1.2-.2.3-.2.1-.1.3-.1.4-.1s.3 0 .4.1c.1.1.2.1.3.2.1.1.2.2.2.3s.1.3.1.4 0 .3-.1.4-.1.2-.2.3L17.4 16l3.3 3.3z" fill="currentColor"></path></svg>
                            </button>
                            {children}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.5 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 bg-black/50 z-40"
                        onClick={onClose}
                    />
                )}
            </AnimatePresence>
        </>
    );
};

export default Drawer;