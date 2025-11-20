'use client';

import { motion } from 'framer-motion';
import { FaTwitch, FaYoutube, FaDiscord, FaTwitter, FaUserFriends, FaClock, FaTrophy, FaGamepad } from 'react-icons/fa';
import Image from 'next/image';

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
        <div className="space-y-8">
            {/* Header Section with Background Image */}
            <motion.div
                className="relative h-64 md:h-80 rounded-2xl overflow-hidden border border-gray-800 shadow-xl"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                {/* Background Image */}
                <div className="absolute inset-0">
                    <Image
                        src="/images/header.jpg"
                        alt="WatiLive Header"
                        fill
                        className="object-cover"
                        priority
                    />
                    {/* Dark Overlay */}
                    <div className="absolute inset-0 bg-black/60"></div>
                </div>

                {/* WatiLive Text */}
                <div className="relative h-full flex items-center justify-center">
                    <motion.h1
                        className="text-5xl md:text-7xl font-bold text-white text-center"
                        style={{ fontFamily: 'var(--font-gaming)', textShadow: '0 0 20px rgba(131, 56, 236, 0.8)' }}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                    >
                        WatiLive
                    </motion.h1>
                </div>
            </motion.div>

            {/* 3-Image Grid */}
            <motion.div
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
            >
                {[
                    { src: '/images/avatarTR.png', alt: 'Avatar Left', flip: true },
                    { src: '/images/tlost.png', alt: 'Avatar Center', flip: false },
                    { src: '/images/avatarTR.png', alt: 'Avatar Right', flip: false },
                ].map((image, index) => (
                    <motion.div
                        key={index}
                        className="relative aspect-square rounded-xl overflow-hidden border border-gray-800 shadow-lg hover:border-accent-purple transition-all"
                        whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(131, 56, 236, 0.5)' }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                    >
                        <Image
                            src={image.src}
                            alt={image.alt}
                            fill
                            className={`object-cover ${image.flip ? 'scale-x-[-1]' : ''}`}
                        />
                    </motion.div>
                ))}
            </motion.div>

            {/* Biography Section */}
            <motion.div
                className="bg-gray-900/80 p-8 rounded-2xl border border-gray-800 backdrop-blur-sm shadow-xl hud-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
            >
                {/* Title */}
                <div className="flex items-center gap-3 mb-6">
                    <FaGamepad className="text-4xl text-accent-red" />
                    <h2 className="text-3xl font-bold" style={{ fontFamily: 'var(--font-gaming)' }}>
                        Sobre mí
                    </h2>
                </div>

                {/* Bio */}
                <p className="text-gray-300 text-lg leading-relaxed mb-8">
                    {bio}
                </p>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                        { label: 'Transmisiones', value: '1.2K+', icon: FaTwitch, color: 'text-purple-400' },
                        { label: 'Seguidores', value: '50K+', icon: FaUserFriends, color: 'text-blue-400' },
                        { label: 'Horas', value: '5000+', icon: FaClock, color: 'text-green-400' },
                        { label: 'Juegos', value: '100+', icon: FaTrophy, color: 'text-yellow-400' },
                    ].map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            className="bg-black/40 p-4 rounded-xl text-center border border-gray-800 hover:border-accent-red transition-colors hud-card"
                            whileHover={{ scale: 1.05, backgroundColor: '#374151' }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.9 + index * 0.1 }}
                        >
                            <stat.icon className={`text-2xl mx-auto mb-2 ${stat.color}`} />
                            <div className="text-2xl md:text-3xl font-bold text-white mb-1">
                                {stat.value}
                            </div>
                            <div className="text-sm text-gray-400 uppercase tracking-wider">{stat.label}</div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            {/* Social Links - Separate Container */}
            <motion.div
                className="bg-gray-900/80 p-8 rounded-2xl border border-gray-800 backdrop-blur-sm shadow-xl hud-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
            >
                <h2 className="text-3xl font-bold text-center mb-6" style={{ fontFamily: 'var(--font-gaming)' }}>
                    Conecta conmigo
                </h2>
                <div className="flex gap-4 flex-wrap justify-center">
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
                            transition={{ delay: 1.3 + index * 0.1 }}
                        >
                            <social.icon className="text-xl" />
                            <span className="font-medium">{social.label}</span>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
}
