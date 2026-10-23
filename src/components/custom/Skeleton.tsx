import * as React from 'react';
import { cn } from '../../lib/utils';

export interface SkeletonBlockProps extends React.HTMLAttributes<HTMLSpanElement> {
  width?: number | string;
  height?: number | string;
  /** Raio em px. */
  radius?: number;
}

/**
 * Esqueleto de carregamento por tela: bloco surface-3 que pulsa de leve.
 * Com "reduzir movimento" ligado no sistema fica parado, sem brilho.
 * (O `Skeleton` de ui/ continua como está; este é o do novo layout.)
 */
export function SkeletonBlock({ width = '100%', height = 14, radius = 6, className, style, ...props }: SkeletonBlockProps) {
  return (
    <span
      aria-hidden="true"
      className={cn('block bg-surface-3 motion-safe:animate-pulse', className)}
      style={{ width, height, borderRadius: radius, ...style }}
      {...props}
    />
  );
}
