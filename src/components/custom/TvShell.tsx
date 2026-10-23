'use client';

import * as React from 'react';
import { cn } from '../../lib/utils';
import { Logo } from '../brand/Logo';

/** Tamanho de referência do desenho do telão. Em 1920x1080 a escala é 1,5. */
const REF_W = 1280;
const REF_H = 720;

export interface TvShellProps {
  /** Nome do evento ou do Ferino, ao lado do logo. */
  title: string;
  /** Rótulo mono ao lado do título: "Masculino A", "rodada de 23/10". */
  label?: string;
  /** Canto direito do cabeçalho: LiveTag, cronômetro, "VOTAÇÃO ABERTA". */
  status?: React.ReactNode;
  /** Área principal (o placar). */
  children: React.ReactNode;
  /** Coluna lateral (próximos jogos, artilharia, QR). Sem ela o principal ocupa tudo. */
  aside?: React.ReactNode;
  /** Largura da coluna lateral em px de referência. */
  asideWidth?: number;
  footerStart?: React.ReactNode;
  footerEnd?: React.ReactNode;
  /**
   * true (padrão): ocupa a tela toda e escala o desenho para caber em qualquer
   * TV. false: tamanho de referência fixo (stories e testes).
   */
  fit?: boolean;
  className?: string;
}

/**
 * Casca do telão: cabeçalho com logo, área do placar, coluna lateral e rodapé,
 * desenhada em 1280x720 e escalada para 1920x1080 (ou o que a TV tiver).
 * Pensada para ler de 6 metros: sem rolagem, sem interação.
 */
