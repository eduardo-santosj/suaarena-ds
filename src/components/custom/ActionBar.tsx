'use client';

import type { HTMLAttributes } from 'react';
import { cn } from '../../lib/utils';

export interface ActionBarProps extends HTMLAttributes<HTMLDivElement> {
  /** Gruda no fim da area de rolagem (padrao). false = fluxo normal. */
  sticky?: boolean;
}

/**
 * Barra de acao no rodape, acima da tab bar: a acao do momento sempre ao
 * alcance do polegar ("Encerrar jogo", "+ Gol"). Os filhos dividem a largura;
 * use `Button` com `className="flex-1"`.
 */
export function ActionBar({ sticky = true, className, children, ...rest }: ActionBarProps) {
  return (
    <div
      {...rest}
      className={cn(
        'z-30 flex gap-2 px-4 pt-2.5 pb-[max(10px,env(safe-area-inset-bottom))]',
        'bg-chrome border-t border-border/60',
        sticky && 'sticky bottom-0',
        className,
      )}
    >
      {children}
    </div>
  );
}
