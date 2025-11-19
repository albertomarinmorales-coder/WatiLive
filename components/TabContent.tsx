'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ReactNode } from 'react';

interface TabContentProps {
    children: ReactNode;
    isActive: boolean;
}

export default function TabContent({ children, isActive }: TabContentProps) {
    return (
        <AnimatePresence mode="wait">
            {isActive && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="w-full"
                >
                    {children}
                </motion.div>
            )}
        </AnimatePresence>
    );
}
