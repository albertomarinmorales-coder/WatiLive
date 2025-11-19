'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaYoutube, FaExternalLinkAlt } from 'react-icons/fa';
import { YouTubeVideo } from '@/types';
import { getRecentVideos } from '@/lib/youtube';

export default function YouTubeSection() {
    const [videos, setVideos] = useState<YouTubeVideo[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchVideos() {
            try {
                const data = await getRecentVideos();
                setVideos(data);
            } catch (error) {
                console.error('Error loading videos:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchVideos();
    }, []);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    };

    return (
        <div className="bg-gray-800 rounded-lg p-8 shadow-xl">
            {/* Title */}
            <div className="flex items-center gap-3 mb-6">
                <FaYoutube className="text-4xl text-red-600" />
                <h2 className="text-3xl font-bold" style={{ fontFamily: 'var(--font-gaming)' }}>
                    Latest Videos
                </h2>
            </div>

            {loading ? (
                <div className="text-center py-12">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-accent-red border-t-transparent"></div>
                    <p className="mt-4 text-gray-400">Loading videos...</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {videos.map((video, index) => (
                        <motion.a
                            key={video.id}
                            href={video.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group bg-gray-900 rounded-lg overflow-hidden shadow-lg cursor-pointer"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ scale: 1.05, y: -5 }}
                        >
                            {/* Thumbnail */}
                            <div className="relative overflow-hidden aspect-video">
                                <img
                                    src={video.thumbnail}
                                    alt={video.title}
                                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                                    <FaExternalLinkAlt className="text-white text-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                </div>
                            </div>

                            {/* Info */}
                            <div className="p-4">
                                <h3 className="font-semibold text-white mb-2 line-clamp-2 group-hover:text-accent-red transition-colors">
                                    {video.title}
                                </h3>
                                <p className="text-sm text-gray-400">{formatDate(video.publishedAt)}</p>
                            </div>
                        </motion.a>
                    ))}
                </div>
            )}
        </div>
    );
}
