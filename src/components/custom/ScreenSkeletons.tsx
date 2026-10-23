'use client';

import * as React from 'react';
import { cn } from '../../lib/utils';
import { SkeletonBlock } from './Skeleton';

export interface DelayedSkeletonProps {
  /** Atraso em ms antes de mostrar o esqueleto. Antes disso, nada, pra não piscar em conexão boa. */
  delay?: number;
  children: React.ReactNode;
}

/** Só mostra o esqueleto depois de `delay` ms (300 por padrão). */
export function DelayedSkeleton({ delay = 300, children }: DelayedSkeletonProps) {
  const [show, setShow] = React.useState(delay <= 0);
  React.useEffect(() => {
    if (delay <= 0) return;
    const t = setTimeout(() => setShow(true), delay);
    return () => clearTimeout(t);
  }, [delay]);
  return show ? <>{children}</> : null;
}

/** Esqueleto do palco de uma tela de evento: rótulo, dois times com placar e o botão. */
export function StageSkeleton({ className }: { className?: string }) {
  return (
    <div aria-hidden="true" className={cn('flex flex-col gap-3.5 rounded-[18px] border border-border/60 bg-stage p-4', className)}>
      <div className="flex items-center justify-between"><SkeletonBlock width={150} height={10} /><SkeletonBlock width={70} height={22} radius={11} /></div>
      <div className="flex items-center justify-between"><SkeletonBlock width={130} height={14} /><SkeletonBlock width={30} height={24} /></div>
      <div className="flex items-center justify-between"><SkeletonBlock width={110} height={14} /><SkeletonBlock width={30} height={24} /></div>
      <SkeletonBlock height={44} radius={12} />
    </div>
  );
}

/** Esqueleto de uma linha com bloco de data (DateRow). */
export function DateRowSkeleton({ className }: { className?: string }) {
  return (
    <div aria-hidden="true" className={cn('flex items-stretch overflow-hidden rounded-[14px] bg-surface-1', className)}>
      <div className="flex w-[52px] shrink-0 flex-col items-center justify-center gap-[5px] border-r border-border py-[9px]">
        <SkeletonBlock width={22} height={7} />
        <SkeletonBlock width={26} height={18} />
      </div>
      <div className="flex flex-1 flex-col justify-center gap-2 px-3 py-2.5">
        <SkeletonBlock width="60%" height={12} />
        <SkeletonBlock width="80%" height={9} />
      </div>
    </div>
  );
}

/** Esqueleto de uma linha simples de lista (ranking, atletas): círculo, nome e valor. */
export function ListRowSkeleton({ className }: { className?: string }) {
  return (
    <div aria-hidden="true" className={cn('flex items-center justify-between gap-3 rounded-[14px] bg-surface-1 px-3.5 py-3', className)}>
      <div className="flex items-center gap-2.5"><SkeletonBlock width={30} height={30} radius={15} /><SkeletonBlock width={140} height={10} /></div>
      <SkeletonBlock width={24} height={10} />
    </div>
  );
}

export interface ScreenSkeletonProps {
  /** events: palco e linhas com data (Torneios, Rodadas). list: só linhas (Ranking, Atletas). */
  variant?: 'events' | 'list';
  /** Quantidade de linhas. */
  rows?: number;
  /** Atraso antes de aparecer. 0 mostra na hora. */
  delay?: number;
  className?: string;
}

/**
 * Esqueleto com a forma real da tela, no lugar do spinner. O título, as abas e
 * a pílula do Ferino ficam fora: só o conteúdo carrega.
 */
export function ScreenSkeleton({ variant = 'events', rows = 3, delay = 300, className }: ScreenSkeletonProps) {
  return (
    <DelayedSkeleton delay={delay}>
      <div role="status" aria-label="Carregando" className={cn('flex flex-col gap-3.5', className)}>
        {variant === 'events' && <StageSkeleton />}
        {variant === 'events' && <SkeletonBlock width={80} height={9} />}
        {Array.from({ length: rows }, (_, i) =>
          variant === 'events' ? <DateRowSkeleton key={i} /> : <ListRowSkeleton key={i} />,
        )}
      </div>
    </DelayedSkeleton>
  );
}
