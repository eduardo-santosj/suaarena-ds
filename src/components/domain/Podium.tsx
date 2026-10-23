'use client';

import { cn } from '../../lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

export interface PodiumEntry {
  name: string;
  points: number;
  photoUrl?: string | null;
  onClick?: () => void;
}

export interface PodiumProps {
  /** Em ordem de colocacao: [1º, 2º, 3º]. Menos de tres deixa o degrau vazio. */
  entries: PodiumEntry[];
  className?: string;
}

function initials(name: string) {
  return name.trim().split(/\s+/).slice(0, 2).map((p) => p[0]?.toUpperCase() ?? '').join('');
}

/**
 * Podio de tres degraus (2º · 1º · 3º). O 1º fica no meio, mais alto, em
 * laranja. Mostra a disputa, nao so o vencedor.
 */
export function Podium({ entries, className }: PodiumProps) {
  const [first, second, third] = entries;
  if (!first) return null;
  const order = [
    { e: second, place: 2, h: 70 },
    { e: first,  place: 1, h: 96, big: true },
    { e: third,  place: 3, h: 54 },
  ];
  return (
    <div className={cn('grid grid-cols-[1fr_1.15fr_1fr] gap-2 items-end', className)}>
      {order.map(({ e, place, h, big }) => {
        const Tag = e?.onClick ? 'button' : 'div';
        return (
          <Tag
            key={place}
            {...(e?.onClick ? { type: 'button' as const, onClick: e.onClick } : {})}
            className="flex flex-col items-center gap-[5px] min-w-0 text-foreground"
          >
            {e ? (
              <>
                <Avatar className={big ? 'w-[52px] h-[52px]' : 'w-10 h-10'}>
                  {e.photoUrl && <AvatarImage src={e.photoUrl} alt={e.name} className="object-cover" />}
                  <AvatarFallback
                    className={cn(
                      'font-bold',
                      big ? 'bg-primary text-primary-foreground text-sm' : 'bg-surface-3 text-muted-foreground text-[11px]',
                    )}
                  >
                    {initials(e.name)}
                  </AvatarFallback>
                </Avatar>
                <span className="text-[13px] font-semibold truncate max-w-full">{e.name}</span>
              </>
            ) : (
              <span aria-hidden className={big ? 'h-[76px]' : 'h-16'} />
            )}
            <div
              style={{ height: h }}
              className={cn(
                'w-full rounded-t-[14px] rounded-b-[4px] flex flex-col items-center pt-2.5 gap-0.5',
                big
                  ? 'bg-primary bg-linear-to-b from-white/15 to-black/10 text-primary-foreground'
                  : 'bg-surface-2',
              )}
            >
              <span className={cn('font-mono text-[11px] font-bold', big ? 'text-primary-foreground/70' : 'text-subtle-foreground')}>
                {place}º
              </span>
              {e && <span className="font-mono text-base font-bold">{e.points}</span>}
            </div>
          </Tag>
        );
      })}
    </div>
  );
}
