import React from 'react';

export default function Footer() {
  return (
    <footer className="py-8 border-t border-border">
      <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-sm text-muted-foreground font-sans">
          © 2026 UlfianaHBD · Dibuat dengan{' '}
          <span className="text-primary">💗</span> penuh kasih sayang
        </p>
        <div className="flex items-center gap-4">
          <a
            href="#"
            onClick={(e) => { e?.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200 font-sans font-medium"
          >
            Kembali ke Atas ↑
          </a>
          <span className="text-border">·</span>
          <a href="#wishes" className="text-sm text-muted-foreground hover:text-accent transition-colors duration-200 font-sans font-medium">
            Pesan
          </a>
          <span className="text-border">·</span>
          <a href="#gallery" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200 font-sans font-medium">
            Galeri
          </a>
        </div>
      </div>
    </footer>
  );
}