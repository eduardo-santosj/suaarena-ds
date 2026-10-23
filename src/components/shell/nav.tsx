'use client';

import { Crown, Settings, Trophy } from 'lucide-react';
import type { ComponentType, ElementType, ReactNode } from 'react';

/** As tres abas do Ferinos: evento (torneios ou rodadas), ranking, config. */
export type NavTab = 'eventos' | 'ranking' | 'config';

/** Rotulo da primeira aba pelo esporte do Ferino ativo. */
export function eventsLabel(sport?: string | null): 'Torneios' | 'Rodadas' {
  return sport === 'futebol' ? 'Rodadas' : 'Torneios';
}

export const NAV_ICON: Record<NavTab, ComponentType<{ className?: string }>> = {
  eventos: Trophy,
  ranking: Crown,
  config: Settings,
};

export function navItems(sport?: string | null): Array<{ key: NavTab; label: string }> {
  return [
    { key: 'eventos', label: eventsLabel(sport) },
    { key: 'ranking', label: 'Ranking' },
    { key: 'config', label: 'Config' },
  ];
}

export interface NavProps {
  /** Esporte do Ferino ativo: 'futebol' vira "Rodadas"; o resto, "Torneios". */
  sport?: string | null;
  active?: NavTab | null;
  /** Rotas de cada aba. Com elas, cada aba vira link (`linkComponent`). */
  hrefs?: Partial<Record<NavTab, string>>;
  /** Ex.: `Link` do next/link. Padrao `a`. */
  linkComponent?: ElementType;
  /** Toque na aba (ex.: abrir o Premium no lugar de ir pro ranking). */
  onSelect?: (tab: NavTab) => void;
  /** Numero = contagem vermelha; true = so o ponto. */
  badges?: Partial<Record<NavTab, number | boolean>>;
}

/** Renderiza a aba como link (com href) ou botao. */
export function NavLink({
  tab, href, linkComponent, onSelect, className, children, current,
}: {
  tab: NavTab; href?: string; linkComponent?: ElementType; onSelect?: (t: NavTab) => void;
  className: string; children: ReactNode; current: boolean;
}) {
  if (href) {
    const L = linkComponent ?? 'a';
    return (
      <L href={href} className={className} aria-current={current ? 'page' : undefined}
        onClick={onSelect ? () => onSelect(tab) : undefined}>
        {children}
      </L>
    );
  }
  return (
    <button type="button" className={className} aria-current={current ? 'page' : undefined} onClick={() => onSelect?.(tab)}>
      {children}
    </button>
  );
}

export function NavBadge({ value, className }: { value?: number | boolean; className: string }) {
  if (!value) return null;
  if (value === true) return <span aria-hidden className={`${className} w-2 h-2 rounded-full bg-destructive`} />;
  return (
    <span className={`${className} min-w-[17px] h-[17px] px-1 rounded-full bg-destructive text-destructive-foreground text-[10px] font-bold flex items-center justify-center`}>
      {value > 99 ? '99+' : value}
    </span>
  );
}
