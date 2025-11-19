'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Footer from '@/components/Footer';
import AboutSection from '@/components/AboutSection';
import YouTubeSection from '@/components/YouTubeSection';
import TwitchSection from '@/components/TwitchSection';
import ClipsSection from '@/components/ClipsSection';
import FloatingItems from '@/components/FloatingItems';
import XMBMenu from '@/components/XMBMenu';
import { TabType } from '@/types';

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabType>('about');

  return (
    <main className="h-screen w-screen overflow-hidden bg-background relative text-white font-sans selection:bg-accent-red selection:text-white">
      {/* Animated Background */}
      <div className="fixed inset-0 gamer-grid-bg opacity-20 pointer-events-none z-0" />
      <div className="fixed inset-0 scanlines z-50 pointer-events-none opacity-30" />
      <FloatingItems />

      {/* XMB Navigation (Horizontal) */}
      <XMBMenu activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Vertical Content Area */}
      <div className="absolute top-64 left-0 w-full h-[calc(100vh-256px)] overflow-y-auto no-scrollbar z-30 px-4 md:px-20 pb-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="max-w-7xl mx-auto"
          >
            {activeTab === 'about' && <AboutSection />}
            {activeTab === 'youtube' && <YouTubeSection />}
            {activeTab === 'twitch' && <TwitchSection />}
            {activeTab === 'clips' && <ClipsSection />}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Footer - Fixed at bottom */}
      <div className="fixed bottom-0 left-0 w-full z-40 pointer-events-none">
        <div className="pointer-events-auto">
          <Footer />
        </div>
      </div>
    </main>
  );
}
