import { cn } from '../../lib/utils';

export type FormResult = 'V' | 'E' | 'D';

export interface FormStripProps {
  /** Resultados do mais antigo para o mais recente: V vitoria, E empate, D derrota. */
  results: FormResult[];
  /** Rotulo mono a esquerda. */
  label?: string;
  className?: string;
}

const TONE: Record<FormResult, string> = {
  V: 'bg-success/15 text-success',
  E: 'bg-surface-3 text-muted-foreground',
  D: 'bg-destructive/15 text-destructive',
};

const NAME: Record<FormResult, string> = { V: 'vitoria', E: 'empate', D: 'derrota' };

/** Cartao "Ultimas 5": uma pastilha V/E/D por jogo, como nos apps de futebol. */
export function FormStrip({ results, label = 'Últimas 5', className }: FormStripProps) {
  return (
    <div className={cn('flex items-center justify-between gap-3 rounded-2xl bg-surface-1 px-4 py-3.5', className)}>
      <span className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-subtle-foreground">{label}</span>
      <div className="flex items-center gap-[5px]" role="list">
        {results.map((r, i) => (
          <span
            key={i}
            role="listitem"
            aria-label={NAME[r]}
            className={cn('flex h-6 w-6 items-center justify-center rounded-[7px] font-mono text-[11px] font-bold', TONE[r])}
          >
            {r}
          </span>
        ))}
      </div>
    </div>
  );
}
