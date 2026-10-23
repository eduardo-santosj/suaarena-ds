'use client';

import { ChevronDown } from 'lucide-react';
import { cn } from '../../lib/utils';

export interface FerinoPillProps {
  /** Nome do Ferino ativo. */
  label: string;
  /** Abre a troca de Ferino. Sem ele vira so rotulo (quem tem um Ferino so). */
  onClick?: () => void;
  className?: string;
}

/**
 * Pilula do Ferino ativo, no topo de qualquer aba: ponto laranja, nome e seta.
 */
export function FerinoPill({ label, onClick, className }: FerinoPillProps) {
  const Tag = onClick ? 'button' : 'span';
  return (
    <Tag
      {...(onClick ? { type: 'button' as const, onClick, 'aria-label': `Trocar Ferino (atual: ${label})` } : {})}
      className={cn(
        'inline-flex items-center gap-[7px] h-8 px-[13px] rounded-full max-w-full',
        'bg-surface-1 ring-1 ring-border dark:ring-0 text-foreground text-xs font-semibold',
        onClick && 'hover:bg-surface-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
        className,
      )}
    >
      <span aria-hidden className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
      <span className="truncate">{label}</span>
      {onClick && <ChevronDown aria-hidden className="w-3.5 h-3.5 text-subtle-foreground shrink-0" />}
    </Tag>
  );
}
