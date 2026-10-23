'use client';

import type { HTMLAttributes } from 'react';
import { cn } from '../../lib/utils';

export type StageTone = 'default' | 'live' | 'vote' | 'win';

export interface StageProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * default  agendado, encerrado       palco com borda neutra
   * live     jogo em andamento         borda laranja
   * vote     janela de votacao         borda ciano (you)
   * win      craque, campeao, lider    laranja solido
   */
  tone?: StageTone;
  /** Sem conexao: o placar fica apagado ate chegar dado novo (T2). */
  stale?: boolean;
}

const TONE: Record<StageTone, string> = {
  default: 'bg-stage border-border/60',
  live:    'bg-stage border-primary/45 shadow-[0_10px_24px_hsl(var(--primary)/0.10)] dark:shadow-none',
  vote:    'bg-stage border-you/40',
  win:     'bg-primary border-transparent text-primary-foreground',
};

/**
 * O Palco: bloco no topo das telas de evento que responde a pergunta daquele
 * momento (quem vai, qual o placar, quem e o craque). O resto da tela desce
 * para abas.
 */
export function Stage({ tone = 'default', stale = false, className, children, ...rest }: StageProps) {
  return (
    <div
      {...rest}
      data-tone={tone}
      className={cn(
        'rounded-[18px] border p-4 flex flex-col gap-3 transition-opacity',
        TONE[tone],
        stale && 'opacity-55',
        className,
      )}
    >
      {children}
    </div>
  );
}

export interface StageLabelProps extends HTMLAttributes<HTMLSpanElement> {}

/** Rotulo mono do palco: "SEMIFINAL 1 · QUADRA 1", "JOGO 4 DE 6 · 00:08". */
export function StageLabel({ className, ...rest }: StageLabelProps) {
  return (
    <span
      {...rest}
      className={cn('font-mono text-[10.5px] uppercase tracking-[0.14em] text-subtle-foreground', className)}
    />
  );
}

export interface LiveTagProps extends HTMLAttributes<HTMLSpanElement> {
  /** Padrao "AO VIVO". Sem conexao vira "ha 2 min" com `stale`. */
  label?: string;
  stale?: boolean;
}

/** Etiqueta "AO VIVO" com ponto laranja; cinza quando o dado esta velho. */
export function LiveTag({ label = 'AO VIVO', stale = false, className, ...rest }: LiveTagProps) {
  return (
    <span
      {...rest}
      className={cn(
        'inline-flex items-center gap-1.5 h-6 px-2.5 rounded-full text-[11px] font-bold whitespace-nowrap',
        stale ? 'bg-surface-3 text-muted-foreground' : 'bg-primary/15 text-primary',
        className,
      )}
    >
      <i
        aria-hidden
        className={cn(
          'w-1.5 h-1.5 rounded-full',
          stale ? 'bg-subtle-foreground' : 'bg-primary shadow-[0_0_0_3px_hsl(var(--primary)/0.18)]',
        )}
      />
      {label}
    </span>
  );
}
