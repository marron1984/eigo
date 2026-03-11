'use client';

import Link from 'next/link';

interface ModeCardProps {
  href: string;
  icon: string;
  title: string;
  subtitle: string;
  color: string;
  count: number;
  countLabel: string;
}

export default function ModeCard({ href, icon, title, subtitle, color, count, countLabel }: ModeCardProps) {
  return (
    <Link
      href={href}
      className="bg-card-bg rounded-2xl p-4 flex items-center gap-4 active:scale-[0.98] transition-transform"
    >
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
        style={{ backgroundColor: `${color}15` }}
      >
        <svg className="w-6 h-6" style={{ color }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d={icon} />
        </svg>
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-bold" style={{ color }}>{title}</h3>
        <p className="text-xs text-foreground/35 mt-0.5">{subtitle}</p>
      </div>

      <div className="text-right shrink-0">
        <span className="text-lg font-bold text-foreground/80">{count}</span>
        <span className="text-[10px] text-foreground/30 ml-0.5">{countLabel}</span>
      </div>

      <svg className="w-4 h-4 text-foreground/20 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
      </svg>
    </Link>
  );
}
