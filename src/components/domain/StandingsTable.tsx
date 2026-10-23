import { cn } from '../../lib/utils';

export interface StandingsRow {
  /** Identificador estavel da linha (id da dupla ou do jogador). */
  key: string;
  name: string;
  /** Colunas padrao do torneio (J V D PF PS SP P). Ignoradas quando a tabela recebe `columns`. */
  played?: number;
  wins?: number;
  losses?: number;
  pointsFor?: number;
  pointsAgainst?: number;
  points?: number;
  /** Celulas da linha quando a tabela usa `columns` (a ultima e a coluna forte, ex.: pontos). */
  cells?: Array<string | number>;
  /** Linha do proprio atleta: fundo e nome em ciano. */
  me?: boolean;
  /** Linha aberta no detalhe ao lado: fundo laranja suave. */
  selected?: boolean;
  /** Linha pequena sob o nome (ex.: "eliminados"). */
  note?: string;
}

export interface StandingsTableProps {
  rows: StandingsRow[];
  /** Rotulo da coluna do nome. "Dupla" por padrao; Rei da Praia usa "Jogador". */
  nameLabel?: string;
  /**
   * Cabecalhos das colunas apos o nome, no lugar de J V D PF PS SP P. Cada
   * linha entrega `cells` na mesma ordem. Serve ao ranking (Torneios Titulos
   * 1o 2o 3o Pts) e a tabela da pelada (R V G A P).
   */
  columns?: string[];
  /** As posicoes 1..n aparecem com o numero em laranja (quem classifica). */
  qualifyCount?: number;
  /** Largura de tela cheia: mais respiro e texto maior (ranking no web). */
  wide?: boolean;
  onRowClick?: (key: string) => void;
  className?: string;
}

const signed = (n: number) => (n > 0 ? `+${n}` : String(n));

const DEFAULT_COLUMNS = ['J', 'V', 'D', 'PF', 'PS', 'SP', 'P'];

/**
 * Classificacao do torneio: # Nome J V D PF PS SP P, todas as colunas sem
 * rolagem lateral (em 360px o nome ocupa o que sobra e vira reticencias).
 * SP e o saldo de pontos (PF menos PS), com sinal. Com `columns` e `cells`
 * vira a tabela de ranking, com a linha "voce" em ciano.
 */
export function StandingsTable({ rows, nameLabel = 'Dupla', columns, qualifyCount = 0, wide, onRowClick, className }: StandingsTableProps) {
  const heads = columns ?? DEFAULT_COLUMNS;
  const head = cn(
    'pb-2 text-right font-mono font-medium tracking-[0.04em] text-subtle-foreground',
    wide ? 'pl-3 text-[11px]' : 'pl-1 text-[9.5px]',
  );
  const cell = cn(
    'py-[9px] text-right font-mono text-muted-foreground whitespace-nowrap',
    wide ? 'pl-3 text-[12.5px]' : 'pl-1 text-[11.5px]',
  );
  return (
    <div className={cn('rounded-2xl bg-surface-1', wide ? 'px-5 pb-2.5 pt-4' : 'p-3', className)}>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th scope="col" className={cn(head, 'w-[18px] pl-0 text-left')}>#</th>
            <th scope="col" className={cn(head, 'text-left')}>{nameLabel}</th>
            {heads.map((h) => (
              <th key={h} scope="col" className={head}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => {
            const pos = i + 1;
            const qualifies = pos <= qualifyCount;
            const clickable = !!onRowClick;
            const values: Array<string | number> = columns
              ? (r.cells ?? [])
              : [
                  r.played ?? 0,
                  r.wins ?? 0,
                  r.losses ?? 0,
                  r.pointsFor ?? 0,
                  r.pointsAgainst ?? 0,
                  signed((r.pointsFor ?? 0) - (r.pointsAgainst ?? 0)),
                  r.points ?? 0,
                ];
            return (
              <tr
                key={r.key}
                onClick={clickable ? () => onRowClick!(r.key) : undefined}
                className={cn(
                  'border-t border-border/60',
                  r.selected && 'bg-primary/[0.08]',
                  r.me && 'bg-you/[0.08]',
                  clickable && 'cursor-pointer transition-colors hover:bg-surface-3',
                )}
              >
                <td className={cn(cell, 'w-[18px] pl-0 text-left', qualifies && 'font-bold text-primary')}>{pos}</td>
                <td className={cn('max-w-0 w-full py-[9px] text-left', wide ? 'pl-3' : 'pl-1')}>
                  <span className={cn('block truncate font-semibold', wide ? 'text-[13.5px]' : 'text-[12.5px]', r.me ? 'text-you' : 'text-foreground')}>{r.name}</span>
                  {r.note && <span className="block truncate text-[10.5px] text-subtle-foreground">{r.note}</span>}
                </td>
                {heads.map((h, k) => {
                  const v = values[k];
                  const last = k === heads.length - 1;
                  return (
                    <td
                      key={h}
                      className={cn(cell, last && 'font-bold text-foreground', last && typeof v === 'number' && v < 0 && 'text-destructive')}
                    >
                      {v}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
