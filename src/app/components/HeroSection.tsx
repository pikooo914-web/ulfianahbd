'use client';

import React, { useState, useEffect, useRef } from 'react';
import AppLogo from '@/components/ui/AppLogo';

const CONFETTI_COLORS = [
  '#E8789A', '#7BB8D4', '#F4A8C0', '#A8D4E8',
  '#F9C6D5', '#C5E3F0', '#FFB3C6', '#93C9E0',
];

interface ConfettiPiece {
  id: number;
  x: number;
  color: string;
  size: number;
  duration: number;
  delay: number;
  shape: 'circle' | 'rect' | 'star';
}

interface HeroSectionProps {
  onOpen?: () => void;
}

export default function HeroSection({ onOpen }: HeroSectionProps) {
  const [envelopeOpened, setEnvelopeOpened] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [confetti, setConfetti] = useState<ConfettiPiece[]>([]);
  const [titleVisible, setTitleVisible] = useState(false);
  const [mounted, setMounted] = useState(false);
  const hasOpened = useRef(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleOpenEnvelope = () => {
    if (hasOpened.current) return;
    hasOpened.current = true;
    onOpen?.();
    setEnvelopeOpened(true);
    setTimeout(() => {
      setRevealed(true);
      spawnConfetti();
      setTimeout(() => setTitleVisible(true), 200);
    }, 900);
  };

  const spawnConfetti = () => {
    const pieces: ConfettiPiece[] = Array.from({ length: 60 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
      size: 6 + Math.random() * 8,
      duration: 2.5 + Math.random() * 2.5,
      delay: Math.random() * 1.2,
      shape: (['circle', 'rect', 'star'] as const)[i % 3],
    }));
    setConfetti(pieces);
    setTimeout(() => setConfetti([]), 6000);
  };

  // Auto-trigger after 1.5s for mobile users who might not know to click
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!hasOpened.current) handleOpenEnvelope();
    }, 3500);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted) {
    return (
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden noise-overlay">
        <div className="absolute inset-0 pointer-events-none">
          <div className="blob-pink absolute w-96 h-96 rounded-full top-0 left-0 opacity-40" />
          <div className="blob-blue absolute w-80 h-80 rounded-full bottom-0 right-0 opacity-40" />
          <div className="blob-pink absolute w-64 h-64 rounded-full bottom-1/4 left-1/4 opacity-20" />
        </div>
      </section>
    );
  }

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden noise-overlay">
      {/* Atmospheric background blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="blob-pink absolute w-96 h-96 rounded-full top-0 left-0 opacity-40" />
        <div className="blob-blue absolute w-80 h-80 rounded-full bottom-0 right-0 opacity-40" />
        <div className="blob-pink absolute w-64 h-64 rounded-full bottom-1/4 left-1/4 opacity-20" />
      </div>

      {/* Confetti layer */}
      <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
        {confetti.map((piece) => (
          <div
            key={piece.id}
            className="absolute confetti-piece"
            style={{
              left: `${piece.x}%`,
              top: '-20px',
              width: piece.shape === 'rect' ? `${piece.size * 0.6}px` : `${piece.size}px`,
              height: piece.shape === 'rect' ? `${piece.size * 1.4}px` : `${piece.size}px`,
              backgroundColor: piece.color,
              borderRadius: piece.shape === 'circle' ? '50%' : piece.shape === 'rect' ? '2px' : '0',
              animationDuration: `${piece.duration}s`,
              animationDelay: `${piece.delay}s`,
              clipPath: piece.shape === 'star' ?'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)'
                : undefined,
            }}
          />
        ))}
      </div>

      {/* Floating sparkles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="sparkle absolute text-primary"
            style={{
              left: `${10 + i * 12}%`,
              top: `${15 + (i % 3) * 25}%`,
              animationDelay: `${i * 0.3}s`,
              fontSize: `${12 + (i % 3) * 6}px`,
            }}
          >
            ✦
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center px-6 text-center">
        {/* Logo */}
        <div className="mb-8 animate-in-up" style={{ animationDelay: '0.1s' }}>
          <div className="flex items-center gap-2 justify-center">
            <AppLogo size={36} />
            <span className="font-display text-lg font-semibold text-foreground tracking-tight">
              UlfianaHBD
            </span>
          </div>
        </div>

        {/* Pre-open state: Envelope */}
        {!revealed && (
          <div className="flex flex-col items-center gap-6">
            <p
              className="text-muted-foreground text-sm tracking-widest uppercase font-sans animate-in-up"
              style={{ animationDelay: '0.3s' }}
            >
              Ada sesuatu untukmu ✨
            </p>

            {/* Envelope SVG interactive */}
            <button
              onClick={handleOpenEnvelope}
              className="group relative cursor-pointer focus:outline-none animate-in-up pulse-glow rounded-2xl"
              style={{ animationDelay: '0.5s' }}
              aria-label="Buka amplop kejutan"
            >
              <div className="relative w-64 h-48 sm:w-80 sm:h-60">
                {/* Envelope body */}
                <svg viewBox="0 0 320 240" className="w-full h-full drop-shadow-xl">
                  {/* Body */}
                  <rect x="0" y="40" width="320" height="200" rx="16" fill="#FCEEF3" stroke="#EDD5DF" strokeWidth="2" />
                  {/* Bottom fold lines */}
                  <path d="M0 240 L160 140 L320 240" fill="#F9D5E5" stroke="#EDD5DF" strokeWidth="1" />
                  <path d="M0 40 L160 140 L320 40" fill="#F5E6EC" stroke="#EDD5DF" strokeWidth="1" />
                  {/* Lid */}
                  <g className={envelopeOpened ? 'envelope-lid-open' : ''}>
                    <path d="M0 40 L160 140 L320 40 L320 20 Q320 0 300 0 L20 0 Q0 0 0 20 Z" fill="#F4A8C0" stroke="#E8789A" strokeWidth="1.5" />
                  </g>
                  {/* Heart seal */}
                  {!envelopeOpened && (
                    <g transform="translate(145, 115)">
                      <path d="M15 28 C15 28 0 18 0 9 C0 4 4 0 8 0 C11 0 13 2 15 4 C17 2 19 0 22 0 C26 0 30 4 30 9 C30 18 15 28 15 28Z" fill="#E8789A" />
                    </g>
                  )}
                </svg>

                {/* Letter peeking out when opened */}
                {envelopeOpened && (
                  <div className="letter-rise absolute inset-x-4 bottom-16 bg-white rounded-xl border border-border shadow-lg p-4 flex items-center justify-center">
                    <span className="font-display text-primary text-lg font-semibold">🎂 Buka Yuk!</span>
                  </div>
                )}
              </div>

              {/* Hover hint */}
              <p className="mt-3 text-muted-foreground text-xs group-hover:text-primary transition-colors duration-300">
                Klik untuk membuka ✉️
              </p>
            </button>
          </div>
        )}

        {/* Post-open: Birthday reveal */}
        {revealed && (
          <div className="flex flex-col items-center gap-6 max-w-3xl">
            {/* Badge */}
            <div
              className="reveal-item revealed flex items-center gap-2 bg-card border border-border rounded-full px-5 py-2 shadow-sm"
              style={{ transitionDelay: '0ms' }}
            >
              <span className="text-lg">🎉</span>
              <span className="text-xs font-sans font-medium text-muted-foreground tracking-widest uppercase">
                Hari Istimewamu
              </span>
              <span className="text-lg">🎉</span>
            </div>

            {/* Main heading */}
            <div
              className="reveal-item revealed"
              style={{ transitionDelay: '100ms' }}
            >
              <h1 className="font-display font-bold leading-tight tracking-tight"
                style={{ fontSize: 'clamp(3rem, 10vw, 7rem)' }}
              >
                <span className="text-shimmer">Selamat</span>
                <br />
                <span className="text-shimmer">Ulang Tahun</span>
              </h1>
            </div>

            {/* Name */}
            <div
              className="reveal-item revealed"
              style={{ transitionDelay: '200ms' }}
            >
              <div className="relative inline-block">
                <h2
                  className="font-display font-semibold text-foreground"
                  style={{ fontSize: 'clamp(2rem, 6vw, 4rem)' }}
                >
                  Ulfiana 💗
                </h2>
                {/* Underline decoration */}
                <div
                  className="absolute -bottom-2 left-0 right-0 h-1 rounded-full"
                  style={{ background: 'linear-gradient(to right, var(--primary), var(--accent))' }}
                />
              </div>
            </div>

            {/* Subheading */}
            <div
              className="reveal-item revealed"
              style={{ transitionDelay: '300ms' }}
            >
              <p className="text-muted-foreground text-lg sm:text-xl font-sans max-w-xl leading-relaxed">
                Semoga hari ini membawa kebahagiaan yang tak terbatas,
                dan setiap impianmu menjadi kenyataan indah. 🌸
              </p>
            </div>

            {/* CTA buttons */}
            <div
              className="reveal-item revealed flex flex-col sm:flex-row gap-3 mt-2"
              style={{ transitionDelay: '400ms' }}
            >
              <a
                href="#wishes"
                className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-3 rounded-full font-sans font-semibold text-base transition-all duration-300 hover:opacity-90 hover:scale-105 shadow-lg"
                style={{ boxShadow: '0 8px 24px rgba(232,120,154,0.35)' }}
              >
                💌 Baca Pesanku
              </a>
              <a
                href="#gallery"
                className="inline-flex items-center justify-center gap-2 bg-secondary text-secondary-foreground px-8 py-3 rounded-full font-sans font-semibold text-base transition-all duration-300 hover:opacity-90 hover:scale-105 border border-border"
              >
                📸 Lihat Kenangan
              </a>
            </div>
          </div>
        )}
      </div>

      {/* Scroll indicator */}
      {revealed && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 animate-bounce opacity-60">
          <span className="text-xs text-muted-foreground font-sans">Gulir ke bawah</span>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M10 4v12M4 10l6 6 6-6" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      )}
    </section>
  );
}