'use client';

import React, { useRef } from 'react';
import HeroSection from './components/HeroSection';
import WishesSection from './components/WishesSection';
import GallerySection from './components/GallerySection';
import MilestonesSection from './components/MilestonesSection';
import ClosingSection from './components/ClosingSection';
import Footer from '@/components/Footer';

const DRIVE_FILE_ID = '1N8k3HHkRaiXdxfOdHl__7NIWFaP9QwKC';

export default function Page() {
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleEnvelopeOpen = () => {
    const audio = audioRef?.current;
    if (!audio) return;
    audio.volume = 0.5;
    audio?.play()?.catch(() => {
      // autoplay blocked — user will still have the player in ClosingSection
    });
  };

  return (
    <main className="relative overflow-x-hidden bg-background">
      {/* Background music — starts when envelope is clicked */}
      <audio
        ref={audioRef}
        src={`https://drive.google.com/uc?export=download&id=${DRIVE_FILE_ID}`}
        loop
        preload="auto"
        crossOrigin="anonymous"
        style={{ display: 'none' }}
      />
      <HeroSection onOpen={handleEnvelopeOpen} />
      <WishesSection />
      <GallerySection />
      <MilestonesSection />
      <ClosingSection />
      <Footer />
    </main>
  );
}