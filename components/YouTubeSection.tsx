'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaYoutube } from 'react-icons/fa';
import { ExternalLink } from 'lucide-react';
import { YouTubeVideo } from '@/types';
import { getRecentVideos } from '@/lib/youtube';

export default function YouTubeSection() {
    const [videos, setVideos] = useState<YouTubeVideo[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<'live' | 'plus'>('live');

    useEffect(() => {
        async function fetchVideos() {
            setLoading(true);
            try {
                const data = await getRecentVideos(6, activeTab);
                setVideos(data);
            } catch (error) {
                console.error('Error al cargar los videos:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchVideos();
    }, [activeTab]);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('es-ES', { month: 'short', day: 'numeric', year: 'numeric' });
    };

    return (
        <div className="bg-gray-900/80 rounded-2xl p-8 shadow-xl border border-gray-800 backdrop-blur-sm hud-card">
            {/* Header with Title and Tabs */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                <div className="flex items-center gap-3">
                    <FaYoutube className="text-4xl text-red-600" />
                    <h2 className="text-3xl font-bold" style={{ fontFamily: 'var(--font-gaming)' }}>
                        Últimos videos
                    </h2>
                </div>

                {/* Tabs */}
                <div className="flex p-1 bg-gray-950/50 rounded-xl border border-gray-800">
                    <button
                        onClick={() => setActiveTab('live')}
                        className={`px-6 py-2 rounded-lg font-bold transition-all duration-300 ${activeTab === 'live'
                                ? 'text-white shadow-lg shadow-purple-900/20'
                                : 'text-gray-400 hover:text-white hover:bg-white/5'
                            }`}
                        style={activeTab === 'live' ? { backgroundColor: 'var(--accent-purple)' } : {}}
                    >
                        WatiLive
                    </button>
                    <button
                        onClick={() => setActiveTab('plus')}
                        className={`px-6 py-2 rounded-lg font-bold transition-all duration-300 ${activeTab === 'plus'
                                ? 'text-white shadow-lg shadow-purple-900/20'
                                : 'text-gray-400 hover:text-white hover:bg-white/5'
                            }`}
                        style={activeTab === 'plus' ? { backgroundColor: 'var(--accent-purple)' } : {}}
                    >
                        WatiPlus
                    </button>
                </div>
            </div>

            {loading ? (
                <div className="text-center py-12">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-t-transparent" style={{ borderColor: 'var(--accent-purple)', borderTopColor: 'transparent' }}></div>
                    <p className="mt-4 text-gray-400">Cargando videos de {activeTab === 'live' ? 'WatiLive' : 'WatiPlus'}...</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {videos.map((video, index) => (
                        <motion.a
                            key={video.id}
                            href={video.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group relative bg-gray-900 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-800 hover:border-purple-500/50 hud-card"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ scale: 1.02, y: -5 }}
                        >
                            {/* Thumbnail */}
                            <div className="relative aspect-video overflow-hidden">
                                <img
                                    src={video.thumbnail}
                                    alt={video.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <FaYoutube className="text-5xl drop-shadow-lg" style={{ color: 'var(--accent-purple)' }} />
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-4">
                                <h3 className="font-bold text-white line-clamp-2 mb-2 group-hover:text-purple-400 transition-colors">
                                    {video.title}
                                </h3>
                                <div className="flex justify-between items-center text-xs text-gray-400">
                                    <span>{formatDate(video.publishedAt)}</span>
                                    <span className="flex items-center gap-1 group-hover:text-white transition-colors">
                                        Ver <ExternalLink size={12} />
                                    </span>
                                </div>
                            </div>
                        </motion.a>
                    ))}
                </div>
            )}
        </div>
    );
}
