'use client';

import { motion } from 'framer-motion';
import { FaGamepad } from 'react-icons/fa';

const clips = [
    {
        id: 1,
        title: 'Epic Boss Fight',
        thumbnail: 'https://via.placeholder.com/400x225/111827/ef4444?text=Epic+Boss+Fight',
        game: 'The Binding of Isaac',
    },
    {
        id: 2,
        title: 'Insane Speedrun Moment',
        thumbnail: 'https://via.placeholder.com/400x225/111827/a855f7?text=Speedrun+Moment',
        game: 'Celeste',
    },
    {
        id: 3,
        title: 'Clutch Victory',
        thumbnail: 'https://via.placeholder.com/400x225/111827/10b981?text=Clutch+Victory',
        game: 'Elden Ring',
    },
    {
        id: 4,
        title: 'Funny Fail Compilation',
        thumbnail: 'https://via.placeholder.com/400x225/111827/ef4444?text=Funny+Fails',
        game: 'Various',
    },
    {
        id: 5,
        title: 'World Record Attempt',
        thumbnail: 'https://via.placeholder.com/400x225/111827/a855f7?text=WR+Attempt',
        game: 'Super Mario 64',
    },
    {
        id: 6,
        title: 'Community Challenge',
        thumbnail: 'https://via.placeholder.com/400x225/111827/10b981?text=Community+Challenge',
        game: 'Dark Souls 3',
    },
];

export default function ClipsSection() {
    return (
        <div className="bg-gray-800 rounded-lg p-8 shadow-xl">
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
                        className="group bg-gray-900 rounded-lg overflow-hidden shadow-lg cursor-pointer"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.05, y: -5 }}
                    >
                        {/* Thumbnail */}
                        <div className="relative overflow-hidden aspect-video">
                            <img
                                src={clip.thumbnail}
                                alt={clip.title}
                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <div className="absolute bottom-0 left-0 right-0 p-4">
                                    <div className="text-accent-green text-sm font-semibold">{clip.game}</div>
                                </div>
                            </div>
                        </div>

                        {/* Info */}
                        <div className="p-4">
                            <h3 className="font-semibold text-white group-hover:text-accent-green transition-colors">
                                {clip.title}
                            </h3>
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
                    className="bg-accent-purple hover:bg-purple-600 text-white font-bold py-3 px-8 rounded-lg transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    View All Clips
                </motion.button>
            </motion.div>
        </div>
    );
}
