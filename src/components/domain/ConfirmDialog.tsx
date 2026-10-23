"use client";

import type { ReactNode } from 'react';
import { cn } from '../../lib/utils';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '../ui/dialog';

export interface ConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  /** A consequencia, em uma frase ou duas. */
  description: string;
  /** Nomeia a acao ("Encerrar", "Excluir"), nunca "OK". */
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  loading?: boolean;
  variant?: 'destructive' | 'default';
  /** 0.12.0: troca o "!" do circulo (ex.: icone do lucide). */
  icon?: ReactNode;
}

/**
 * Dialogo do que nao volta atras (I3): circulo com "!", titulo, a
 * consequencia e dois botoes lado a lado. Substitui o confirm() do navegador.
 */
export function ConfirmDialog({
  open,
  onOpenChange,
  title,
  description,
  confirmLabel = 'Confirmar',
  cancelLabel = 'Cancelar',
  onConfirm,
  loading = false,
  variant = 'destructive',
  icon,
}: ConfirmDialogProps) {
  const destructive = variant === 'destructive';
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          'w-[calc(100%-44px)] max-w-sm rounded-3xl border-0 bg-surface-2 p-[22px] gap-3',
          'flex flex-col items-center text-center',
          // sem o X do Dialog: aqui a saida e o botao de cancelar
          '[&>button:last-child]:hidden',
        )}
      >
        <span
          aria-hidden
          className={cn(
            'w-[46px] h-[46px] rounded-full flex items-center justify-center text-[22px] font-extrabold',
            destructive ? 'bg-destructive/15 text-destructive' : 'bg-primary/15 text-primary',
          )}
        >
          {icon ?? '!'}
        </span>
        <DialogTitle className="text-[19px] font-bold leading-snug tracking-normal">{title}</DialogTitle>
        <DialogDescription className="text-[13.5px] leading-[1.55] text-muted-foreground">
          {description}
        </DialogDescription>
        <div className="flex w-full gap-2 mt-1.5">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            disabled={loading}
            className="flex-1 h-11 rounded-xl bg-surface-3 text-foreground text-[13px] font-semibold transition-opacity hover:opacity-85 disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className={cn(
              'flex-1 h-11 rounded-xl text-[13px] font-semibold transition-opacity hover:opacity-90 disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
              destructive ? 'bg-destructive text-destructive-foreground' : 'bg-primary text-primary-foreground',
            )}
          >
            {loading ? 'Processando...' : confirmLabel}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
