'use client';

import * as React from 'react';
import { cn } from '../../lib/utils';

export interface DateRowProps {
  /** Dia da semana abreviado: "sáb". */
  weekday: string;
  /** Dia do mês: "01". */
  day: string | number;
  /** Mês abreviado: "nov". */
  month: string;
  title: string;
  subtitle?: string;
  /** Slot à direita: etiqueta de estado, "›", ícone. */
  right?: React.ReactNode;
  /** Com onClick vira botão. */
  onClick?: () => void;
  className?: string;
}

/**
 * Linha de evento com bloco de data à esquerda (dia da semana, dia, mês),
 * título e sublinha no meio e slot à direita. Torneios, rodadas e cobranças
 * usam a mesma linha.
 */
export function DateRow({ weekday, day, month, title, subtitle, right, onClick, className }: DateRowProps) {
  const cls = cn(
    'flex w-full items-stretch overflow-hidden rounded-[14px] bg-surface-1 text-left',
    onClick && 'transition-colors hover:bg-surface-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
    className,
  );
  const inner = (
    <>
      <span className="flex w-[52px] shrink-0 flex-col items-center justify-center border-r border-border py-[9px]">
        <span className="font-mono text-[10px] uppercase leading-tight tracking-[0.1em] text-muted-foreground">{weekday}</span>
        <span className="font-display text-[20px] font-extrabold leading-[22px] text-foreground">{day}</span>
        <span className="font-mono text-[10px] uppercase leading-tight tracking-[0.1em] text-muted-foreground">{month}</span>
      </span>
      <span className="flex min-w-0 flex-1 flex-col justify-center gap-[3px] px-3 py-2.5">
        <span className="truncate text-sm font-semibold text-foreground">{title}</span>
        {subtitle && <span className="truncate text-[11.5px] text-muted-foreground">{subtitle}</span>}
      </span>
      {right != null && <span className="flex shrink-0 items-center pr-3">{right}</span>}
    </>
  );
  return onClick ? (
    <button type="button" onClick={onClick} aria-label={`${title}, ${weekday} ${day} ${month}`} className={cls}>
      {inner}
    </button>
  ) : (
    <div className={cls}>{inner}</div>
  );
}
