import { cn } from '../../lib/utils';

export interface TeamCardPlayer {
  name: string;
  /** Mostra a marca "G" ao lado do nome. */
  goalkeeper?: boolean;
  /** Texto mono a direita: "3 gols", "1 gol · 1 ass.", "sem gol". */
  stat?: string;
  /** Destaca a linha em ciano (o proprio atleta). */
  you?: boolean;
}

export type TeamCardStatusTone = 'live' | 'muted';

export interface TeamCardProps {
  name: string;
  /** Cor do time vinda do dado (qualquer valor CSS). E a unica cor que nao e token, porque cada time tem a sua. */
  color: string;
  /** Etiqueta a direita do nome: "em quadra", "no banco · entra a seguir". */
  status?: string;
  statusTone?: TeamCardStatusTone;
  players: TeamCardPlayer[];
  /** Modo banco: uma linha so, nomes separados por " · ", sem estatistica. */
  compact?: boolean;
  /** Borda ciano: o time do atleta logado. */
  highlight?: boolean;
  className?: string;
}

/**
 * Cartao de time da pelada: quadradinho na cor do time, nome, estado
 * (em quadra, no banco) e os jogadores com os gols de cada um. Aba Times da
 * rodada e cerimonia do sorteio usam o mesmo cartao.
 */
export function TeamCard({ name, color, status, statusTone = 'muted', players, compact, highlight, className }: TeamCardProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-2 rounded-2xl bg-surface-1 px-3.5 py-3',
        highlight && 'border border-you/40',
        className,
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <span className="flex min-w-0 items-center gap-2 font-bold text-foreground">
          <span
            aria-hidden="true"
            className="h-2.5 w-2.5 shrink-0 rounded-[3px] ring-1 ring-inset ring-border"
            style={{ background: color }}
          />
          <span className="truncate">{name}</span>
        </span>
        {status && (
          <span
            className={cn(
              'shrink-0 whitespace-nowrap font-mono text-[10.5px] uppercase tracking-[0.1em]',
              statusTone === 'live' ? 'text-primary' : 'text-subtle-foreground',
            )}
          >
            {status}
          </span>
        )}
      </div>
      {compact ? (
        <p className="text-[13.5px] font-medium text-muted-foreground">{players.map((p) => p.name).join(' · ')}</p>
      ) : (
        players.map((p) => (
          <div key={p.name} className="flex items-center justify-between gap-3 text-[13.5px]">
            <span className={cn('flex items-center gap-1.5 truncate', p.you ? 'font-semibold text-you' : 'text-foreground')}>
              {p.name}
              {p.goalkeeper && (
                <span className="font-mono text-[10.5px] uppercase tracking-[0.1em] text-subtle-foreground">G</span>
              )}
            </span>
            {p.stat && <span className="shrink-0 font-mono text-[10.5px] uppercase tracking-[0.1em] text-subtle-foreground">{p.stat}</span>}
          </div>
        ))
      )}
    </div>
  );
}
