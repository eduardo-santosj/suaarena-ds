import * as React from 'react';
import { ChevronRight } from 'lucide-react';
import { cn } from '../../lib/utils';
import { LiveTag } from '../custom/Stage';

export type FerinoCardTone = 'primary' | 'success' | 'neutral';

export interface FerinoCardProps {
  name: string;
  /** Sublinha: "futevôlei · admin · 48 atletas". */
  meta?: string;
  /** Iniciais no quadrado do logo. Ignorado se vier `logo`. */
  initials?: string;
  /** Logo do Ferino (img). */
  logo?: React.ReactNode;
  /** Cor do quadrado das iniciais. */
  tone?: FerinoCardTone;
  /** Ferino ativo: borda laranja. */
  active?: boolean;
  /** Torneio ao vivo agora: etiqueta "ao vivo" com o nome do evento. */
  live?: string;
  /** Pendências (pedidos de entrada): número vermelho. */
  pending?: number;
  /** Rótulo do número de pendências. */
  pendingLabel?: string;
  /** Linha de contexto quando não há ao vivo: "Rodada hoje 20h · você ainda não confirmou". */
  info?: string;
  onClick?: () => void;
  className?: string;
}

const TONE: Record<FerinoCardTone, string> = {
  primary: 'bg-primary text-primary-foreground',
  success: 'bg-success/15 text-success',
  neutral: 'bg-surface-3 text-muted-foreground',
};

/**
 * Cartão de Ferino na tela de escolha: logo, nome, papel e esporte, e embaixo
 * o que está acontecendo nele (torneio ao vivo, rodada de hoje, pedidos).
 */
export function FerinoCard({
  name, meta, initials, logo, tone = 'primary', active, live, pending, pendingLabel = 'pedidos', info, onClick, className,
}: FerinoCardProps) {
  const hasFooter = !!live || !!info || (pending ?? 0) > 0;
  const cls = cn(
    'flex w-full flex-col gap-3 rounded-[18px] bg-surface-1 p-3.5 text-left',
    active && 'ring-[1.5px] ring-inset ring-primary/55',
    onClick && 'transition-colors hover:bg-surface-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
    className,
  );
  const inner = (
    <>
      <span className="flex items-center gap-3">
        {logo ?? (
          <span className={cn('flex h-[46px] w-[46px] shrink-0 items-center justify-center rounded-[13px] text-[15px] font-extrabold', TONE[tone])}>
            {initials}
          </span>
        )}
        <span className="flex min-w-0 flex-1 flex-col gap-1">
          <span className="truncate text-base font-semibold text-foreground">{name}</span>
          {meta && <span className="truncate text-[11.5px] text-subtle-foreground">{meta}</span>}
        </span>
        <ChevronRight className={cn('h-4 w-4 shrink-0', active ? 'text-primary' : 'text-subtle-foreground')} aria-hidden="true" />
      </span>
      {hasFooter && (
        <span className="flex items-center justify-between gap-3 border-t border-border pt-2.5">
          {live ? <LiveTag label={live} /> : <span className="text-[12.5px] text-muted-foreground">{info}</span>}
          {(pending ?? 0) > 0 && (
            <span className="flex items-center gap-1.5 text-[11.5px] text-subtle-foreground">
              {pendingLabel}
              <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-destructive px-1.5 text-[11px] font-bold text-destructive-foreground">
                {pending}
              </span>
            </span>
          )}
        </span>
      )}
    </>
  );
  return onClick ? (
    <button type="button" onClick={onClick} className={cls}>{inner}</button>
  ) : (
    <div className={cls}>{inner}</div>
  );
}
