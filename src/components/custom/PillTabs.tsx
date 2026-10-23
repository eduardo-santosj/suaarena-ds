'use client';

import { cn } from '../../lib/utils';

export interface PillTabOption<K extends string = string> {
  key: K;
  label: string;
  /** Contagem ou marca curta ao lado do rótulo. */
  badge?: string | number;
}

export interface PillTabsProps<K extends string = string> {
  options: PillTabOption<K>[];
  value: K;
  onChange: (key: K) => void;
  /** md = 34px (abas da tela), sm = 30px (filtro de mês, coluna). */
  size?: 'md' | 'sm';
  className?: string;
  'aria-label'?: string;
}

/**
 * Abas em pílula: no lugar de seções empilhadas ou filtros escondidos, uma
 * fileira que troca o conteúdo (Jogos · Times · Tabela). A ativa é laranja
 * (primary); rola na horizontal quando não cabe.
 */
export function PillTabs<K extends string>({
  options, value, onChange, size = 'md', className, 'aria-label': ariaLabel,
}: PillTabsProps<K>) {
  const sm = size === 'sm';
  return (
    <div
      role="tablist"
      aria-label={ariaLabel}
      className={cn('flex gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden', className)}
    >
      {options.map((o) => {
        const on = o.key === value;
        return (
          <button
            key={o.key}
            type="button"
            role="tab"
            aria-selected={on}
            onClick={() => { if (!on) onChange(o.key); }}
            className={cn(
              'inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full font-semibold transition-colors',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
              sm ? 'h-[30px] px-3 text-xs' : 'h-[34px] px-[15px] text-[13px]',
              on
                ? 'bg-primary text-primary-foreground'
                : 'bg-surface-2 text-muted-foreground hover:bg-surface-3 hover:text-foreground',
            )}
          >
            {o.label}
            {o.badge != null && (
              <span
                className={cn(
                  'rounded-full px-1.5 py-px text-[10px] font-bold',
                  on ? 'bg-primary-foreground/20' : 'bg-surface-3',
                )}
              >
                {o.badge}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
