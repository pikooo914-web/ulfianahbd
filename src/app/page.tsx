'use client';

import React, { useRef, useState } from 'react';
import HeroSection from './components/HeroSection';
import WishesSection from './components/WishesSection';
import GallerySection from './components/GallerySection';
import MilestonesSection from './components/MilestonesSection';
import ClosingSection from './components/ClosingSection';
import Footer from '@/components/Footer';

export default function Page() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleEnvelopeOpen = () => {
    const audio = audioRef?.current;
    if (!audio) return;
    audio.volume = 0.5;
    audio?.play()?.then(() => {
      setIsPlaying(true);
    })?.catch(() => {
      // autoplay blocked
    });
  };

  const togglePlay = () => {
    const audio = audioRef?.current;
    if (!audio) return;
    if (isPlaying) {
      audio?.pause();
      setIsPlaying(false);
    } else {
      audio?.play()?.then(() => {
        setIsPlaying(true);
      })?.catch(() => {});
    }
  };

  return (
    <main className="relative overflow-x-hidden bg-background">
      {/* Background music */}
      <audio
        ref={audioRef}
        src="/assets/images/Edd_Sheeran_-_Perfect_(mp3.pm).mp3"
        loop
        preload="auto"
        style={{ display: 'none' }}
      />

      {/* Floating Play/Pause Button */}
      <button
        onClick={togglePlay}
        aria-label={isPlaying ? 'Pause music' : 'Play music'}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-xl transition-all duration-200 hover:scale-110 active:scale-95"
        style={{ background: 'linear-gradient(135deg, #E8789A, #7BB8D4)' }}
      >
        {isPlaying ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
            <rect x="6" y="4" width="4" height="16" rx="1" />
            <rect x="14" y="4" width="4" height="16" rx="1" />
          </svg>
        ) : (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
            <polygon points="6,3 20,12 6,21" />
          </svg>
        )}
      </button>

      <HeroSection onOpen={handleEnvelopeOpen} />
      <WishesSection />
      <GallerySection />
      <MilestonesSection />
      <ClosingSection />
      <Footer />
    </main>
  );
}