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
          Untuk Perempuan Hebat{' '}
          <span className="text-shimmer">yang Kucintai</span>
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