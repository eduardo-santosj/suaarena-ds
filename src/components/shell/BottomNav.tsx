'use client';

import { cn } from '../../lib/utils';
import { NAV_ICON, NavBadge, NavLink, navItems, type NavProps } from './nav';

export interface BottomNavProps extends NavProps {
  className?: string;
}

/**
 * Barra de tres abas do celular: Torneios ou Rodadas (pelo esporte), Ranking
 * e Config. Atletas, conta e aparencia moram dentro de Config.
 */
export function BottomNav({ sport, active, hrefs, linkComponent, onSelect, badges, className }: BottomNavProps) {
  return (
    <nav
      aria-label="Navegação principal"
      className={cn(
        'flex justify-around bg-chrome border-t border-border/60 pt-2.5 pb-[max(10px,env(safe-area-inset-bottom))]',
        className,
      )}
    >
      {navItems(sport).map(({ key, label }) => {
        const Icon = NAV_ICON[key];
        const on = active === key;
        return (
          <NavLink key={key} tab={key} href={hrefs?.[key]} linkComponent={linkComponent} onSelect={onSelect} current={on}
            className={cn(
              'relative flex flex-col items-center gap-1 w-[90px] py-0.5 text-[11.5px] font-semibold rounded-lg',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
              on ? 'text-primary' : 'text-subtle-foreground hover:text-muted-foreground',
            )}>
            <Icon className="w-[23px] h-[23px]" />
            {label}
            <NavBadge value={badges?.[key]} className="absolute -top-[3px] left-[52px]" />
          </NavLink>
        );
      })}
    </nav>
  );
}
