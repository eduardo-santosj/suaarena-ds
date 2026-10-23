import * as React from 'react';
import { cn } from '../../lib/utils';

export interface MyRankCardProps {
  /** Posicao do atleta (1 = primeiro). */
  position: number;
  /** Iniciais no circulo. */
  initials: string;
  /** Titulo. Padrao: "Você está em 6º". */
  title?: string;
  /** Sublinha: "de 31 atletas · 12 pts em outubro". */
  subtitle?: string;
  /** Pontos a direita. */
  points?: React.ReactNode;
  /** Frase de apoio embaixo, separada por filete: "Faltam 3 pontos pro pódio.". */
  footer?: React.ReactNode;
  className?: string;
}

/**
 * Cartao "sua linha" do ranking: posicao em ciano (token you), grudado no
 * podio. No plano gratis e a unica linha do ranking que aparece.
 */
export function MyRankCard({ position, initials, title, subtitle, points, footer, className }: MyRankCardProps) {
  return (
    <div className={cn('flex flex-col gap-2.5 rounded-2xl border border-you/35 bg-you/[0.07] px-3.5 py-3', className)}>
      <div className="flex items-center gap-2.5">
        <span className="w-[26px] shrink-0 font-mono text-[13px] font-bold text-you">{position}º</span>
        <span
          aria-hidden="true"
          className="flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-full bg-you/15 text-[10px] font-bold text-you"
        >
          {initials}
        </span>
        <div className="flex min-w-0 flex-1 flex-col">
          <span className="truncate text-sm font-semibold text-foreground">{title ?? `Você está em ${position}º`}</span>
          {subtitle && <span className="truncate text-[11.5px] text-subtle-foreground">{subtitle}</span>}
        </div>
        {points != null && <span className="shrink-0 font-mono text-lg font-bold text-foreground">{points}</span>}
      </div>
      {footer && <div className="border-t border-you/20 pt-2.5 text-[12.5px] text-muted-foreground">{footer}</div>}
    </div>
  );
}
