'use client';

import React, { useEffect, useRef, useState } from 'react';

interface Milestone {
  emoji: string;
  value: string;
  label: string;
  description: string;
  color: string;
}

const milestones: Milestone[] = [
  {
    emoji: '🌸',
    value: '365',
    label: 'Hari Baru',
    description: 'Hari-hari indah menanti di depanmu',
    color: 'from-primary/10 to-primary/5',
  },
  {
    emoji: '💫',
    value: '∞',
    label: 'Kebahagiaan',
    description: 'Yang kamu layak dapatkan',
    color: 'from-accent/10 to-accent/5',
  },
  {
    emoji: '🎯',
    value: '100%',
    label: 'Dukungan',
    description: 'Dari semua orang yang menyayangimu',
    color: 'from-primary/10 to-accent/10',
  },
  {
    emoji: '✨',
    value: '1',
    label: 'Ulfiana',
    description: 'Satu-satunya yang terbaik di dunia',
    color: 'from-accent/10 to-primary/10',
  },
];

function CounterCard({ milestone, index, triggered }: { milestone: Milestone; index: number; triggered: boolean }) {
  return (
    <div
      className={`reveal-item rounded-2xl gradient-border bg-gradient-to-br ${milestone.color} p-6 sm:p-8 flex flex-col items-center text-center gap-3`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <span className="text-4xl">{milestone.emoji}</span>
      <div
        className={triggered ? 'count-reveal' : 'opacity-0'}
        style={{ animationDelay: `${index * 150}ms` }}
      >
        <p className="font-display font-bold text-foreground" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>
          {milestone.value}
        </p>
      </div>
      <div>
        <p className="font-display font-semibold text-foreground text-lg">{milestone.label}</p>
        <p className="text-muted-foreground font-sans text-sm mt-1 leading-relaxed">{milestone.description}</p>
      </div>
    </div>
  );
}

export default function MilestonesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const items = entry.target.querySelectorAll('.reveal-item');
            items.forEach((item) => item.classList.add('revealed'));
            setTriggered(true);
          }
        });
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-20 px-4 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-40"
          style={{
            background: 'linear-gradient(135deg, rgba(232,120,154,0.08) 0%, rgba(123,184,212,0.08) 50%, rgba(232,120,154,0.05) 100%)',
          }}
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="reveal-item inline-flex items-center gap-2 bg-muted border border-border rounded-full px-4 py-1.5 mb-4">
            <span className="text-sm">🎊</span>
            <span className="text-xs font-sans font-medium text-muted-foreground tracking-widest uppercase">Angka Istimewa</span>
          </div>
          <h2 className="reveal-item font-display font-bold text-foreground mb-3" style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)' }}>
            Hari-hari Bersamamu
          </h2>
          <p className="reveal-item text-muted-foreground font-sans text-base max-w-md mx-auto leading-relaxed">
            Setiap angka mewakili betapa berharganya kamu bagi kami semua 💙
          </p>
        </div>

        {/* Milestones grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {milestones.map((m, i) => (
            <CounterCard key={i} milestone={m} index={i} triggered={triggered} />
          ))}
        </div>

        {/* Quote banner */}
        <div
          className="reveal-item mt-10 rounded-2xl p-8 sm:p-10 text-center relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(232,120,154,0.15), rgba(123,184,212,0.15))',
            border: '1px solid rgba(232,120,154,0.25)',
          }}
        >
          {/* Decorative quotes */}
          <span className="absolute top-4 left-6 font-display text-6xl text-primary/20 leading-none select-none">"</span>
          <span className="absolute bottom-0 right-6 font-display text-6xl text-accent/20 leading-none select-none">"</span>
          <blockquote className="font-display font-semibold text-foreground leading-relaxed relative z-10"
            style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)' }}
          >
            Selamat bertambah usia, sayang. Semoga hari ini menjadi awal dari tahun yang penuh berkah, tawa, dan cinta. Aku mencintaimu, hari ini, esok, dan di setiap perjalanan yang masih akan kita lalui bersama.
          </blockquote>
        </div>
      </div>
    </section>
  );
}