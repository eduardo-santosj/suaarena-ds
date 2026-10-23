'use client';

import { cn } from '../../lib/utils';

export interface StepperProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  /** Formata o valor mostrado: (v) => `${v} min`. */
  format?: (value: number) => string;
  /** Nome do campo, usado nos rótulos de acessibilidade dos botões. */
  label?: string;
  className?: string;
}

/** Controle − valor +: número de times, minutos do jogo, dia de vencimento. */
export function Stepper({ value, onChange, min = 0, max = 99, step = 1, format, label, className }: StepperProps) {
  const set = (v: number) => {
    const next = Math.min(max, Math.max(min, v));
    if (next !== value) onChange(next);
  };
  const button = (sign: '−' | '+', disabled: boolean) => (
    <button
      type="button"
      disabled={disabled}
      onClick={() => set(value + (sign === '+' ? step : -step))}
      aria-label={`${sign === '+' ? 'Aumentar' : 'Diminuir'}${label ? ` ${label}` : ''}`}
      className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-surface-3 text-lg font-semibold text-foreground transition-colors hover:bg-surface-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-40"
    >
      {sign}
    </button>
  );
  return (
    <div role="group" aria-label={label} className={cn('inline-flex items-center gap-3', className)}>
      {button('−', value <= min)}
      <span aria-live="polite" className="min-w-[32px] text-center font-mono text-base font-bold tabular-nums text-foreground">
        {format ? format(value) : value}
      </span>
      {button('+', value >= max)}
    </div>
  );
}
