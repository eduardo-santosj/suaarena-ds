'use client';

import type { ReactNode } from 'react';
import { cn } from '../../lib/utils';

export type ThemePreference = 'system' | 'light' | 'dark';

export interface ThemeSwitcherProps {
  value: ThemePreference;
  onChange: (value: ThemePreference) => void;
  /** Texto abaixo das opcoes. `null` esconde. */
  description?: ReactNode;
  className?: string;
}

const OPTIONS: Array<{ value: ThemePreference; label: string }> = [
  { value: 'system', label: 'Automático' },
  { value: 'light', label: 'Claro' },
  { value: 'dark', label: 'Escuro' },
];

/** Miniatura: `.light` e `.dark` forcam as variaveis de cada tema. */
function Preview({ value }: { value: ThemePreference }) {
  const base = 'h-[58px] rounded-[9px] bg-background ring-1 ring-inset ring-border';
  if (value === 'system') {
    return (
      <span aria-hidden className="w-full h-[58px] flex overflow-hidden rounded-[9px]">
        <span className="light flex-1 bg-background" />
        <span className="dark flex-1 bg-background" />
      </span>
    );
  }
  return <span aria-hidden className={cn(value, 'w-full block', base)} />;
}

/**
 * Seletor de aparencia (K3): Automatico, Claro, Escuro, com miniatura.
 * Padrao automatico. Igual no app e no web; vale para o aparelho.
 */
export function ThemeSwitcher({
  value,
  onChange,
  description = 'Automático segue o celular: claro de dia, escuro à noite. Vale pra este aparelho.',
  className,
}: ThemeSwitcherProps) {
  return (
    <div className={cn('flex flex-col gap-2.5', className)}>
      <div role="radiogroup" aria-label="Aparência" className="grid grid-cols-3 gap-2">
        {OPTIONS.map((o) => {
          const on = o.value === value;
          return (
            <button
              key={o.value}
              type="button"
              role="radio"
              aria-checked={on}
              onClick={() => onChange(o.value)}
              className={cn(
                'rounded-[14px] p-2.5 bg-surface-1 flex flex-col items-center gap-2 text-[12.5px] font-semibold',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                on ? 'ring-2 ring-primary text-foreground' : 'ring-1 ring-border text-muted-foreground hover:text-foreground',
              )}
            >
              <Preview value={o.value} />
              {o.label}
            </button>
          );
        })}
      </div>
      {description !== null && (
        <span className="text-[12.5px] leading-normal text-subtle-foreground">{description}</span>
      )}
    </div>
  );
}
