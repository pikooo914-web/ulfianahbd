'use client';

import React, { useState, useEffect, useRef } from 'react';

interface WishCard {
  id: number;
  emoji: string;
  frontTitle: string;
  frontColor: string;
  message: string;
  from: string;
}

const wishes: WishCard[] = [
  {
    id: 1,
    emoji: '🌸',
    frontTitle: 'Kebahagiaan',
    frontColor: 'from-primary/20 to-primary/5',
    message: 'Semoga di usia yang baru ini, hidupmu selalu dipenuhi kebahagiaan, hati yang tenang, dan senyum yang tak pernah pudar. Semoga setiap hari membawa cerita indah, dan semoga aku selalu menjadi salah satu alasan di balik senyummu.',
    from: 'Dengan cinta 💗',
  },
  {
    id: 2,
    emoji: '✨',
    frontTitle: 'Impian',
    frontColor: 'from-accent/20 to-accent/5',
    message: 'Semoga semua impianmu perlahan menjadi kenyataan. Teruslah percaya pada dirimu sendiri, karena aku akan selalu percaya padamu. Apa pun yang kamu cita-citakan, semoga selalu ada jalan untuk mencapainya, dan semoga aku bisa terus menemanimu di setiap langkah menuju mimpi-mimpi itu.',
    from: 'Selalu bersamamu 🌟',
  },
  {
    id: 3,
    emoji: '💪',
    frontTitle: 'Kekuatan',
    frontColor: 'from-primary/15 to-accent/15',
    message: 'Semoga kamu selalu diberi kekuatan untuk menghadapi setiap tantangan, keberanian untuk melangkah saat ragu, dan keteguhan hati untuk tetap percaya pada dirimu sendiri. Apa pun yang terjadi, ingatlah bahwa kamu tidak pernah sendirian. Aku akan selalu ada di sisimu.',
    from: 'Percaya padamu 🌈',
  },
  {
    id: 4,
    emoji: '🎯',
    frontTitle: 'Sukses',
    frontColor: 'from-accent/20 to-primary/10',
    message: 'Semoga setiap usaha yang kamu lakukan selalu membuahkan hasil terbaik. Semoga langkahmu dipenuhi kesempatan, kerja kerasmu terbayar dengan indah, dan setiap pencapaian yang kamu impikan perlahan menjadi kenyataan. Aku akan selalu bangga pada setiap proses yang kamu lalui.',
    from: 'Bangga padamu 🏆',
  },
  {
    id: 5,
    emoji: '🌺',
    frontTitle: 'Kesehatan',
    frontColor: 'from-primary/20 to-accent/10',
    message: 'Semoga kamu selalu dianugerahi kesehatan yang baik, tubuh yang kuat, dan hati yang penuh ketenangan. Semoga setiap hari dipenuhi energi untuk menjalani hal-hal yang kamu cintai, dan semoga kamu selalu diberi kekuatan untuk menjaga dirimu sebaik kamu menjaga orang-orang yang kamu sayangi. Karena bagiku, melihatmu sehat dan baik-baik saja adalah kebahagiaan yang tak ternilai.',
    from: 'Jaga dirimu 💙',
  },
  {
    id: 6,
    emoji: '🎂',
    frontTitle: 'Ulang Tahun',
    frontColor: 'from-accent/15 to-primary/20',
    message: 'Selamat ulang tahun, cintaku. Terima kasih telah hadir dan menjadi bagian terindah dalam hidupku. Semoga di usia yang baru ini, kamu selalu dikelilingi cinta, kebahagiaan, kesehatan, kekuatan, kesuksesan, dan impian-impian yang menjadi nyata. Apa pun yang akan kita hadapi di masa depan, aku berharap kita bisa terus berjalan berdampingan, saling menguatkan, dan menciptakan lebih banyak kenangan indah bersama.',
    from: 'Selalu ada untukmu ❤️',
  },
];

function WishCard({ card, index }: { card: WishCard; index: number }) {
  const [flipped, setFlipped] = useState(false);
  const [floatingHearts, setFloatingHearts] = useState<number[]>([]);
  const heartTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleFlip = () => {
    setFlipped(!flipped);
    if (!flipped) {
      const hearts = Array.from({ length: 5 }, (_, i) => i);
      setFloatingHearts(hearts);
      if (heartTimer.current) clearTimeout(heartTimer.current);
      heartTimer.current = setTimeout(() => setFloatingHearts([]), 3200);
    }
  };

  return (
    <div
      className="perspective-card cursor-pointer reveal-item h-56 sm:h-64"
      style={{ transitionDelay: `${index * 80}ms` }}
      onClick={handleFlip}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && handleFlip()}
      aria-label={`Kartu ${card.frontTitle} — klik untuk membaca pesan`}
    >
      <div className={`card-inner w-full h-full ${flipped ? 'flipped' : ''}`}>
        {/* Front face */}
        <div className={`card-face w-full h-full rounded-2xl gradient-border bg-card flex flex-col items-center justify-center gap-3 p-6 shadow-md bg-gradient-to-br ${card.frontColor}`}>
          <span className="text-5xl">{card.emoji}</span>
          <h3 className="font-display font-semibold text-xl text-foreground">{card.frontTitle}</h3>
          <p className="text-xs text-muted-foreground font-sans">Klik untuk membaca ✨</p>
        </div>

        {/* Back face */}
        <div className="card-face card-back w-full h-full rounded-2xl bg-card border border-border shadow-md p-6 flex flex-col justify-between">
          <p className="text-foreground font-sans text-sm leading-relaxed flex-1 overflow-hidden">{card.message}</p>
          <p className="text-primary font-display font-semibold text-sm mt-3">{card.from}</p>
        </div>
      </div>

      {/* Floating hearts on flip */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {floatingHearts.map((h) => (
          <span
            key={h}
            className="float-heart absolute text-primary text-lg"
            style={{
              left: `${20 + h * 15}%`,
              bottom: '20%',
              animationDelay: `${h * 0.15}s`,
            }}
          >
            💗
          </span>
        ))}
      </div>
    </div>
  );
}

export default function WishesSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const items = entry.target.querySelectorAll('.reveal-item');
            items.forEach((item) => item.classList.add('revealed'));
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -5% 0px' }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="wishes"
      ref={sectionRef}
      className="relative py-20 px-4 overflow-hidden"
    >
      {/* Background blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="blob-blue absolute w-72 h-72 rounded-full top-10 right-0 opacity-25" />
        <div className="blob-pink absolute w-56 h-56 rounded-full bottom-10 left-0 opacity-25" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-12">
          <div className="reveal-item inline-flex items-center gap-2 bg-muted border border-border rounded-full px-4 py-1.5 mb-4">
            <span className="text-sm">💌</span>
            <span className="text-xs font-sans font-medium text-muted-foreground tracking-widest uppercase">Pesan Untukmu</span>
          </div>
          <h2 className="reveal-item font-display font-bold text-foreground mb-3" style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)' }}>
            Kata-kata dari Hati
          </h2>
          <p className="reveal-item text-muted-foreground font-sans text-base max-w-md mx-auto leading-relaxed">
            Klik setiap kartu untuk membaca pesan spesial yang sudah disiapkan untukmu, Ulfiana 🌸
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {wishes.map((wish, i) => (
            <WishCard key={wish.id} card={wish} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}