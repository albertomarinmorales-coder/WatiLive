'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaTwitch, FaEye } from 'react-icons/fa';
import { TwitchStream } from '@/types';
import { checkLiveStatus, getRecentStreams } from '@/lib/twitch';

export default function TwitchSection() {
    const [streams, setStreams] = useState<TwitchStream[]>([]);
    const [isLive, setIsLive] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const [liveStatus, recentStreams] = await Promise.all([
                    checkLiveStatus(),
                    getRecentStreams(),
                ]);
                setIsLive(liveStatus);
                setStreams(recentStreams);
            } catch (error) {
                console.error('Error loading Twitch data:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    };

    return (
        <div className="bg-gray-800 rounded-lg p-8 shadow-xl">
            {/* Title and Live Badge */}
            <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
                <div className="flex items-center gap-3">
                    <FaTwitch className="text-4xl text-purple-600" />
                    <h2 className="text-3xl font-bold" style={{ fontFamily: 'var(--font-gaming)' }}>
                        Twitch Streams
                    </h2>
                </div>

                {isLive && (
                    <motion.div
                        className="flex items-center gap-2 bg-red-600 px-4 py-2 rounded-full"
                        animate={{
                            boxShadow: [
                                '0 0 5px rgba(239, 68, 68, 0.5)',
                                '0 0 20px rgba(239, 68, 68, 0.8)',
                                '0 0 5px rgba(239, 68, 68, 0.5)',
                            ]
                        }}
                        transition={{ repeat: Infinity, duration: 2 }}
                    >
                        <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
                        </span>
                        <span className="font-bold text-white">LIVE NOW</span>
                    </motion.div>
                )}
            </div>

            {loading ? (
                <div className="text-center py-12">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-purple-600 border-t-transparent"></div>
                    <p className="mt-4 text-gray-400">Loading streams...</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {streams.map((stream, index) => (
                        <motion.div
                            key={stream.id}
                            className="bg-gray-900 rounded-lg overflow-hidden shadow-lg"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ scale: 1.05, y: -5 }}
                        >
                            {/* Thumbnail */}
                            <div className="relative overflow-hidden aspect-video">
                                <img
                                    src={stream.thumbnail}
                                    alt={stream.title}
                                    className="w-full h-full object-cover"
                                />
                                {stream.isLive && (
                                    <div className="absolute top-2 left-2 bg-red-600 px-2 py-1 rounded text-xs font-bold">
                                        LIVE
                                    </div>
                                )}
                            </div>

                            {/* Info */}
                            <div className="p-4">
                                <h3 className="font-semibold text-white mb-2 line-clamp-2">
                                    {stream.title}
                                </h3>
                                <div className="flex items-center gap-4 text-sm text-gray-400">
                                    <div className="flex items-center gap-1">
                                        <FaEye />
                                        <span>{stream.viewerCount.toLocaleString()}</span>
                                    </div>
                                    <span>{formatDate(stream.startedAt)}</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}

            {/* Embed Section (if live) */}
            {isLive && (
                <motion.div
                    className="mt-8 bg-gray-900 rounded-lg overflow-hidden"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ delay: 0.3 }}
                >
                    <div className="aspect-video">
                        <iframe
                            src={`https://player.twitch.tv/?channel=${process.env.NEXT_PUBLIC_TWITCH_USERNAME}&parent=localhost`}
                            height="100%"
                            width="100%"
                            allowFullScreen
                            className="w-full h-full"
                        ></iframe>
                    </div>
                </motion.div>
            )}
        </div>
    );
}
