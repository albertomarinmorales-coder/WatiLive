'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TabContent from '@/components/TabContent';
import AboutSection from '@/components/AboutSection';
import YouTubeSection from '@/components/YouTubeSection';
import TwitchSection from '@/components/TwitchSection';
import ClipsSection from '@/components/ClipsSection';
import FloatingItems from '@/components/FloatingItems';
import { TabType } from '@/types';

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabType>('about');

  return (
    <main className="min-h-screen bg-background relative flex flex-col">
      {/* Floating Background Decorations */}
      <FloatingItems />

      {/* Main Content */}
      <div className="relative z-10 flex-1 flex flex-col">
        {/* Header */}
        <Header />

        {/* Navigation Tabs - Below Header */}
        <nav className="py-4 mt-6 sticky top-0 z-40">
          <div className="container mx-auto px-4 flex gap-2 md:gap-3 flex-wrap justify-center">
            {(['about', 'youtube', 'twitch', 'clips'] as const).map((tab) => (
              <motion.button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2 md:px-6 md:py-3 rounded-lg font-semibold transition-all text-sm md:text-base ${activeTab === tab
                  ? 'bg-accent-red text-white shadow-2xl scale-105'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                whileHover={{ scale: 1.08, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </motion.button>
            ))}
          </div>
        </nav>

        {/* Content Area */}
        <div className="container mx-auto px-4 py-8 flex-1">
          <TabContent isActive={activeTab === 'about'}>
            <AboutSection />
          </TabContent>

          <TabContent isActive={activeTab === 'youtube'}>
            <YouTubeSection />
          </TabContent>

          <TabContent isActive={activeTab === 'twitch'}>
            <TwitchSection />
          </TabContent>

          <TabContent isActive={activeTab === 'clips'}>
            <ClipsSection />
          </TabContent>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </main>
  );
}
