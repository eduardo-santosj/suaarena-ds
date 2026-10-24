'use client';

import * as React from 'react';
import { ArrowDownRight, ArrowUpRight, ChevronLeft, ChevronRight, Minus } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Button } from '../ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';

// ---------------------------------------------------------------------------
// Series: cor do grafico pelo que a serie e (origem, estado), nunca pela posicao.
// Ordem fixa: laranja, ciano, violeta. Estados usam success / destructive / star.
// ---------------------------------------------------------------------------

export type SeriesTone = 'primary' | 'you' | 'series-3' | 'success' | 'destructive' | 'star';

const SERIES_STROKE: Record<SeriesTone, string> = {
  primary: 'stroke-primary',
  you: 'stroke-you',
  'series-3': 'stroke-series-3',
  success: 'stroke-success',
  destructive: 'stroke-destructive',
  star: 'stroke-star',
};
const SERIES_FILL: Record<SeriesTone, string> = {
  primary: 'fill-primary',
  you: 'fill-you',
  'series-3': 'fill-series-3',
  success: 'fill-success',
  destructive: 'fill-destructive',
  star: 'fill-star',
};
const SERIES_BG: Record<SeriesTone, string> = {
  primary: 'bg-primary',
  you: 'bg-you',
  'series-3': 'bg-series-3',
  success: 'bg-success',
  destructive: 'bg-destructive',
  star: 'bg-star',
};

const MONO_LABEL = 'font-mono text-[10.5px] uppercase tracking-[0.14em] text-subtle-foreground';

function Legend({ items, className }: { items: Array<{ key: string; label: string; tone: SeriesTone; value?: string }>; className?: string }) {
  return (
    <ul className={cn('flex flex-wrap gap-x-4 gap-y-1.5', className)}>
      {items.map((i) => (
        <li key={i.key} className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <span aria-hidden className={cn('h-2.5 w-2.5 rounded-[3px]', SERIES_BG[i.tone])} />
          <span>{i.label}</span>
          {i.value != null && <b className="font-display font-bold text-foreground">{i.value}</b>}
        </li>
      ))}
    </ul>
  );
}

// ---------------------------------------------------------------------------
// KpiTile
// ---------------------------------------------------------------------------

export interface KpiTileProps {
  label: string;
  /** Numero ja formatado: "R$ 1.980", "128". */
  value: string | number;
  /** Variacao em pontos percentuais vs periodo anterior. Positivo sobe, negativo desce. */
  delta?: number;
  /** Texto ao lado da variacao: "vs set". */
  deltaLabel?: string;
  /** Subir e ruim (cancelamentos, atrasos): inverte o verde e o vermelho. */
  invertDelta?: boolean;
  /** Linha pequena sob o numero. */
  hint?: string;
  /** Laranja: o numero que importa. */
  accent?: boolean;
  className?: string;
}

/**
 * Numero grande com rotulo mono e variacao (seta + percentual + cor). Um tile
 * por indicador no topo do painel; use varios numa grade de 2 a 4 colunas.
 */
