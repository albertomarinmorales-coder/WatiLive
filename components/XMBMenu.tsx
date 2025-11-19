'use client';

import { motion } from 'framer-motion';
import { FaUser, FaYoutube, FaTwitch, FaGamepad } from 'react-icons/fa';
import { useEffect, useRef } from 'react';
import Header from './Header';

type TabType = 'about' | 'youtube' | 'twitch' | 'clips';

interface XMBMenuProps {
    activeTab: TabType;
    onTabChange: (tab: TabType) => void;
}

const tabs: { id: TabType; icon: any; label: string }[] = [
    { id: 'about', icon: FaUser, label: 'Sobre mí' },
    { id: 'youtube', icon: FaYoutube, label: 'YouTube' },
    { id: 'twitch', icon: FaTwitch, label: 'Twitch' },
    { id: 'clips', icon: FaGamepad, label: 'Clips' },
];

export default function XMBMenu({ activeTab, onTabChange }: XMBMenuProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    // Handle keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            const currentIndex = tabs.findIndex(t => t.id === activeTab);
            if (e.key === 'ArrowLeft') {
                const prevIndex = (currentIndex - 1 + tabs.length) % tabs.length;
                onTabChange(tabs[prevIndex].id);
            } else if (e.key === 'ArrowRight') {
                const nextIndex = (currentIndex + 1) % tabs.length;
                onTabChange(tabs[nextIndex].id);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [activeTab, onTabChange]);

    return (
        <header className="fixed top-0 left-0 w-full z-40 px-4 pt-4 pb-3 overflow-visible">
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-transparent pointer-events-none" />

            <div className="relative z-10 flex flex-col gap-4 md:items-center">
                <div className="w-full flex items-center justify-center">
                    <div
                        ref={containerRef}
                        className="flex flex-wrap items-center justify-center gap-6 md:gap-12"
                    >
                        {tabs.map((tab) => {
                            const isActive = activeTab === tab.id;
                            return (
                                <motion.button
                                    key={tab.id}
                                    onClick={() => onTabChange(tab.id)}
                                    className={`flex flex-col items-center gap-2 transition-all duration-300 outline-none group ${isActive ? 'text-white scale-110' : 'text-gray-500 hover:text-gray-300 scale-90'
                                        }`}
                                    whileHover={{ scale: isActive ? 1.15 : 1 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <div className={`p-4 rounded-2xl transition-all duration-300 ${isActive
                                            ? 'bg-white/10 backdrop-blur-md shadow-[0_0_20px_rgba(255,255,255,0.2)] border border-white/20'
                                            : 'bg-transparent border border-transparent'
                                        }`}>
                                        <tab.icon className={`text-3xl md:text-4xl ${isActive ? 'drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]' : ''
                                            }`} />
                                    </div>
                                    <span className={`text-sm font-bold tracking-wider uppercase ${isActive ? 'opacity-100 text-shadow-glow' : 'opacity-0 group-hover:opacity-50'
                                        }`}>
                                        {tab.label}
                                    </span>
                                    {isActive && (
                                        <motion.div
                                            layoutId="activeIndicator"
                                            className="w-1 h-1 bg-white rounded-full mt-1 shadow-[0_0_10px_white]"
                                        />
                                    )}
                                </motion.button>
                            );
                        })}
                    </div>

                </div>

                <div className="flex justify-center md:justify-end md:absolute md:right-4 md:top-4 md:translate-y-1">
                    <Header />
                </div>

                <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-gray-700 to-transparent" />
            </div>
        </header>
    );
}