export function TvShell({ title, label, status, children, aside, asideWidth = 360, footerStart, footerEnd, fit = true, className }: TvShellProps) {
  const [scale, setScale] = React.useState(1);
  React.useEffect(() => {
    if (!fit) return;
    const update = () => setScale(Math.min(window.innerWidth / REF_W, window.innerHeight / REF_H));
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, [fit]);

  const canvas = (
    <div
      className={cn('relative flex flex-col overflow-hidden bg-background text-foreground', !fit && 'rounded-[10px] ring-1 ring-border', className)}
      style={{ width: REF_W, height: REF_H }}
    >
      <header className="flex h-[76px] shrink-0 items-center justify-between border-b border-border px-10">
        <div className="flex items-center gap-4">
          <Logo variant="horizontal-dark" product="ferinos" height={30} aria-label="suaArena Ferinos" />
          <span className="h-7 w-px bg-border" aria-hidden="true" />
          <span className="text-[22px] font-bold">{title}</span>
          {label && <span className="font-mono text-sm uppercase tracking-[0.16em] text-subtle-foreground">{label}</span>}
        </div>
        {status}
      </header>
      <div
        className="grid min-h-0 flex-1 gap-7 px-10 py-7"
        style={{ gridTemplateColumns: aside ? `minmax(0,1fr) ${asideWidth}px` : 'minmax(0,1fr)' }}
      >
        <div className="min-w-0">{children}</div>
        {aside && <div className="flex min-w-0 flex-col gap-5">{aside}</div>}
      </div>
      {(footerStart || footerEnd) && (
        <footer className="flex h-[54px] shrink-0 items-center justify-between bg-chrome px-10 font-mono text-sm tracking-[0.08em] text-subtle-foreground">
          <span>{footerStart}</span>
          <span>{footerEnd}</span>
        </footer>
      )}
    </div>
  );

  if (!fit) return canvas;
  return (
    <div className="fixed inset-0 flex items-center justify-center overflow-hidden bg-background">
      <div style={{ width: REF_W * scale, height: REF_H * scale }}>
        <div style={{ transform: `scale(${scale})`, transformOrigin: 'top left', width: REF_W, height: REF_H }}>{canvas}</div>
      </div>
    </div>
  );
}

export interface TvPanelProps {
  /** Rótulo mono em caixa alta: "Próximos", "Artilharia da noite". */
  label?: string;
  tone?: 'default' | 'live' | 'vote';
  children: React.ReactNode;
  className?: string;
}

/** Painel do telão: fundo de superfície, rótulo mono e conteúdo. Vive na coluna lateral ou no principal. */
export function TvPanel({ label, tone = 'default', children, className }: TvPanelProps) {
  return (
    <section
      className={cn(
        'flex flex-col gap-3.5 rounded-[22px] bg-surface-1 px-6 py-[22px]',
        tone === 'live' && 'border border-primary/35',
        tone === 'vote' && 'border border-you/40',
        className,
      )}
    >
      {label && (
        <span className={cn('font-mono text-sm uppercase tracking-[0.16em]', tone === 'live' ? 'text-primary' : tone === 'vote' ? 'text-you' : 'text-subtle-foreground')}>
          {label}
        </span>
      )}
      {children}
    </section>
  );
}

export interface TvRowProps {
  children: React.ReactNode;
  /** Valor ou etiqueta à direita. */
  value?: React.ReactNode;
  className?: string;
}

/** Linha de lista do telão: nome grande à esquerda, valor à direita, filete entre linhas. */
export function TvRow({ children, value, className }: TvRowProps) {
  return (
    <div className={cn('flex items-center justify-between gap-3 border-t border-border/60 py-2 text-[21px] font-semibold first:border-t-0', className)}>
      <span className="min-w-0 truncate">{children}</span>
      {value != null && <span className="shrink-0 font-mono text-2xl font-bold">{value}</span>}
    </div>
  );
}

export interface TvScoreSide {
  name: string;
  score: number | string;
  /** Linha pequena embaixo do nome: quem marcou, contexto. */
  detail?: string;
  /** Cor do time (dado do Ferino). */
  color?: string | null;
}

export interface TvScoreProps {
  a: TvScoreSide;
  b: TvScoreSide;
  /** Rótulo mono do topo: "Semifinal 1 · set único até 21". */
  label?: string;
  /**
   * stacked: um time por linha, placar à direita (torneio). sides: times nas
   * pontas e placar no meio (rodada de futebol).
   */
  layout?: 'stacked' | 'sides';
  /** Linha de rodapé do placar: "Próximo: vencedor x Azul". */
  footer?: React.ReactNode;
  className?: string;
}

function scoreTone(mine: number | string, other: number | string) {
  const m = Number(mine), o = Number(other);
  return m > o ? 'text-primary' : m < o ? 'text-muted-foreground' : 'text-foreground';
}

/** Placar gigante do telão: números de 190px no desenho (legíveis da arquibancada); quem lidera em laranja. */
export function TvScore({ a, b, label, layout = 'stacked', footer, className }: TvScoreProps) {
  const digits = 'font-display text-[190px] font-extrabold leading-[0.85] tracking-[-0.05em] tabular-nums';
  const swatch = (c?: string | null) =>
    c ? <span aria-hidden="true" className="h-6 w-6 shrink-0 rounded-md ring-2 ring-inset ring-border" style={{ background: c }} /> : null;
  return (
    <section
      className={cn('flex h-full flex-col justify-center gap-6 rounded-[22px] border border-primary/35 bg-surface-1 px-10 py-8', className)}
      aria-label={`${a.name} ${a.score} a ${b.score} ${b.name}`}
    >
      {label && <span className="font-mono text-sm uppercase tracking-[0.16em] text-primary">{label}</span>}
      {layout === 'stacked' ? (
        <>
          <div className="flex items-center justify-between gap-6">
            <span className="flex min-w-0 flex-col gap-1.5">
              <span className="truncate text-[40px] font-extrabold leading-[1.05] tracking-[-0.02em]">{a.name}</span>
              {a.detail && <span className="text-xl text-muted-foreground">{a.detail}</span>}
            </span>
            <span className={cn(digits, scoreTone(a.score, b.score))}>{a.score}</span>
          </div>
          <div className="h-px bg-border" />
          <div className="flex items-center justify-between gap-6">
            <span className="flex min-w-0 flex-col gap-1.5">
              <span className="truncate text-[40px] font-extrabold leading-[1.05] tracking-[-0.02em] text-muted-foreground">{b.name}</span>
              {b.detail && <span className="text-xl text-muted-foreground">{b.detail}</span>}
            </span>
            <span className={cn(digits, scoreTone(b.score, a.score))}>{b.score}</span>
          </div>
        </>
      ) : (
        <div className="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-[30px]">
          <span className="flex min-w-0 flex-col gap-2.5">
            <span className="flex items-center gap-3.5 text-[40px] font-extrabold leading-[1.05] tracking-[-0.02em]">{swatch(a.color)}<span className="truncate">{a.name}</span></span>
            {a.detail && <span className="text-xl text-muted-foreground">{a.detail}</span>}
          </span>
          <span className="flex items-center gap-[26px]">
            <span className={cn(digits, scoreTone(a.score, b.score))}>{a.score}</span>
            <span className="text-[60px] font-light text-subtle-foreground" aria-hidden="true">-</span>
            <span className={cn(digits, scoreTone(b.score, a.score))}>{b.score}</span>
          </span>
          <span className="flex min-w-0 flex-col items-end gap-2.5">
            <span className="flex items-center gap-3.5 text-[40px] font-extrabold leading-[1.05] tracking-[-0.02em]"><span className="truncate">{b.name}</span>{swatch(b.color)}</span>
            {b.detail && <span className="text-xl text-muted-foreground">{b.detail}</span>}
          </span>
        </div>
      )}
      {footer && (
        <>
          <div className="h-px bg-border" />
          <div className="text-[22px] text-muted-foreground">{footer}</div>
        </>
      )}
    </section>
  );
}
