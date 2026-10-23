'use client';

import * as React from 'react';
import { ChevronRight } from 'lucide-react';
import { cn } from '../../lib/utils';

export interface GroupedListProps {
  children: React.ReactNode;
  className?: string;
}

/** Bloco arredondado que agrupa Rows, no estilo Ajustes do iOS. */
export function GroupedList({ children, className }: GroupedListProps) {
  return (
    <div className={cn('divide-y divide-border overflow-hidden rounded-2xl border border-border bg-surface-1', className)}>
      {children}
    </div>
  );
}

export interface RowProps {
  label: string;
  /** Ajuda curta embaixo do rótulo. */
  hint?: string;
  /** Ícone num quadradinho à esquerda (lucide). */
  icon?: React.ReactNode;
  /** Controle à direita: Switch, valor, Stepper. */
  right?: React.ReactNode;
  /** Mostra a seta › depois do controle. */
  chevron?: boolean;
  /** Com onClick a linha inteira vira botão. */
  onClick?: () => void;
  /** Tom destrutivo (sair, excluir conta). */
  danger?: boolean;
  className?: string;
}

/** Linha de lista agrupada: ícone, rótulo e ajuda à esquerda, controle ou seta à direita. */
export function Row({ label, hint, icon, right, chevron, onClick, danger, className }: RowProps) {
  const cls = cn(
    'flex min-h-[52px] w-full items-center gap-3 px-4 py-3 text-left',
    onClick && 'cursor-pointer transition-colors hover:bg-surface-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring',
    className,
  );
  const inner = (
    <>
      {icon && (
        <span
          className={cn(
            'flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-[9px] [&>svg]:h-4 [&>svg]:w-4',
            danger ? 'bg-destructive/15 text-destructive' : 'bg-primary/10 text-primary',
          )}
        >
          {icon}
        </span>
      )}
      <span className="min-w-0 flex-1">
        <span className={cn('block text-[15px]', danger ? 'font-medium text-destructive' : 'text-foreground')}>{label}</span>
        {hint && <span className="mt-0.5 block text-[11.5px] text-muted-foreground">{hint}</span>}
      </span>
      {right}
      {chevron && <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden="true" />}
    </>
  );
  return onClick ? (
    <button type="button" onClick={onClick} className={cls}>{inner}</button>
  ) : (
    <div className={cls}>{inner}</div>
  );
}
