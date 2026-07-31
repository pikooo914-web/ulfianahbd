'use client';

import React, { useEffect, useRef, useState } from 'react';
import AppImage from '@/components/ui/AppImage';

interface Memory {
  id: number;
  src: string;
  alt: string;
  caption: string;
  colSpan: string;
  rowSpan: string;
}

const memories: Memory[] = [
{
  id: 1,
  src: "/assets/images/WhatsApp_Image_2026-07-31_at_14.36.49-1785485268177.jpeg",
  alt: 'Foto kenangan bersama',
  caption: 'Kenangan Indah 💗',
  colSpan: 'col-span-1',
  rowSpan: 'row-span-2'
},
{
  id: 2,
  src: "/assets/images/WhatsApp_Image_2026-07-31_at_14.29.43__1_-1785485267901.jpeg",
  alt: 'Momen spesial bersama',
  caption: 'Momen Spesial 🌸',
  colSpan: 'col-span-1',
  rowSpan: 'row-span-1'
},
{
  id: 3,
  src: "/assets/images/WhatsApp_Image_2026-07-31_at_14.29.43-1785485267934.jpeg",
  alt: 'Foto kenangan yang tak terlupakan',
  caption: 'Tak Terlupakan ✨',
  colSpan: 'col-span-1',
  rowSpan: 'row-span-1'
},
{
  id: 4,
  src: "/assets/images/WhatsApp_Image_2026-07-31_at_14.17.50-1785485268625.jpeg",
  alt: 'Foto kenangan istimewa',
  caption: 'Istimewa 🌟',
  colSpan: 'col-span-3',
  rowSpan: 'row-span-1'
}];


export default function GallerySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [lightbox, setLightbox] = useState<Memory | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const items = entry.target.querySelectorAll('.reveal-item');
            items.forEach((item, i) => {
              setTimeout(() => item.classList.add('revealed'), i * 80);
            });
          }
        });
      },
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Close lightbox on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightbox(null);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  return (
    <section
      id="gallery"
      ref={sectionRef}
      className="relative py-20 px-4 overflow-hidden">
      
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="blob-pink absolute w-64 h-64 rounded-full top-20 left-0 opacity-20" />
        <div className="blob-blue absolute w-80 h-80 rounded-full bottom-0 right-10 opacity-20" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="reveal-item inline-flex items-center gap-2 bg-muted border border-border rounded-full px-4 py-1.5 mb-4">
            <span className="text-sm">📸</span>
            <span className="text-xs font-sans font-medium text-muted-foreground tracking-widest uppercase">Galeri Kenangan</span>
          </div>
          <h2 className="reveal-item font-display font-bold text-foreground mb-3" style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)' }}>
            Selamat Ulang Tahun Sayangku
          </h2>
          <p className="reveal-item text-muted-foreground font-sans text-base max-w-md mx-auto leading-relaxed">
            Setiap gambar menyimpan cerita indah yang selalu kita kenang bersama 🌟
          </p>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {memories.map((memory, index) => {
            // Determine responsive classes per photo
            const responsiveClass =
              memory.colSpan === 'col-span-3' ?'sm:col-span-3 h-56 sm:h-48'
                : memory.rowSpan === 'row-span-2' ?'sm:col-span-1 sm:row-span-2 h-56 sm:h-[412px]' :'sm:col-span-1 h-56 sm:h-[200px]';

            return (
              <div
                key={memory.id}
                className={`reveal-item relative overflow-hidden rounded-2xl cursor-pointer group ${responsiveClass}`}
                style={{ transitionDelay: `${index * 80}ms` }}
                onClick={() => setLightbox(memory)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && setLightbox(memory)}
                aria-label={`Lihat gambar: ${memory.caption}`}>

                <AppImage
                  src={memory.src}
                  alt={memory.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                {/* Caption */}
                <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-white font-sans text-sm font-medium">{memory.caption}</p>
                </div>
                {/* Zoom icon */}
                <div className="absolute top-3 right-3 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M8 1h5m0 0v5m0-5L8 6M6 13H1m0 0V8m0 5l5-5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox &&
      <div
        className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
        onClick={() => setLightbox(null)}
        role="dialog"
        aria-modal="true"
        aria-label={lightbox.caption}>
        
          <div
          className="relative max-w-3xl w-full rounded-2xl overflow-hidden shadow-2xl"
          onClick={(e) => e.stopPropagation()}>
          
            <AppImage
            src={lightbox.src}
            alt={lightbox.alt}
            width={900}
            height={600}
            className="w-full h-auto object-cover"
            priority />
          
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
              <p className="text-white font-sans font-medium">{lightbox.caption}</p>
            </div>
            <button
            onClick={() => setLightbox(null)}
            className="absolute top-3 right-3 w-9 h-9 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
            aria-label="Tutup">
            
              ✕
            </button>
          </div>
        </div>
      }
    </section>);

}