'use client';

import Link from 'next/link';

interface ModeCardProps {
  href: string;
  icon: string;
  title: string;
  description: string;
  color: string;
}

export default function ModeCard({ href, icon, title, description, color }: ModeCardProps) {
  return (
    <Link
      href={href}
      className="bg-card-bg border border-card-border rounded-xl p-6 hover:border-accent/50 transition-all hover:scale-[1.02] block group"
    >
      <div className="text-3xl mb-3">{icon}</div>
      <h3 className="text-lg font-bold mb-1 group-hover:text-accent transition-colors" style={{ color }}>
        {title}
      </h3>
      <p className="text-sm text-foreground/50">{description}</p>
    </Link>
  );
}
