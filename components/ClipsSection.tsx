'use client';

import { motion } from 'framer-motion';
import { FaGamepad, FaPlay } from 'react-icons/fa';

const clips = [
    {
        id: 1,
        title: 'Epic Boss Fight',
        thumbnail: 'https://via.placeholder.com/400x225/111827/ef4444?text=Epic+Boss+Fight',
        game: 'The Binding of Isaac',
        views: '1.2K'
    },
    {
        id: 2,
        title: 'Insane Speedrun Moment',
        thumbnail: 'https://via.placeholder.com/400x225/111827/a855f7?text=Speedrun+Moment',
        game: 'Celeste',
        views: '850'
    },
    {
        id: 3,
        title: 'Clutch Victory',
        thumbnail: 'https://via.placeholder.com/400x225/111827/10b981?text=Clutch+Victory',
        game: 'Elden Ring',
        views: '2.5K'
    },
    {
        id: 4,
        title: 'Funny Fail Compilation',
        thumbnail: 'https://via.placeholder.com/400x225/111827/ef4444?text=Funny+Fails',
        game: 'Various',
        views: '5K'
    },
    {
        id: 5,
        title: 'World Record Attempt',
        thumbnail: 'https://via.placeholder.com/400x225/111827/a855f7?text=WR+Attempt',
        game: 'Super Mario 64',
        views: '10K'
    },
    {
        id: 6,
        title: 'Community Challenge',
        thumbnail: 'https://via.placeholder.com/400x225/111827/10b981?text=Community+Challenge',
        game: 'Dark Souls 3',
        views: '3.1K'
    },
];

export default function ClipsSection() {
    return (
        <div className="bg-gray-900/80 rounded-2xl p-8 shadow-xl border border-gray-800 backdrop-blur-sm hud-card">
            {/* Title */}
            <div className="flex items-center gap-3 mb-6">
                <FaGamepad className="text-4xl text-accent-green" />
                <h2 className="text-3xl font-bold" style={{ fontFamily: 'var(--font-gaming)' }}>
                    Epic Clips & Moments
                </h2>
            </div>

            {/* Clips Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {clips.map((clip, index) => (
                    <motion.div
                        key={clip.id}
                        className="group relative bg-gray-900 rounded-xl overflow-hidden shadow-lg cursor-pointer border border-gray-800 hover:border-accent-green transition-all duration-300 hud-card"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.02, y: -5 }}
                    >
                        {/* Thumbnail */}
                        <div className="relative overflow-hidden aspect-video">
                            <img
                                src={clip.thumbnail}
                                alt={clip.title}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <FaPlay className="text-5xl text-accent-green drop-shadow-lg fill-current" />
                            </div>
                            <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                                {clip.views} views
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-4">
                            <h3 className="font-bold text-white line-clamp-1 mb-1 group-hover:text-accent-green transition-colors">
                                {clip.title}
                            </h3>
                            <p className="text-xs text-gray-400 mb-2">{clip.game}</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Call to Action */}
            <motion.div
                className="mt-8 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
            >
                <p className="text-gray-400 mb-4">Want to see more epic moments?</p>
                <motion.button
                    className="bg-accent-purple hover:bg-purple-600 text-white font-bold py-3 px-8 rounded-lg transition-colors border border-accent-purple hover:border-white shadow-[0_0_10px_rgba(131,56,236,0.5)] hover:shadow-[0_0_20px_rgba(131,56,236,0.8)]"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    View All Clips
                </motion.button>
            </motion.div>
        </div>
    );
}
