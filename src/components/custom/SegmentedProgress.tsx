import { cn } from '../../lib/utils';

export interface SegmentedProgressProps {
  /** Quantidade de segmentos (rodadas, fases). */
  total: number;
  /** Segmento atual, de 1 a `total`: laranja cheio. */
  current: number;
  /** Segmentos ja concluidos: laranja a 60%. Padrao: os anteriores ao atual. */
  done?: number;
  /** Texto mono acima das barras: "Rodada 3 de 6". */
  label?: string;
  className?: string;
}

/**
 * Barrinhas de progresso por etapa ("Rodada 3 de 6"). Para uma contagem
 * continua (13 de 18 jogos) use o Progress de ui/.
 */
export function SegmentedProgress({ total, current, done, label, className }: SegmentedProgressProps) {
  const finished = done ?? Math.max(0, current - 1);
  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={total}
      aria-valuenow={current}
      className={cn('flex flex-col gap-1.5', className)}
    >
      {label && <span className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-subtle-foreground">{label}</span>}
      <div className="flex gap-1">
        {Array.from({ length: total }, (_, i) => {
          const n = i + 1;
          return (
            <span
              key={n}
              className={cn('h-1.5 flex-1 rounded-full', n === current ? 'bg-primary' : n <= finished ? 'bg-primary/60' : 'bg-surface-3')}
            />
          );
        })}
      </div>
    </div>
  );
}
