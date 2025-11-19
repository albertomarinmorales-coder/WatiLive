'use client';

import { FaTwitch, FaYoutube, FaDiscord, FaTwitter } from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    const socialLinks = [
        { icon: FaTwitch, href: '#', color: 'hover:text-purple-500', label: 'Twitch' },
        { icon: FaYoutube, href: '#', color: 'hover:text-red-500', label: 'YouTube' },
        { icon: FaDiscord, href: '#', color: 'hover:text-indigo-500', label: 'Discord' },
        { icon: FaTwitter, href: '#', color: 'hover:text-blue-400', label: 'Twitter' },
    ];

    return (
        <motion.footer
            className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, type: 'spring', stiffness: 100 }}
        >
            <div className="glass-panel px-6 py-3 rounded-full flex items-center gap-6 shadow-2xl border border-white/10 bg-black/40 backdrop-blur-md">
                {/* Social Icons */}
                <div className="flex items-center gap-4">
                    {socialLinks.map((social, index) => (
                        <motion.a
                            key={index}
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`text-gray-400 transition-colors duration-300 ${social.color}`}
                            whileHover={{ scale: 1.2, rotate: 5 }}
                            whileTap={{ scale: 0.9 }}
                            aria-label={social.label}
                        >
                            <social.icon size={20} />
                        </motion.a>
                    ))}
                </div>

                {/* Divider */}
                <div className="w-px h-4 bg-gray-600/50"></div>

                {/* Copyright */}
                <div className="text-[10px] text-gray-500 font-medium tracking-wider uppercase flex items-center gap-1">
                    <span>© {currentYear} WatiLive</span>
                    <span className="text-gray-600">|</span>
                    <span>By Klica.Dev</span>
                </div>
            </div>
        </motion.footer>
    );
}
