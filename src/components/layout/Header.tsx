'use client';

import Link from 'next/link';

export default function Header() {
  return (
    <header className="h-16 bg-card-bg border-b border-card-border flex items-center px-6 sticky top-0 z-50">
      <Link href="/" className="flex items-center gap-3">
        <span className="text-2xl font-bold text-accent">Eigo</span>
        <span className="text-sm text-foreground/60 hidden sm:inline">英語学習プラットフォーム</span>
      </Link>
    </header>
  );
}
