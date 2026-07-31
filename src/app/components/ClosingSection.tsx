'use client';

import React, { useState, useEffect, useRef } from 'react';

interface Balloon {
  id: number;
  x: number;
  color: string;
  size: number;
  delay: number;
  duration: number;
}

const BALLOON_COLORS = ['#E8789A', '#7BB8D4', '#F4A8C0', '#A8D4E8', '#C8A8D4'];

const DRIVE_FILE_ID = '1N8k3HHkRaiXdxfOdHl__7NIWFaP9QwKC';

function AudioPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [hasError, setHasError] = useState(false);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        setHasError(true);
      });
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) setCurrentTime(audioRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) setDuration(audioRef.current.duration);
  };

  const handleEnded = () => setIsPlaying(false);
  const handleError = () => setHasError(true);

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = Number(e.target.value);
    setCurrentTime(Number(e.target.value));
  };

  const formatTime = (t: number) => {
    if (!isFinite(t)) return '0:00';
    const m = Math.floor(t / 60);
    const s = Math.floor(t % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  if (hasError) {
    return (
      <div
        className="w-full max-w-sm rounded-2xl border border-border shadow-lg overflow-hidden"
        style={{ background: 'linear-gradient(135deg, rgba(232,120,154,0.08) 0%, rgba(123,184,212,0.08) 100%)' }}
      >
        <div className="px-4 pt-3 pb-1">
          <p className="text-sm font-semibold text-foreground font-sans">Hingga Tua Bersama</p>
          <p className="text-xs text-muted-foreground font-sans mb-2">Rizki Febian</p>
        </div>
        <iframe
          src={`https://drive.google.com/file/d/${DRIVE_FILE_ID}/preview`}
          width="100%"
          height="80"
          allow="autoplay"
          style={{ border: 'none', display: 'block' }}
          title="Hingga Tua Bersama - Rizki Febian"
        />
      </div>
    );
  }

  return (
    <div
      className="w-full max-w-sm rounded-2xl border border-border shadow-lg px-5 py-4 flex flex-col gap-3"
      style={{ background: 'linear-gradient(135deg, rgba(232,120,154,0.08) 0%, rgba(123,184,212,0.08) 100%)' }}
    >
      <audio
        ref={audioRef}
        src={`https://drive.google.com/uc?export=download&id=${DRIVE_FILE_ID}`}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
        onError={handleError}
        preload="metadata"
        crossOrigin="anonymous"
      />
      <div className="flex items-center gap-4">
        {/* Play/Pause Button */}
        <button
          onClick={togglePlay}
          aria-label={isPlaying ? 'Pause' : 'Play'}
          className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 shadow-md"
          style={{ background: 'linear-gradient(135deg, #E8789A, #7BB8D4)' }}
        >
          {isPlaying ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
              <rect x="6" y="4" width="4" height="16" rx="1" />
              <rect x="14" y="4" width="4" height="16" rx="1" />
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
              <polygon points="5,3 19,12 5,21" />
            </svg>
          )}
        </button>
        {/* Track info */}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-foreground font-sans truncate">Hingga Tua Bersama</p>
          <p className="text-xs text-muted-foreground font-sans">Rizki Febian</p>
        </div>
        {/* Time */}
        <span className="text-xs text-muted-foreground font-sans flex-shrink-0">
          {formatTime(currentTime)} / {formatTime(duration)}
        </span>
      </div>
      {/* Progress bar */}
      <input
        type="range"
        min={0}
        max={duration || 0}
        step={0.1}
        value={currentTime}
        onChange={handleSeek}
        className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
        style={{
          background: `linear-gradient(to right, #E8789A ${duration ? (currentTime / duration) * 100 : 0}%, rgba(232,120,154,0.2) ${duration ? (currentTime / duration) * 100 : 0}%)`,
          accentColor: '#E8789A',
        }}
        aria-label="Seek audio"
      />
    </div>
  );
}