export function KpiTile({ label, value, delta, deltaLabel, invertDelta, hint, accent, className }: KpiTileProps) {
  const dir = delta == null || delta === 0 ? 'flat' : delta > 0 ? 'up' : 'down';
  const good = dir === 'flat' ? null : (dir === 'up') !== !!invertDelta;
  const Icon = dir === 'up' ? ArrowUpRight : dir === 'down' ? ArrowDownRight : Minus;
  return (
    <div className={cn('flex min-w-0 flex-col gap-1.5 rounded-2xl bg-surface-1 p-4', className)}>
      <span className={cn(MONO_LABEL, 'truncate')}>{label}</span>
      <b
        className={cn(
          'font-display text-[28px] font-extrabold leading-[1.1] tracking-[-0.02em] truncate',
          accent ? 'text-primary' : 'text-foreground',
        )}
      >
        {value}
      </b>
      {(delta != null || hint) && (
        <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs">
          {delta != null && (
            <span
              className={cn(
                'inline-flex items-center gap-0.5 font-semibold',
                good == null ? 'text-muted-foreground' : good ? 'text-success' : 'text-destructive',
              )}
            >
              <Icon aria-hidden className="h-3.5 w-3.5" />
              {delta > 0 ? '+' : ''}{String(delta).replace('.', ',')}%
              <span className="sr-only">{dir === 'up' ? ', subiu' : dir === 'down' ? ', caiu' : ', estavel'}</span>
            </span>
          )}
          {deltaLabel && <span className="text-subtle-foreground">{deltaLabel}</span>}
          {hint && <span className="text-subtle-foreground">{hint}</span>}
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// LineAreaChart
// ---------------------------------------------------------------------------

export interface LineAreaSeries {
  key: string;
  label: string;
  tone?: SeriesTone;
  /** Um valor por rotulo do eixo X. */
  values: number[];
}

export interface LineAreaChartProps {
  /** Rotulos do eixo X, um por ponto ("mai", "jun"). */
  labels: string[];
  series: LineAreaSeries[];
  /** Preenchimento suave sob a linha. Ligado por padrao. */
  area?: boolean;
  /** Altura da area do grafico em px. */
  height?: number;
  /** Formata o valor no tooltip, no eixo e na tabela: moeda, inteiro. */
  formatValue?: (n: number) => string;
  /** Titulo curto lido por leitor de tela. */
  'aria-label'?: string;
  className?: string;
}

const DEFAULT_TONES: SeriesTone[] = ['primary', 'you', 'series-3'];
const W = 600;
const PAD_Y = 10;

/**
 * Grafico de linha/area por periodo, uma linha por serie (origem). Linhas de
 * 2px, grade discreta, area com fundo suave. Passe o ponteiro ou o foco pelo
 * grafico para ver o valor de cada serie no mes. Duas ou mais series trazem
 * legenda; os numeros tambem ficam numa tabela so para leitor de tela.
 */
export function LineAreaChart({
  labels, series, area = true, height = 200, formatValue = (n) => String(n), className, 'aria-label': ariaLabel,
}: LineAreaChartProps) {
  const [hover, setHover] = React.useState<number | null>(null);
  const n = labels.length;
  const max = Math.max(1, ...series.flatMap((s) => s.values.map((v) => Math.max(0, v))));
  const H = (W * height) / 600;
  const x = (i: number) => (n <= 1 ? W / 2 : (i / (n - 1)) * W);
  const y = (v: number) => PAD_Y + (1 - Math.max(0, v) / max) * (H - PAD_Y * 2);
  const tones = series.map((s, i) => s.tone ?? DEFAULT_TONES[i % DEFAULT_TONES.length]);

  const pick = (clientX: number, el: HTMLElement) => {
    const r = el.getBoundingClientRect();
    if (r.width === 0 || n === 0) return;
    const ratio = Math.min(1, Math.max(0, (clientX - r.left) / r.width));
    setHover(n <= 1 ? 0 : Math.round(ratio * (n - 1)));
  };

  const grid = [0, 0.5, 1];
  const hoverPct = hover == null ? 0 : n <= 1 ? 50 : (hover / (n - 1)) * 100;

  return (
    <div className={cn('flex flex-col gap-3', className)}>
      <div
        className="relative"
        style={{ height }}
        onPointerMove={(e) => pick(e.clientX, e.currentTarget)}
        onPointerLeave={() => setHover(null)}
      >
        <svg
          viewBox={`0 0 ${W} ${H}`}
          preserveAspectRatio="none"
          role="img"
          aria-label={ariaLabel ?? 'Grafico de linha por periodo'}
          className="absolute inset-0 h-full w-full overflow-visible"
        >
          {grid.map((g) => (
            <line
              key={g}
              x1={0} x2={W}
              y1={PAD_Y + g * (H - PAD_Y * 2)} y2={PAD_Y + g * (H - PAD_Y * 2)}
              className="stroke-border"
              strokeWidth={1}
              vectorEffect="non-scaling-stroke"
            />
          ))}
          {series.map((s, si) => {
            if (s.values.length === 0) return null;
            const pts = s.values.map((v, i) => `${x(i)},${y(v)}`).join(' ');
            return (
              <g key={s.key}>
                {area && s.values.length > 1 && (
                  <polygon
                    points={`${x(0)},${H - PAD_Y} ${pts} ${x(s.values.length - 1)},${H - PAD_Y}`}
                    className={SERIES_FILL[tones[si]]}
                    fillOpacity={0.12}
                  />
                )}
                <polyline
                  points={pts}
                  fill="none"
                  className={SERIES_STROKE[tones[si]]}
                  strokeWidth={2}
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                />
              </g>
            );
          })}
          {hover != null && (
            <line
              x1={x(hover)} x2={x(hover)} y1={0} y2={H}
              className="stroke-subtle-foreground"
              strokeWidth={1}
              strokeDasharray="3 3"
              vectorEffect="non-scaling-stroke"
            />
          )}
        </svg>

        {/* Marcadores em HTML para nao deformar com o preserveAspectRatio. */}
        {hover != null &&
          series.map((s, si) => (
            s.values[hover] == null ? null : (
              <span
                key={s.key}
                aria-hidden
                className={cn('absolute h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full ring-2 ring-surface-1', SERIES_BG[tones[si]])}
                style={{ left: `${hoverPct}%`, top: `${(y(s.values[hover]) / H) * 100}%` }}
              />
            )
          ))}

        <span aria-hidden className={cn(MONO_LABEL, 'pointer-events-none absolute left-0 top-0 -translate-y-1/2 bg-surface-1 pr-1')}>
          {formatValue(max)}
        </span>

        {hover != null && (
          <div
            role="status"
            className="pointer-events-none absolute top-0 z-10 min-w-[120px] -translate-x-1/2 rounded-xl bg-popover px-3 py-2 text-xs text-popover-foreground shadow-lg"
            style={{ left: `clamp(60px, ${hoverPct}%, calc(100% - 60px))` }}
          >
            <div className={cn(MONO_LABEL, 'mb-1')}>{labels[hover]}</div>
            {series.map((s, si) => (
              <div key={s.key} className="flex items-center justify-between gap-3">
                <span className="flex items-center gap-1.5 text-muted-foreground">
                  <span aria-hidden className={cn('h-2 w-2 rounded-full', SERIES_BG[tones[si]])} />
                  {s.label}
                </span>
                <b className="font-display font-bold text-foreground">{formatValue(s.values[hover] ?? 0)}</b>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex justify-between">
        {labels.map((l) => (
          <span key={l} className="font-mono text-[9.5px] uppercase text-subtle-foreground">{l}</span>
        ))}
      </div>

      {series.length > 1 && <Legend items={series.map((s, si) => ({ key: s.key, label: s.label, tone: tones[si] }))} />}

      <table className="sr-only">
        <caption>{ariaLabel ?? 'Dados do grafico'}</caption>
        <thead>
          <tr>
            <th scope="col">Periodo</th>
            {series.map((s) => <th key={s.key} scope="col">{s.label}</th>)}
          </tr>
        </thead>
        <tbody>
          {labels.map((l, i) => (
            <tr key={l}>
              <th scope="row">{l}</th>
              {series.map((s) => <td key={s.key}>{formatValue(s.values[i] ?? 0)}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ---------------------------------------------------------------------------
// DonutChart
// ---------------------------------------------------------------------------

export interface DonutSlice {
  key: string;
  label: string;
  value: number;
  tone?: SeriesTone;
}

export interface DonutChartProps {
  slices: DonutSlice[];
  /** Diametro em px. */
  size?: number;
  /** Numero grande no centro: o total. */
  centerValue?: string | number;
  /** Rotulo mono sob o numero do centro. */
  centerLabel?: string;
  /** Formata o valor de cada fatia na legenda. */
  formatValue?: (n: number) => string;
  'aria-label'?: string;
  className?: string;
}

const R = 40;
const CIRC = 2 * Math.PI * R;

/**
 * Rosca de proporcao (Premium por origem). Fatias de traco fino com folga de
 * 2px entre elas, total no centro e legenda com valor e percentual, para a
 * cor nunca ser a unica pista.
 */
export function DonutChart({
  slices, size = 160, centerValue, centerLabel, formatValue = (n) => String(n), className, 'aria-label': ariaLabel,
}: DonutChartProps) {
  const total = slices.reduce((a, s) => a + Math.max(0, s.value), 0);
  const tones = slices.map((s, i) => s.tone ?? DEFAULT_TONES[i % DEFAULT_TONES.length]);
  const GAP = total > 0 && slices.filter((s) => s.value > 0).length > 1 ? 2 : 0;
  let offset = 0;
  return (
    <div className={cn('flex flex-wrap items-center gap-x-6 gap-y-4', className)}>
      <div className="relative shrink-0" style={{ width: size, height: size }}>
        <svg
          viewBox="0 0 100 100"
          role="img"
          aria-label={ariaLabel ?? slices.map((s) => `${s.label} ${formatValue(s.value)}`).join(', ')}
          className="h-full w-full -rotate-90"
        >
          <circle cx={50} cy={50} r={R} fill="none" className="stroke-surface-3" strokeWidth={12} />
          {total > 0 &&
            slices.map((s, i) => {
              const len = (Math.max(0, s.value) / total) * CIRC;
              const dash = Math.max(0, len - GAP);
              const el = (
                <circle
                  key={s.key}
                  cx={50} cy={50} r={R}
                  fill="none"
                  className={SERIES_STROKE[tones[i]]}
                  strokeWidth={12}
                  strokeDasharray={`${dash} ${CIRC - dash}`}
                  strokeDashoffset={-offset}
                />
              );
              offset += len;
              return len > 0 ? el : null;
            })}
        </svg>
        {(centerValue != null || centerLabel) && (
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            {centerValue != null && (
              <b className="font-display text-2xl font-extrabold leading-none tracking-[-0.02em] text-foreground">{centerValue}</b>
            )}
            {centerLabel && <span className={cn(MONO_LABEL, 'mt-1')}>{centerLabel}</span>}
          </div>
        )}
      </div>
      <ul className="flex min-w-[140px] flex-1 flex-col gap-2">
        {slices.map((s, i) => (
          <li key={s.key} className="flex items-center gap-2 text-sm">
            <span aria-hidden className={cn('h-2.5 w-2.5 shrink-0 rounded-[3px]', SERIES_BG[tones[i]])} />
            <span className="flex-1 truncate text-muted-foreground">{s.label}</span>
            <b className="font-display font-bold text-foreground">{formatValue(s.value)}</b>
            <span className="w-10 text-right font-mono text-[11px] text-subtle-foreground">
              {total > 0 ? Math.round((Math.max(0, s.value) / total) * 100) : 0}%
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ---------------------------------------------------------------------------
// DataTable
// ---------------------------------------------------------------------------

export interface DataTableColumn<T> {
  key: string;
  header: string;
  /** Celula da linha. Sem isso usa `row[key]`. */
  render?: (row: T) => React.ReactNode;
  align?: 'left' | 'right';
  /** Esconde a coluna abaixo de 640px (a tabela segue sem rolagem lateral). */
  hideOnMobile?: boolean;
}

export interface DataTableProps<T> {
  columns: DataTableColumn<T>[];
  rows: T[];
  rowKey: (row: T) => string;
  /** Faixa de filtros acima da tabela (PillTabs, selects). */
  filters?: React.ReactNode;
  /** Pagina atual, de 1 a N. Com `total` liga a paginacao. */
  page?: number;
  pageSize?: number;
  /** Total de linhas no servidor (todas as paginas). */
  total?: number;
  onPageChange?: (page: number) => void;
  loading?: boolean;
  emptyText?: string;
  caption?: string;
  className?: string;
}

/**
 * Tabela de dados do painel: filtros no topo, linhas com hairline, paginacao
 * "1-10 de 52" com anterior e proxima. Controlada: quem usa guarda a pagina e
 * os filtros e entrega so as linhas da pagina.
 */
export function DataTable<T>({
  columns, rows, rowKey, filters, page = 1, pageSize = 10, total, onPageChange, loading,
  emptyText = 'Nada por aqui ainda.', caption, className,
}: DataTableProps<T>) {
  const count = total ?? rows.length;
  const pages = Math.max(1, Math.ceil(count / pageSize));
  const from = count === 0 ? 0 : (page - 1) * pageSize + 1;
  const to = Math.min(count, (page - 1) * pageSize + rows.length);
  const cell = (c: DataTableColumn<T>, row: T) =>
    c.render ? c.render(row) : String((row as Record<string, unknown>)[c.key] ?? '');
  return (
    <div className={cn('flex flex-col gap-3', className)}>
      {filters && <div className="flex flex-wrap items-center gap-2">{filters}</div>}
      <div className="rounded-2xl bg-surface-1 px-2 py-1" aria-busy={loading || undefined}>
        <Table>
          {caption && <caption className="sr-only">{caption}</caption>}
          <TableHeader>
            <TableRow className="border-border/60 hover:bg-transparent">
              {columns.map((c) => (
                <TableHead
                  key={c.key}
                  className={cn(
                    'h-9 px-3 font-mono text-[10.5px] font-normal uppercase tracking-[0.14em] text-subtle-foreground',
                    c.align === 'right' && 'text-right',
                    c.hideOnMobile && 'hidden sm:table-cell',
                  )}
                >
                  {c.header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.length === 0 ? (
              <TableRow className="hover:bg-transparent">
                <TableCell colSpan={columns.length} className="py-8 text-center text-sm text-muted-foreground">
                  {loading ? 'Carregando...' : emptyText}
                </TableCell>
              </TableRow>
            ) : (
              rows.map((row) => (
                <TableRow key={rowKey(row)} className={cn('border-border/60', loading && 'opacity-60')}>
                  {columns.map((c) => (
                    <TableCell
                      key={c.key}
                      className={cn(
                        'px-3 py-2.5 text-sm text-foreground',
                        c.align === 'right' && 'text-right',
                        c.hideOnMobile && 'hidden sm:table-cell',
                      )}
                    >
                      {cell(c, row)}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      {onPageChange && count > 0 && (
        <div className="flex items-center justify-between gap-3">
          <span className="font-mono text-[11px] text-subtle-foreground">
            {from}-{to} de {count}
          </span>
          <div className="flex items-center gap-2">
            <Button
              variant="outline" size="sm" aria-label="Pagina anterior"
              disabled={page <= 1 || loading}
              onClick={() => onPageChange(page - 1)}
            >
              <ChevronLeft aria-hidden className="h-4 w-4" />
              Anterior
            </Button>
            <span className="font-mono text-[11px] text-muted-foreground">{page}/{pages}</span>
            <Button
              variant="outline" size="sm" aria-label="Proxima pagina"
              disabled={page >= pages || loading}
              onClick={() => onPageChange(page + 1)}
            >
              Proxima
              <ChevronRight aria-hidden className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
