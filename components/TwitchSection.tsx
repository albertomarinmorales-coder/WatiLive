'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaTwitch, FaUserFriends } from 'react-icons/fa';
import { ExternalLink } from 'lucide-react';
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
        <div className="bg-gray-900/80 rounded-2xl p-8 shadow-xl border border-gray-800 backdrop-blur-sm hud-card">
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
                        <motion.a
                            key={stream.id}
                            href={`https://twitch.tv/${process.env.NEXT_PUBLIC_TWITCH_USERNAME}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group relative bg-gray-900 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-800 hover:border-accent-purple hud-card"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ scale: 1.02, y: -5 }}
                        >
                            {/* Thumbnail */}
                            <div className="relative aspect-video overflow-hidden">
                                <img
                                    src={stream.thumbnail}
                                    alt={stream.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded uppercase tracking-wider">
                                    {stream.isLive ? 'LIVE' : 'VOD'}
                                </div>
                                <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                                    {stream.viewerCount.toLocaleString()} viewers
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-4">
                                <h3 className="font-bold text-white line-clamp-1 mb-1 group-hover:text-accent-purple transition-colors">
                                    {stream.title}
                                </h3>
                                <p className="text-xs text-gray-400 mb-3">
                                    {stream.isLive ? 'Streaming Now' : 'Past Broadcast'}
                                </p>
                                <div className="flex justify-between items-center text-xs text-gray-500">
                                    <span>{formatDate(stream.startedAt)}</span>
                                    <span className="flex items-center gap-1 group-hover:text-white transition-colors">
                                        Watch <ExternalLink size={12} />
                                    </span>
                                </div>
                            </div>
                        </motion.a>
                    ))}
                </div>
            )}

            {/* Embed Section (if live) */}
            {isLive && (
                <motion.div
                    className="mt-8 bg-gray-900 rounded-lg overflow-hidden border border-gray-800 hud-card"
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
