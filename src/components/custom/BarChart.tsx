import { cn } from '../../lib/utils';

export interface BarChartBar {
  key: string;
  /** Rotulo mono embaixo da barra: "mai", "jun". */
  label: string;
  value: number;
  /** Barra e rotulo em laranja (o mes atual). */
  active?: boolean;
}

export interface BarChartProps {
  bars: BarChartBar[];
  /** Altura da area das barras em px. */
  height?: number;
  className?: string;
  'aria-label'?: string;
}

/**
 * Grafico de barras simples: pontos por mes no perfil do atleta. A maior
 * barra ocupa a altura toda; as demais, a proporcao dela. Sem eixo, sem grade.
 */
export function BarChart({ bars, height = 64, className, 'aria-label': ariaLabel }: BarChartProps) {
  const max = Math.max(1, ...bars.map((b) => Math.max(0, b.value)));
  return (
    <div role="img" aria-label={ariaLabel ?? bars.map((b) => `${b.label} ${b.value}`).join(', ')} className={cn('flex flex-col gap-2', className)}>
      <div className="flex items-end gap-2" style={{ height }}>
        {bars.map((b) => (
          <span
            key={b.key}
            className={cn('flex-1 rounded-t-[5px] rounded-b-[2px]', b.active ? 'bg-primary' : 'bg-surface-3')}
            style={{ height: `${Math.max(4, (Math.max(0, b.value) / max) * 100)}%` }}
          />
        ))}
      </div>
      <div className="flex gap-2">
        {bars.map((b) => (
          <span
            key={b.key}
            className={cn('flex-1 text-center font-mono text-[9.5px] uppercase', b.active ? 'text-primary' : 'text-subtle-foreground')}
          >
            {b.label}
          </span>
        ))}
      </div>
    </div>
  );
}
