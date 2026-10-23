'use client';

import { BellRing, type LucideIcon } from 'lucide-react';
import { cn } from '../../lib/utils';

export interface PermissionCardProps {
  title: string;
  /** O que vai chegar, com exemplos concretos. Pedido generico e o que a pessoa recusa. */
  description: string;
  /** Icone Lucide do pedido. Padrao: sino tocando. */
  icon?: LucideIcon;
  /** Rotulo do botao principal. Padrao: "Ativar avisos". */
  acceptLabel?: string;
  /** Rotulo do botao secundario. Padrao: "Agora não". No layout inline nao aparece. */
  dismissLabel?: string;
  onAccept: () => void;
  onDismiss?: () => void;
  /** stacked: cartao do app (dois botoes embaixo). inline: linha do web, so o botao de ativar. */
  layout?: 'stacked' | 'inline';
  className?: string;
}

/**
 * Pedido de permissao de aviso (push): aparece depois de uma acao da pessoa,
 * nunca ao abrir o app. So o botao principal chama a janela do sistema.
 */
export function PermissionCard({
  title, description, icon: Icon = BellRing, acceptLabel = 'Ativar avisos', dismissLabel = 'Agora não',
  onAccept, onDismiss, layout = 'stacked', className,
}: PermissionCardProps) {
  const iconBox = (
    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[11px] bg-primary/15 text-primary">
      <Icon className="h-[17px] w-[17px]" aria-hidden="true" />
    </span>
  );
  const text = (
    <span className="flex min-w-0 flex-1 flex-col gap-1">
      <span className="text-[15px] font-semibold leading-snug text-foreground">{title}</span>
      <span className="text-[12.5px] leading-relaxed text-muted-foreground">{description}</span>
    </span>
  );
  if (layout === 'inline') {
    return (
      <div className={cn('flex items-center gap-3.5 rounded-2xl bg-surface-1 p-4', className)}>
        {iconBox}
        {text}
        <button
          type="button"
          onClick={onAccept}
          className="h-[38px] shrink-0 rounded-xl bg-surface-3 px-3.5 text-[13px] font-semibold text-foreground transition-colors hover:bg-surface-3/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          Ativar
        </button>
      </div>
    );
  }
  return (
    <div className={cn('flex flex-col gap-3 rounded-2xl border border-primary/40 bg-stage p-4', className)}>
      <div className="flex items-start gap-3">
        {iconBox}
        {text}
      </div>
      <div className="flex gap-2">
        {onDismiss && (
          <button
            type="button"
            onClick={onDismiss}
            className="h-11 shrink-0 rounded-xl bg-surface-3 px-4 text-[13px] font-semibold text-foreground transition-colors hover:bg-surface-3/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {dismissLabel}
          </button>
        )}
        <button
          type="button"
          onClick={onAccept}
          className="h-11 flex-1 rounded-xl bg-primary text-[13px] font-semibold text-primary-foreground transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          {acceptLabel}
        </button>
      </div>
    </div>
  );
}
