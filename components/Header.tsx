'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Header() {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <motion.div
            className="flex items-center gap-4 bg-black/40 backdrop-blur-md px-6 py-2 rounded-full border border-white/10 shadow-lg"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
        >
            <div className="flex flex-col items-end">
                <span className="text-xl font-bold font-mono text-white leading-none">
                    {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
                <span className="text-xs text-gray-400 uppercase tracking-widest">
                    {time.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' })}
                </span>
            </div>

            <div className="w-[1px] h-8 bg-white/20" />

            <div className="flex items-center gap-3">
                <span className="text-sm font-bold text-accent-cyan hidden md:block">
                    {process.env.NEXT_PUBLIC_STREAMER_NAME || 'WatiLive'}
                </span>
                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-accent-cyan shadow-[0_0_10px_var(--accent-cyan)]">
                    <img
                        src="/images/avatarTR.png"
                        alt="Avatar"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/40/00f5ff/000000?text=W';
                        }}
                    />
                </div>
            </div>
        </motion.div>
    );
}
