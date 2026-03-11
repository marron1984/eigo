'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/', label: 'ダッシュボード', icon: '📊' },
  { href: '/vocabulary', label: '単語', icon: '📖' },
  { href: '/listening', label: 'ヒアリング', icon: '🎧' },
  { href: '/shadowing', label: 'シャドーイング', icon: '🗣' },
];

export default function Navigation() {
  const pathname = usePathname();

  return (
    <>
      {/* Desktop sidebar */}
      <nav className="hidden md:flex w-56 bg-card-bg border-r border-card-border flex-col p-4 gap-2">
        {navItems.map(item => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-accent/20 text-accent'
                  : 'text-foreground/70 hover:bg-card-border/50 hover:text-foreground'
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span className="text-sm font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Mobile bottom nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-card-bg border-t border-card-border flex z-50">
        {navItems.map(item => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex-1 flex flex-col items-center py-3 gap-1 transition-colors ${
                isActive ? 'text-accent' : 'text-foreground/50'
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span className="text-[10px]">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}
