import * as React from 'react';
import { cn } from '../../lib/utils';

export type ProgressRingTone = 'primary' | 'you' | 'success' | 'foreground';

export interface ProgressRingProps {
  /** Progresso de 0 a 1. */
  value: number;
  /** Diametro em px. */
  size?: number;
  /** Espessura do anel em px. */
  stroke?: number;
  /** primary = laranja (presenca); you = ciano; success = verde (pago); foreground = texto (sobre fundo laranja). */
  tone?: ProgressRingTone;
  /** Numero grande no centro ("14"). Ignorado se vier children. */
  label?: React.ReactNode;
  /** Legenda pequena em mono embaixo do numero ("de 22"). */
  caption?: React.ReactNode;
  /** Conteudo livre no centro (substitui label e caption). */
  children?: React.ReactNode;
  className?: string;
  'aria-label'?: string;
}

const TONE: Record<ProgressRingTone, string> = {
  primary: 'stroke-primary',
  you: 'stroke-you',
  success: 'stroke-success',
  foreground: 'stroke-foreground',
};

/**
 * Anel de progresso com conteudo no centro: o "14 de 22" da presenca.
 * O trilho e surface-3; o arco comeca no topo e cresce no sentido horario.
 * O Progress de ui/ e barra; este e o anel.
 */
export function ProgressRing({
  value, size = 92, stroke = 7, tone = 'primary', label, caption, children, className, 'aria-label': ariaLabel,
}: ProgressRingProps) {
  const v = Math.max(0, Math.min(1, value));
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  return (
    <div
      role="progressbar"
      aria-label={ariaLabel}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(v * 100)}
      className={cn('relative inline-flex shrink-0 items-center justify-center', className)}
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} className="absolute inset-0 -rotate-90" aria-hidden="true">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" strokeWidth={stroke} className="stroke-surface-3" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={`${c} ${c}`}
          strokeDashoffset={c * (1 - v)}
          className={cn(TONE[tone], 'transition-[stroke-dashoffset] duration-300 motion-reduce:transition-none')}
        />
      </svg>
      <div className="relative flex flex-col items-center justify-center text-center">
        {children ?? (
          <>
            {label != null && <span className="font-display text-[28px] font-extrabold leading-none text-foreground">{label}</span>}
            {caption != null && <span className="mt-1 font-mono text-[10px] font-medium text-subtle-foreground">{caption}</span>}
          </>
        )}
      </div>
    </div>
  );
}
