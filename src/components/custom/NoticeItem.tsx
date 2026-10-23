'use client';

import {
  CalendarCheck, Crown, Star, Trophy, UserPlus, Users, Wallet, type LucideIcon,
} from 'lucide-react';
import { cn } from '../../lib/utils';

/** Assunto do aviso: define o icone Lucide e a cor. */
export type NoticeKind = 'presenca' | 'evento' | 'votacao' | 'resultado' | 'ranking' | 'cobranca' | 'pedido';

export type NoticeTone = 'primary' | 'you' | 'star' | 'destructive' | 'neutral';

const KIND: Record<NoticeKind, { icon: LucideIcon; tone: NoticeTone }> = {
  presenca: { icon: CalendarCheck, tone: 'primary' },
  evento: { icon: Users, tone: 'primary' },
  votacao: { icon: Star, tone: 'you' },
  resultado: { icon: Trophy, tone: 'star' },
  ranking: { icon: Crown, tone: 'primary' },
  cobranca: { icon: Wallet, tone: 'destructive' },
  pedido: { icon: UserPlus, tone: 'neutral' },
};

/** Cor do assunto: laranja acao, ciano votacao, amarelo resultado, vermelho dinheiro. */
const TONE: Record<NoticeTone, string> = {
  primary: 'bg-primary/15 text-primary',
  you: 'bg-you/15 text-you',
  star: 'bg-star/15 text-star',
  destructive: 'bg-destructive/15 text-destructive',
  neutral: 'bg-surface-3 text-muted-foreground',
};

export interface NoticeItemProps {
  /** Assunto: escolhe icone e cor. */
  kind?: NoticeKind;
  /** Icone Lucide proprio (sobrescreve o do assunto). */
  icon?: LucideIcon;
  /** Cor propria (sobrescreve a do assunto). */
  tone?: NoticeTone;
  title: string;
  description?: string;
  /** Linha mono pequena: "Pelada de Quinta · 12:04". */
  meta?: string;
  /** Aviso novo: fundo de palco e ponto laranja no canto. */
  unread?: boolean;
  /** Dentro do painel suspenso, que ja e uma superficie elevada. */
  elevated?: boolean;
  onClick?: () => void;
  className?: string;
}

/** Item da central de avisos: icone por assunto, titulo, texto e origem. */
export function NoticeItem({ kind, icon, tone, title, description, meta, unread, elevated, onClick, className }: NoticeItemProps) {
  const base = kind ? KIND[kind] : undefined;
  const Icon = icon ?? base?.icon ?? Star;
  const t = tone ?? base?.tone ?? 'neutral';
  const cls = cn(
    'relative flex w-full gap-3 rounded-2xl px-3.5 py-3 text-left',
    elevated ? (unread ? 'bg-surface-3' : 'bg-surface-3/60') : unread ? 'bg-stage' : 'bg-surface-1',
    onClick && 'transition-colors hover:bg-surface-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
    className,
  );
  const inner = (
    <>
      <span className={cn('flex h-9 w-9 shrink-0 items-center justify-center rounded-[11px]', TONE[t])}>
        <Icon className="h-[17px] w-[17px]" aria-hidden="true" />
      </span>
      <span className="flex min-w-0 flex-1 flex-col gap-[3px] pr-3">
        <span className="text-[13.5px] font-semibold leading-snug text-foreground">{title}</span>
        {description && <span className="text-[12.5px] leading-snug text-muted-foreground">{description}</span>}
        {meta && <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-subtle-foreground">{meta}</span>}
      </span>
      {unread && <span aria-label="novo" className="absolute right-3.5 top-4 h-2 w-2 rounded-full bg-primary" />}
    </>
  );
  return onClick ? (
    <button type="button" onClick={onClick} className={cls}>{inner}</button>
  ) : (
    <div className={cls}>{inner}</div>
  );
}
