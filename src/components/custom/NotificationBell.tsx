'use client';

import * as React from 'react';
import { Bell } from 'lucide-react';
import { cn } from '../../lib/utils';

export interface NotificationBellProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  /** Quantidade de avisos novos (ou true). Qualquer valor maior que zero acende o ponto. */
  unread?: number | boolean;
  /** Painel aberto: anel laranja em volta. */
  active?: boolean;
  /** md = 32px (topo do app), lg = 44px (topo do web). */
  size?: 'md' | 'lg';
}

/** Sino do topo das telas, com ponto vermelho quando ha aviso novo. */
export const NotificationBell = React.forwardRef<HTMLButtonElement, NotificationBellProps>(
  ({ unread = 0, active, size = 'md', className, type = 'button', ...props }, ref) => {
    const count = typeof unread === 'number' ? unread : unread ? 1 : 0;
    return (
      <button
        ref={ref}
        type={type}
        aria-label={count > 0 ? `Avisos, ${count} novo${count === 1 ? '' : 's'}` : 'Avisos'}
        className={cn(
          'relative inline-flex shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors',
          'hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
          size === 'lg' ? 'h-11 w-11' : 'h-8 w-8',
          active ? 'bg-stage text-foreground ring-[1.5px] ring-primary' : 'bg-surface-1 hover:bg-surface-3',
          className,
        )}
        {...props}
      >
        <Bell className={size === 'lg' ? 'h-[18px] w-[18px]' : 'h-4 w-4'} aria-hidden="true" />
        {count > 0 && (
          <span
            aria-hidden="true"
            className={cn(
              'absolute rounded-full bg-destructive ring-2 ring-background',
              size === 'lg' ? 'right-2.5 top-2.5 h-2.5 w-2.5' : 'right-1.5 top-1.5 h-2 w-2',
            )}
          />
        )}
      </button>
    );
  },
);
NotificationBell.displayName = 'NotificationBell';