export default function ClosingSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [balloons, setBalloons] = useState<Balloon[]>([]);

  useEffect(() => {
    const b: Balloon[] = Array.from({ length: 7 }, (_, i) => ({
      id: i,
      x: 5 + i * 13,
      color: BALLOON_COLORS[i % BALLOON_COLORS.length],
      size: 40 + (i % 3) * 12,
      delay: i * 0.4,
      duration: 3.5 + (i % 3) * 0.8,
    }));
    setBalloons(b);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const items = entry.target.querySelectorAll('.reveal-item');
            items.forEach((item, i) => {
              setTimeout(() => item.classList.add('revealed'), i * 100);
            });
          }
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="closing"
      ref={sectionRef}
      className="relative py-24 px-4 overflow-hidden"
    >
      {/* Background gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(180deg, transparent 0%, rgba(232,120,154,0.06) 40%, rgba(123,184,212,0.08) 100%)',
        }}
      />

      {/* Balloons */}
      <div className="absolute bottom-0 left-0 right-0 h-64 pointer-events-none overflow-hidden">
        {balloons.map((balloon) => (
          <div
            key={balloon.id}
            className="balloon-sway absolute"
            style={{
              left: `${balloon.x}%`,
              bottom: 0,
              animationDelay: `${balloon.delay}s`,
              animationDuration: `${balloon.duration}s`,
            }}
          >
            <svg
              width={balloon.size}
              height={balloon.size * 1.3}
              viewBox="0 0 40 52"
              fill="none"
              aria-hidden="true"
            >
              <ellipse cx="20" cy="18" rx="16" ry="18" fill={balloon.color} opacity="0.8" />
              <path d="M20 36 Q18 42 20 48" stroke={balloon.color} strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
              <ellipse cx="14" cy="12" rx="4" ry="5" fill="white" opacity="0.25" />
            </svg>
          </div>
        ))}
      </div>

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        {/* Big emoji */}
        <div className="reveal-item text-7xl mb-6 select-none">🎂</div>

        {/* Heading */}
        <h2
          className="reveal-item font-display font-bold text-foreground mb-4"
          style={{ fontSize: 'clamp(2rem, 6vw, 4rem)' }}
        >
          Ulfiana,{' '}
          <span className="text-shimmer">Kamu Luar Biasa</span>
        </h2>

        {/* Message */}
        <p className="reveal-item text-muted-foreground font-sans text-base sm:text-lg leading-relaxed max-w-xl mx-auto mb-8">
          Selamat bertambah usia, sayang. Semoga hari ini menjadi awal dari tahun yang penuh berkah, tawa, dan cinta. Aku mencintaimu, hari ini, esok, dan di setiap perjalanan yang masih akan kita lalui bersama. 🌟
        </p>

        {/* Decorative divider */}
        <div className="reveal-item flex items-center gap-4 justify-center mb-8">
          <div className="h-px flex-1 max-w-[80px]" style={{ background: 'linear-gradient(to right, transparent, var(--primary))' }} />
          <span className="text-2xl">💗</span>
          <div className="h-px flex-1 max-w-[80px]" style={{ background: 'linear-gradient(to left, transparent, var(--accent))' }} />
        </div>

        {/* Audio Music Player */}
        <div className="reveal-item flex flex-col items-center gap-3 mb-10">
          <AudioPlayer />
          <p className="text-xs text-muted-foreground font-sans">
            🎵 Play musik untuk menemanimu
          </p>
        </div>

        {/* Final CTA */}
        <div className="reveal-item flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-3 rounded-full font-sans font-semibold text-base transition-all duration-300 hover:opacity-90 hover:scale-105 shadow-lg"
            style={{ boxShadow: '0 8px 24px rgba(232,120,154,0.35)' }}
          >
            🎉 Ulangi Lagi
          </a>
          <a
            href="#wishes"
            className="inline-flex items-center justify-center gap-2 bg-secondary text-secondary-foreground px-8 py-3 rounded-full font-sans font-semibold text-base transition-all duration-300 hover:opacity-90 hover:scale-105 border border-border"
          >
            💌 Baca Pesan Lagi
          </a>
        </div>

        {/* Sparkle row */}
        <div className="reveal-item mt-10 flex justify-center gap-3 text-2xl select-none">
          {['✨', '🌸', '💗', '🎂', '💫', '🌸', '✨'].map((e, i) => (
            <span
              key={i}
              className="sparkle"
              style={{ animationDelay: `${i * 0.25}s` }}
            >
              {e}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}