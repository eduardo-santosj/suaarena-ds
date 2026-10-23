'use client';

import { cn } from '../../lib/utils';

export interface Stat {
  label: string;
  value: string | number;
  /** Laranja: o numero que importa (posicao no mes, gols). */
  accent?: boolean;
}

export interface StatStripProps {
  items: Stat[];
  className?: string;
}

/**
 * Faixa de numeros grandes com rotulo mono embaixo, um bloco por numero.
 * Perfil (posicao · pontos · titulos · torneios), financeiro (pagos · recebido).
 */
export function StatStrip({ items, className }: StatStripProps) {
  return (
    <div
      className={cn('grid gap-2', className)}
      style={{ gridTemplateColumns: `repeat(${Math.max(items.length, 1)}, minmax(0, 1fr))` }}
    >
      {items.map((s) => (
        <div key={s.label} className="bg-surface-1 rounded-[14px] px-2 py-2.5 flex flex-col items-center gap-[3px] min-w-0">
          <b className={cn('font-display text-xl font-extrabold leading-[1.1] tracking-[-0.02em] truncate max-w-full', s.accent ? 'text-primary' : 'text-foreground')}>
            {s.value}
          </b>
          <span className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-subtle-foreground truncate max-w-full">
            {s.label}
          </span>
        </div>
      ))}
    </div>
  );
}
