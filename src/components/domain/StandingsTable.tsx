import { cn } from '../../lib/utils';

export interface StandingsRow {
  /** Identificador estavel da linha (id da dupla ou do jogador). */
  key: string;
  name: string;
  played: number;
  wins: number;
  losses: number;
  pointsFor: number;
  pointsAgainst: number;
  points: number;
  /** Linha do proprio atleta: fundo e nome em ciano. */
  me?: boolean;
  /** Linha pequena sob o nome (ex.: "eliminados"). */
  note?: string;
}

export interface StandingsTableProps {
  rows: StandingsRow[];
  /** Rotulo da coluna do nome. "Dupla" por padrao; Rei da Praia usa "Jogador". */
  nameLabel?: string;
  /** As posicoes 1..n aparecem com o numero em laranja (quem classifica). */
  qualifyCount?: number;
  onRowClick?: (key: string) => void;
  className?: string;
}

const signed = (n: number) => (n > 0 ? `+${n}` : String(n));

const HEAD = 'pb-2 pl-1 text-right font-mono text-[9.5px] font-medium tracking-[0.04em] text-subtle-foreground';
const CELL = 'py-[9px] pl-1 text-right font-mono text-[11.5px] text-muted-foreground whitespace-nowrap';

/**
 * Classificacao do torneio: # Nome J V D PF PS SP P, todas as colunas sem
 * rolagem lateral (em 360px o nome ocupa o que sobra e vira reticencias).
 * SP e o saldo de pontos (PF menos PS), com sinal.
 */
export function StandingsTable({ rows, nameLabel = 'Dupla', qualifyCount = 0, onRowClick, className }: StandingsTableProps) {
  return (
    <div className={cn('rounded-2xl bg-surface-1 p-3', className)}>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th scope="col" className={cn(HEAD, 'w-[18px] pl-0 text-left')}>#</th>
            <th scope="col" className={cn(HEAD, 'text-left')}>{nameLabel}</th>
            {['J', 'V', 'D', 'PF', 'PS', 'SP', 'P'].map((h) => (
              <th key={h} scope="col" className={HEAD}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => {
            const pos = i + 1;
            const qualifies = pos <= qualifyCount;
            const clickable = !!onRowClick;
            return (
              <tr
                key={r.key}
                onClick={clickable ? () => onRowClick!(r.key) : undefined}
                className={cn(
                  'border-t border-border/60',
                  r.me && 'bg-you/[0.08]',
                  clickable && 'cursor-pointer transition-colors hover:bg-surface-3',
                )}
              >
                <td className={cn(CELL, 'w-[18px] pl-0 text-left', qualifies && 'font-bold text-primary')}>{pos}</td>
                <td className="max-w-0 w-full py-[9px] pl-1 text-left">
                  <span className={cn('block truncate text-[12.5px] font-semibold', r.me ? 'text-you' : 'text-foreground')}>{r.name}</span>
                  {r.note && <span className="block truncate text-[10.5px] text-subtle-foreground">{r.note}</span>}
                </td>
                <td className={CELL}>{r.played}</td>
                <td className={CELL}>{r.wins}</td>
                <td className={CELL}>{r.losses}</td>
                <td className={CELL}>{r.pointsFor}</td>
                <td className={CELL}>{r.pointsAgainst}</td>
                <td className={CELL}>{signed(r.pointsFor - r.pointsAgainst)}</td>
                <td className={cn(CELL, 'font-bold text-foreground')}>{r.points}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
