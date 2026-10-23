'use client';

import { useEffect, useRef, useState } from 'react';
import { cn } from '../../lib/utils';

export interface ScoreSide {
  name: string;
  /** Cor do time (dado do Ferino, hex). Sem cor, cai na superficie. */
  color?: string | null;
  score: number;
  /** Quem marcou ("Rafa 2 · Mateus 1") ou contexto ("entrou do banco"). */
  scorers?: string;
}

export interface ScoreBoardProps {
  a: ScoreSide;
  b: ScoreSide;
  /** Admin: mostra os dois botoes de ponto embaixo. */
  onGoal?: (side: 'a' | 'b') => void;
  disabled?: boolean;
  /** Prefixo dos botoes: "+ Gol" (futebol, padrao) ou "+1" (futevolei). */
  goalLabel?: string;
  /**
   * sides (padrao): time, numeros no meio, time. stacked: uma linha por time,
   * nome a esquerda e placar grande a direita (jogo de torneio).
   */
  layout?: 'sides' | 'stacked';
  className?: string;
}

/** Numero que "pula" quando muda; desliga com reduzir movimento. */
function Score({ value, tone, size = 'lg' }: { value: number; tone: 'lead' | 'trail' | 'even'; size?: 'lg' | 'md' }) {
  const [bump, setBump] = useState(false);
  const prev = useRef(value);
  useEffect(() => {
    if (prev.current === value) return;
    prev.current = value;
    setBump(true);
    const t = setTimeout(() => setBump(false), 180);
    return () => clearTimeout(t);
  }, [value]);
  return (
    <span
      className={cn(
        'font-display font-extrabold leading-none tracking-[-0.03em] tabular-nums inline-block',
        size === 'lg' ? 'text-5xl' : 'text-[32px] font-bold',
        'motion-safe:transition-transform motion-safe:duration-200',
        bump && 'motion-safe:scale-125',
        tone === 'lead' ? 'text-primary' : tone === 'trail' ? 'text-muted-foreground' : 'text-foreground',
      )}
    >
      {value}
    </span>
  );
}

function Swatch({ color }: { color?: string | null }) {
  return (
    <span
      aria-hidden
      className={cn('w-2.5 h-2.5 rounded-[3px] shrink-0 inline-block ring-1 ring-inset ring-border/60', !color && 'bg-surface-3')}
      style={color ? { backgroundColor: color } : undefined}
    />
  );
}

/**
 * Placar de dois lados: time a esquerda, numeros no meio, time a direita.
 * Quem lidera fica em laranja; o outro, apagado.
 */
export function ScoreBoard({ a, b, onGoal, disabled, goalLabel = '+ Gol', layout = 'sides', className }: ScoreBoardProps) {
  const ta = a.score > b.score ? 'lead' : a.score < b.score ? 'trail' : 'even';
  const tb = b.score > a.score ? 'lead' : b.score < a.score ? 'trail' : 'even';
  const stackedRow = (t: ScoreSide, tone: 'lead' | 'trail' | 'even') => (
    <div className="flex items-center justify-between gap-3">
      <div className="flex min-w-0 flex-col gap-[3px]">
        <span className="flex min-w-0 items-center gap-[7px]">
          {t.color && <Swatch color={t.color} />}
          <span className={cn('truncate text-[15.5px]', tone === 'trail' ? 'font-medium text-muted-foreground' : 'font-semibold text-foreground')}>{t.name}</span>
        </span>
        {t.scorers && <span className="truncate text-[11px] text-subtle-foreground">{t.scorers}</span>}
      </div>
      <Score value={t.score} tone={tone} size="md" />
    </div>
  );
  return (
    <div className={cn('flex flex-col gap-3', className)}>
      {layout === 'stacked' ? (
        <div className="flex flex-col gap-2.5" role="group" aria-label={`${a.name} ${a.score} a ${b.score} ${b.name}`}>
          {stackedRow(a, ta)}
          {stackedRow(b, tb)}
        </div>
      ) : (
      <div className="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-2.5">
        <div className="flex flex-col gap-[3px] min-w-0">
          <span className="text-[15px] font-bold flex items-center gap-[7px] min-w-0">
            <Swatch color={a.color} /><span className="truncate">{a.name}</span>
          </span>
          {a.scorers && <span className="text-[11px] text-subtle-foreground truncate">{a.scorers}</span>}
        </div>
        <div className="flex items-center gap-3" aria-label={`${a.name} ${a.score} a ${b.score} ${b.name}`}>
          <Score value={a.score} tone={ta} />
          <span className="font-mono text-[10.5px] text-subtle-foreground">–</span>
          <Score value={b.score} tone={tb} />
        </div>
        <div className="flex flex-col gap-[3px] items-end min-w-0">
          <span className="text-[15px] font-bold flex items-center gap-[7px] min-w-0">
            <span className="truncate">{b.name}</span><Swatch color={b.color} />
          </span>
          {b.scorers && <span className="text-[11px] text-subtle-foreground truncate">{b.scorers}</span>}
        </div>
      </div>
      )}
      {onGoal && (
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => onGoal('a')}
            disabled={disabled}
            className="flex-1 min-w-0 h-11 rounded-xl bg-primary text-primary-foreground text-[13px] font-semibold truncate px-2 transition-opacity hover:opacity-90 disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {goalLabel} {a.name}
          </button>
          <button
            type="button"
            onClick={() => onGoal('b')}
            disabled={disabled}
            className="flex-1 min-w-0 h-11 rounded-xl bg-surface-3 text-foreground text-[13px] font-semibold truncate px-2 transition-opacity hover:opacity-85 disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {goalLabel} {b.name}
          </button>
        </div>
      )}
    </div>
  );
}
