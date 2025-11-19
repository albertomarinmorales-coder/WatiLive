'use client';

import { FaTwitch, FaYoutube, FaDiscord, FaTwitter } from 'react-icons/fa';
import { motion } from 'framer-motion';

const socialLinks = [
    { icon: FaTwitch, url: 'https://twitch.tv', color: '#9146FF', label: 'Twitch' },
    { icon: FaYoutube, url: 'https://youtube.com', color: '#FF0000', label: 'YouTube' },
    { icon: FaDiscord, url: 'https://discord.com', color: '#5865F2', label: 'Discord' },
    { icon: FaTwitter, url: 'https://twitter.com', color: '#1DA1F2', label: 'Twitter' },
];

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-white py-4 mt-8">
            <div className="container mx-auto px-4">
                <div className="flex flex-col items-center gap-3">
                    {/* Social Links */}
                    <div className="flex gap-4">
                        {socialLinks.map((social) => (
                            <motion.a
                                key={social.label}
                                href={social.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-2xl transition-colors"
                                style={{ color: '#9ca3af' }}
                                whileHover={{
                                    scale: 1.2,
                                    color: social.color,
                                    rotate: [0, -10, 10, 0]
                                }}
                                whileTap={{ scale: 0.9 }}
                                aria-label={social.label}
                            >
                                <social.icon />
                            </motion.a>
                        ))}
                    </div>

                    {/* Copyright */}
                    <div className="text-center text-gray-400 text-xs">
                        <p>© {new Date().getFullYear()} {process.env.NEXT_PUBLIC_STREAMER_NAME || 'WatiLive'}. All rights reserved.</p>
                        <p className="mt-1">Desarrollado por KlicaDev</p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
