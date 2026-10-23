import * as React from 'react';
import { cn } from '../../lib/utils';

export interface SportOption<K extends string = string> {
  key: K;
  label: string;
  /** Linha mono embaixo do nome: "torneios · duplas". */
  description?: string;
  /** Ícone Lucide do esporte. */
  icon?: React.ReactNode;
}

export interface SportPickerProps<K extends string = string> {
  options: SportOption<K>[];
  value: K | null;
  onChange: (key: K) => void;
  className?: string;
  'aria-label'?: string;
}

/**
 * Escolha do esporte em blocos de tela inteira (criar Ferino, passo 1): ícone,
 * nome e o que muda embaixo. O escolhido ganha borda e ícone laranja.
 */
export function SportPicker<K extends string>({ options, value, onChange, className, 'aria-label': ariaLabel }: SportPickerProps<K>) {
  return (
    <div role="radiogroup" aria-label={ariaLabel ?? 'Esporte'} className={cn('grid grid-cols-2 gap-2.5', className)}>
      {options.map((o) => {
        const on = o.key === value;
        return (
          <button
            key={o.key}
            type="button"
            role="radio"
            aria-checked={on}
            onClick={() => onChange(o.key)}
            className={cn(
              'flex h-[108px] flex-col justify-between gap-2 rounded-2xl p-3.5 text-left transition-colors',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
              on ? 'bg-primary/[0.09] ring-[1.5px] ring-inset ring-primary' : 'bg-surface-1 hover:bg-surface-3',
            )}
          >
            <span className={cn('[&>svg]:h-6 [&>svg]:w-6', on ? 'text-primary' : 'text-muted-foreground')}>{o.icon}</span>
            <span className="flex flex-col gap-1">
              <span className="text-sm font-semibold text-foreground">{o.label}</span>
              {o.description && (
                <span className={cn('font-mono text-[10.5px] uppercase tracking-[0.1em]', on ? 'text-primary' : 'text-subtle-foreground')}>
                  {o.description}
                </span>
              )}
            </span>
          </button>
        );
      })}
    </div>
  );
}
