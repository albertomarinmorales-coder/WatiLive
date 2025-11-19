'use client';

import { motion } from 'framer-motion';

export default function Header() {
    return (
        <header
            className="text-white p-4 shadow-lg relative overflow-hidden bg-cover h-[300px]"
            style={{
                backgroundImage: 'url(/images/header.jpg)',
                backgroundPosition: 'center calc(100% + 50px)'
            }}
        >
            {/* Subtle dark overlay for text readability */}
            <div className="absolute inset-0 bg-black/30" />

            {/* Content */}
            <div className="container mx-auto relative z-10 h-full flex items-center justify-center py-2">
                {/* Avatar and Name centered */}
                <motion.div
                    className="flex flex-col items-center gap-4 text-center"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <motion.div
                        className="w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden border-4 border-accent-red shadow-2xl"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        animate={{ y: [0, -6, 0] }}
                        transition={{
                            y: { repeat: Infinity, duration: 3, ease: "easeInOut" }
                        }}
                    >
                        <img
                            src="/images/avatarTR.png"
                            alt="WatiLive Avatar"
                            className="w-full h-full object-cover"
                            onError={(e) => {
                                (e.target as HTMLImageElement).src = 'https://via.placeholder.com/120/ef4444/ffffff?text=WATI';
                            }}
                        />
                    </motion.div>
                    <h1
                        className="text-3xl md:text-4xl font-bold drop-shadow-2xl"
                        style={{
                            fontFamily: 'var(--font-gaming)',
                            textShadow: '3px 3px 6px rgba(0,0,0,0.9)'
                        }}
                    >
                        {process.env.NEXT_PUBLIC_STREAMER_NAME || 'WatiLive'}
                    </h1>
                </motion.div>
            </div>
        </header>
    );
}
