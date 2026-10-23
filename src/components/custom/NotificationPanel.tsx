'use client';

import * as React from 'react';
import { ChevronRight } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { NotificationBell } from './NotificationBell';

export interface NotificationPanelProps {
  /** Os NoticeItem (use `elevated` neles). */
  children?: React.ReactNode;
  title?: string;
  /** Mostra "Marcar tudo como lido" quando existe. */
  onMarkAllRead?: () => void;
  /** Mostra "Ver todos" no rodape quando existe. */
  onSeeAll?: () => void;
  /** Texto quando nao ha nenhum aviso (children vazio). */
  emptyText?: string;
  className?: string;
}

/** Conteudo do painel suspenso de avisos do web: ultimos avisos, marcar como lido, ver todos. */
export function NotificationPanel({
  children, title = 'Avisos', onMarkAllRead, onSeeAll, emptyText = 'Nenhum aviso por enquanto.', className,
}: NotificationPanelProps) {
  const empty = React.Children.count(children) === 0;
  return (
    <div className={cn('flex w-[380px] max-w-[calc(100vw-2rem)] flex-col gap-2 rounded-[18px] bg-surface-2 p-3.5 shadow-2xl', className)}>
      <div className="flex items-center justify-between px-1 pb-1.5">
        <span className="text-[15px] font-semibold text-foreground">{title}</span>
        {onMarkAllRead && !empty && (
          <button type="button" onClick={onMarkAllRead} className="text-xs font-medium text-primary hover:underline">
            Marcar tudo como lido
          </button>
        )}
      </div>
      {empty ? <p className="px-1 py-6 text-center text-[13px] text-muted-foreground">{emptyText}</p> : children}
      {onSeeAll && !empty && (
        <button
          type="button"
          onClick={onSeeAll}
          className="mx-auto inline-flex items-center gap-1 p-1.5 text-[12.5px] font-medium text-muted-foreground hover:text-foreground"
        >
          Ver todos <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
        </button>
      )}
    </div>
  );
}

export interface NotificationMenuProps extends Omit<NotificationPanelProps, 'className'> {
  /** Avisos novos: acende o ponto do sino. */
  unread?: number | boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
}

/** Sino com painel suspenso (web): o sino abre os ultimos avisos ancorados nele. */
export function NotificationMenu({ unread, open, onOpenChange, className, ...panel }: NotificationMenuProps) {
  const [inner, setInner] = React.useState(false);
  const isOpen = open ?? inner;
  return (
    <Popover
      open={isOpen}
      onOpenChange={(o) => {
        setInner(o);
        onOpenChange?.(o);
      }}
    >
      <PopoverTrigger asChild>
        <NotificationBell unread={unread} active={isOpen} size="lg" className={className} />
      </PopoverTrigger>
      <PopoverContent align="end" sideOffset={10} className="w-auto border-0 bg-transparent p-0 shadow-none">
        <NotificationPanel {...panel} />
      </PopoverContent>
    </Popover>
  );
}
