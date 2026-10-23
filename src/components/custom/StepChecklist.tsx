import { Check, ChevronRight } from 'lucide-react';
import { cn } from '../../lib/utils';

export interface ChecklistStep {
  key: string;
  title: string;
  description?: string;
  done?: boolean;
}

export interface StepChecklistProps {
  steps: ChecklistStep[];
  /** Toque num passo pendente. Sem ele a lista é só leitura. */
  onStepClick?: (key: string) => void;
  /** Mostra "1 de 4 feito" e a barra em cima. */
  showProgress?: boolean;
  className?: string;
}

/**
 * Roteiro de passos de um Ferino novo: feitos com visto verde, o próximo com
 * borda laranja, os demais em espera. Substitui a lista vazia.
 */
export function StepChecklist({ steps, onStepClick, showProgress = true, className }: StepChecklistProps) {
  const done = steps.filter((s) => s.done).length;
  const currentKey = steps.find((s) => !s.done)?.key;
  const pct = steps.length ? Math.round((done / steps.length) * 100) : 0;
  return (
    <div className={cn('flex flex-col gap-2.5', className)}>
      {showProgress && (
        <div className="flex flex-col gap-1.5" role="progressbar" aria-valuemin={0} aria-valuemax={steps.length} aria-valuenow={done}>
          <div className="flex items-center justify-between font-mono text-[10.5px] uppercase tracking-[0.14em] text-subtle-foreground">
            <span>{done} de {steps.length} feito</span>
            <span>{pct}%</span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-surface-3">
            <div className="h-full rounded-full bg-primary transition-[width]" style={{ width: `${pct}%` }} />
          </div>
        </div>
      )}
      {steps.map((s, i) => {
        const current = s.key === currentKey;
        const clickable = !!onStepClick && !s.done;
        const inner = (
          <>
            <span
              className={cn(
                'flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-full text-[11px] font-bold',
                s.done ? 'bg-success text-success-foreground' : 'font-mono text-subtle-foreground ring-[1.5px] ring-inset ring-border',
              )}
            >
              {s.done ? <Check className="h-3.5 w-3.5" aria-hidden="true" /> : i + 1}
            </span>
            <span className="flex min-w-0 flex-1 flex-col gap-0.5">
              <span className={cn('text-[14.5px] font-medium', s.done ? 'text-muted-foreground' : 'text-foreground')}>{s.title}</span>
              {s.description && <span className="text-[11.5px] text-subtle-foreground">{s.description}</span>}
            </span>
            {!s.done && <ChevronRight className={cn('h-4 w-4 shrink-0', current ? 'text-primary' : 'text-subtle-foreground')} aria-hidden="true" />}
          </>
        );
        const cls = cn(
          'flex w-full items-center gap-3 rounded-[14px] bg-surface-1 px-3.5 py-3 text-left',
          current && 'ring-[1.5px] ring-inset ring-primary/55',
          clickable && 'transition-colors hover:bg-surface-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
        );
        return clickable ? (
          <button key={s.key} type="button" onClick={() => onStepClick!(s.key)} aria-current={current ? 'step' : undefined} className={cls}>{inner}</button>
        ) : (
          <div key={s.key} aria-current={current ? 'step' : undefined} className={cls}>{inner}</div>
        );
      })}
    </div>
  );
}
