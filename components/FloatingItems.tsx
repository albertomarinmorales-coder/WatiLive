'use client';

import { motion } from 'framer-motion';

const items = [
    { emoji: '💎', delay: 0, duration: 4, x: '10%', y: '20%' },
    { emoji: '🎮', delay: 0.5, duration: 5, x: '80%', y: '15%' },
    { emoji: '⭐', delay: 1, duration: 6, x: '15%', y: '70%' },
    { emoji: '🔥', delay: 1.5, duration: 4.5, x: '85%', y: '65%' },
    { emoji: '💀', delay: 2, duration: 5.5, x: '50%', y: '30%' },
    { emoji: '🎯', delay: 0.8, duration: 5, x: '25%', y: '50%' },
    { emoji: '⚡', delay: 1.2, duration: 4.8, x: '70%', y: '40%' },
    { emoji: '🏆', delay: 1.8, duration: 5.2, x: '40%', y: '80%' },
];

export default function FloatingItems() {
    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
            {items.map((item, index) => (
                <motion.div
                    key={index}
                    className="absolute text-4xl opacity-20"
                    style={{
                        left: item.x,
                        top: item.y,
                    }}
                    animate={{
                        y: [0, -30, 0],
                        rotate: [0, 10, -10, 0],
                        opacity: [0.1, 0.3, 0.1],
                    }}
                    transition={{
                        duration: item.duration,
                        repeat: Infinity,
                        delay: item.delay,
                        ease: 'easeInOut',
                    }}
                >
                    {item.emoji}
                </motion.div>
            ))}
        </div>
    );
}
