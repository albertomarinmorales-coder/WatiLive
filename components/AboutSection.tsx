'use client';

import { motion } from 'framer-motion';
import { FaTwitch, FaYoutube, FaDiscord, FaTwitter, FaGamepad } from 'react-icons/fa';

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
        <div className="bg-gray-800 rounded-lg p-8 shadow-xl">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
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
                        { label: 'Streams', value: '500+' },
                        { label: 'Followers', value: '10K+' },
                        { label: 'Hours Streamed', value: '2000+' },
                        { label: 'Games Played', value: '50+' },
                    ].map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            className="bg-gray-900 rounded-lg p-4 text-center"
                            whileHover={{ scale: 1.05, backgroundColor: '#374151' }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <div className="text-2xl md:text-3xl font-bold text-accent-red mb-1">
                                {stat.value}
                            </div>
                            <div className="text-sm text-gray-400">{stat.label}</div>
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
                                className="flex items-center gap-2 bg-gray-900 px-4 py-3 rounded-lg cursor-pointer"
                                whileHover={{
                                    scale: 1.05,
                                    backgroundColor: social.color,
                                    color: '#ffffff'
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
        </div>
    );
}
