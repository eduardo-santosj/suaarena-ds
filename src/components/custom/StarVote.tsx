'use client';

import { Star } from 'lucide-react';
import { cn } from '../../lib/utils';

export type StarVoteTone = 'star' | 'vote';
export type StarVoteSize = 'sm' | 'md' | 'lg';

export interface StarVoteProps {
  /** Nota atual, de 0 a `count`. 0 = nenhuma estrela. */
  value: number;
  /** Chamado ao tocar numa estrela. Tocar na nota atual zera. Sem ele, so leitura. */
  onChange?: (value: number) => void;
  /** Forca so leitura mesmo com onChange. */
  readOnly?: boolean;
  /** Quantidade de estrelas. */
  count?: number;
  size?: StarVoteSize;
  /** star = amarelo (estrela e resultado, o padrao dos desenhos); vote = ciano (janela de votacao). */
  tone?: StarVoteTone;
  className?: string;
  /** Rotulo de acessibilidade do grupo ("Nota para o Rafa"). */
  'aria-label'?: string;
}

const SIZE: Record<StarVoteSize, string> = {
  sm: 'h-4 w-4',
  md: 'h-[18px] w-[18px]',
  lg: 'h-7 w-7',
};

const ON: Record<StarVoteTone, string> = {
  star: 'fill-star text-star',
  vote: 'fill-you text-you',
};

/**
 * Estrelas de voto de 1 a 5. Amarelo (token star) no resultado, ciano (token
 * you) enquanto a votacao esta aberta. A estrela apagada e o trilho do tema.
 */
export function StarVote({
  value, onChange, readOnly, count = 5, size = 'md', tone = 'star', className, 'aria-label': ariaLabel,
}: StarVoteProps) {
  const interactive = !!onChange && !readOnly;
  return (
    <div
      role={interactive ? 'radiogroup' : 'img'}
      aria-label={ariaLabel ?? `Nota ${value} de ${count}`}
      className={cn('inline-flex items-center gap-1', className)}
    >
      {Array.from({ length: count }, (_, i) => {
        const n = i + 1;
        const active = n <= value;
        const icon = (
          <Star
            className={cn(SIZE[size], active ? ON[tone] : 'fill-muted-foreground/25 text-muted-foreground/25')}
            aria-hidden="true"
          />
        );
        return interactive ? (
          <button
            key={n}
            type="button"
            role="radio"
            aria-checked={n === value}
            aria-label={`${n} ${n === 1 ? 'estrela' : 'estrelas'}`}
            onClick={() => onChange!(n === value ? 0 : n)}
            className="rounded-sm p-0.5 transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring motion-reduce:transition-none motion-reduce:hover:scale-100"
          >
            {icon}
          </button>
        ) : (
          <span key={n} className="p-0.5">{icon}</span>
        );
      })}
    </div>
  );
}
