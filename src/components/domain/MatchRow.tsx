import { cn } from '../../lib/utils';
import { LiveTag } from '../custom/Stage';

export interface MatchRowSide {
  name: string;
  /** Placar. Nulo ou ausente mostra um hifen. */
  score?: number | null;
}

export type MatchRowTagTone = 'muted' | 'primary' | 'success' | 'live';

export interface MatchRowProps {
  a: MatchRowSide;
  b: MatchRowSide;
  winner?: 'a' | 'b' | null;
  /** Rotulo mono no canto esquerdo: "Semi 2", "Grupo A", "P · R2 · jogo 9". */
  label?: string;
  /** Etiqueta de estado no canto direito: "fim", "a jogar", "Final". */
  tag?: string;
  tagTone?: MatchRowTagTone;
  /** Linha extra pequena embaixo: "eliminados", "contra Vini e Gu". */
  note?: string;
  /** Apaga o nome do lado (ex.: eliminado). */
  dim?: 'a' | 'b';
  /** Borda ciano: o proximo jogo do atleta. */
  you?: boolean;
  onClick?: () => void;
  className?: string;
}

const TAG: Record<Exclude<MatchRowTagTone, 'live'>, string> = {
  muted: 'text-subtle-foreground',
  primary: 'text-primary',
  success: 'text-success',
};

/**
 * Linha de jogo do torneio: dois lados empilhados com o placar em mono a
 * direita (vencedor em laranja), rotulo e etiqueta de estado no cabecalho.
 */
export function MatchRow({ a, b, winner, label, tag, tagTone = 'muted', note, dim, you, onClick, className }: MatchRowProps) {
  const cls = cn(
    'flex w-full flex-col gap-1.5 rounded-[14px] bg-surface-1 px-3.5 py-2.5 text-left',
    you && 'border border-you/40',
    onClick && 'transition-colors hover:bg-surface-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
  );
  const side = (s: MatchRowSide, key: 'a' | 'b') => {
    const won = winner === key;
    const dimmed = dim === key;
    return (
      <div className="flex items-center justify-between gap-3">
        <span
          className={cn(
            'truncate text-[13.5px]',
            won ? 'font-semibold text-foreground' : 'font-medium text-muted-foreground',
            dimmed && 'opacity-50',
          )}
        >
          {s.name}
        </span>
        <span className={cn('shrink-0 font-mono text-sm font-bold', won ? 'text-primary' : 'text-muted-foreground')}>
          {s.score ?? '-'}
        </span>
      </div>
    );
  };
  const inner = (
    <>
      {(label || tag) && (
        <div className="flex items-center justify-between gap-3">
          <span className="truncate font-mono text-[10.5px] uppercase tracking-[0.1em] text-subtle-foreground">{label}</span>
          {tag &&
            (tagTone === 'live' ? (
              <LiveTag label={tag} className="h-5 px-2 text-[10px]" />
            ) : (
              <span className={cn('shrink-0 whitespace-nowrap font-mono text-[10.5px] uppercase tracking-[0.1em]', TAG[tagTone])}>{tag}</span>
            ))}
        </div>
      )}
      {side(a, 'a')}
      {side(b, 'b')}
      {note && <span className="text-[11.5px] text-subtle-foreground">{note}</span>}
    </>
  );
  return onClick ? (
    <button type="button" onClick={onClick} className={cn(cls, className)}>{inner}</button>
  ) : (
    <div className={cn(cls, className)}>{inner}</div>
  );
}
