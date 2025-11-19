'use client';

import { motion } from 'framer-motion';
import { FaTwitch, FaYoutube, FaDiscord, FaTwitter, FaGamepad, FaUserFriends, FaClock, FaTrophy } from 'react-icons/fa';

const socialIcons = [
    { icon: FaTwitch, color: '#9146FF', label: 'Twitch' },
    { icon: FaYoutube, color: '#FF0000', label: 'YouTube' },
    { icon: FaDiscord, color: '#5865F2', label: 'Discord' },
    { icon: FaTwitter, color: '#1DA1F2', label: 'Twitter' },
];

export default function AboutSection() {
    const bio = process.env.NEXT_PUBLIC_STREAMER_BIO ||
        "El primer hispanohablante en completar el Infinity en The Binding of Isaac. Jugador apasionado y revienta platinos. ¿Cómo lo consigo? Estando en \"to lo arto\".";

    return (
        <motion.div
            className="bg-gray-900/80 p-8 rounded-2xl border border-gray-800 backdrop-blur-sm shadow-xl hud-card"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
        >
            {/* Title */}
            <div className="flex items-center gap-3 mb-6">
                <FaGamepad className="text-4xl text-accent-red" />
                <h2 className="text-3xl font-bold" style={{ fontFamily: 'var(--font-gaming)' }}>
                    About Me
                </h2>
            </div>

            {/* Bio */}
            <p className="text-gray-300 text-lg leading-relaxed mb-8">
                {bio}
            </p>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {[
                    { label: 'Streams', value: '1.2K+', icon: FaTwitch, color: 'text-purple-400' },
                    { label: 'Followers', value: '50K+', icon: FaUserFriends, color: 'text-blue-400' },
                    { label: 'Hours', value: '5000+', icon: FaClock, color: 'text-green-400' },
                    { label: 'Games', value: '100+', icon: FaTrophy, color: 'text-yellow-400' },
                ].map((stat, index) => (
                    <motion.div
                        key={stat.label}
                        className="bg-black/40 p-4 rounded-xl text-center border border-gray-800 hover:border-accent-red transition-colors hud-card"
                        whileHover={{ scale: 1.05, backgroundColor: '#374151' }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <stat.icon className={`text-2xl mx-auto mb-2 ${stat.color}`} />
                        <div className="text-2xl md:text-3xl font-bold text-white mb-1">
                            {stat.value}
                        </div>
                        <div className="text-sm text-gray-400 uppercase tracking-wider">{stat.label}</div>
                    </motion.div>
                ))}
            </div>

            {/* Social Links */}
            <div>
                <h3 className="text-xl font-semibold mb-4 text-accent-purple">Connect With Me</h3>
                <div className="flex gap-4 flex-wrap">
                    {socialIcons.map((social, index) => (
                        <motion.div
                            key={social.label}
                            className="flex items-center gap-2 bg-gray-900 px-4 py-3 rounded-lg cursor-pointer border border-gray-800 hover:border-accent-cyan transition-all"
                            whileHover={{
                                scale: 1.05,
                                backgroundColor: social.color,
                                color: '#ffffff',
                                boxShadow: `0 0 15px ${social.color}`
                            }}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <social.icon className="text-xl" />
                            <span className="font-medium">{social.label}</span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}
