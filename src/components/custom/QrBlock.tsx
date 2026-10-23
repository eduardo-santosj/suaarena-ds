import * as React from 'react';
import { cn } from '../../lib/utils';

export interface QrBlockProps {
  /** O QR já desenhado (svg ou img). O DS não gera QR: quem usa passa o de `qrcode.react` ou similar. */
  children: React.ReactNode;
  title?: string;
  /** Endereço em mono embaixo do título: "ferinos.app/fftvi". */
  url?: string;
  /** inline: QR à esquerda e texto à direita (coluna do telão). stacked: tudo centralizado (telão da votação). */
  layout?: 'inline' | 'stacked';
  /** Lado do QR em px. */
  size?: number;
  className?: string;
}

/** Bloco de QR com chamada: o código sempre em fundo branco, para ler de longe. */
export function QrBlock({ children, title, url, layout = 'inline', size = 92, className }: QrBlockProps) {
  const stacked = layout === 'stacked';
  return (
    <div
      className={cn(
        'flex gap-[18px] rounded-[22px] bg-surface-1 p-[22px]',
        stacked ? 'flex-col items-center text-center' : 'flex-row items-center',
        className,
      )}
    >
      <span
        className="inline-flex shrink-0 rounded-[14px] bg-white p-2.5 [&>*]:h-full [&>*]:w-full"
        style={{ width: size + 20, height: size + 20 }}
      >
        {children}
      </span>
      {(title || url) && (
        <span className={cn('flex flex-col gap-1.5', stacked && 'items-center')}>
          {title && <span className={cn('font-bold leading-tight text-foreground', stacked ? 'text-2xl' : 'text-[19px]')}>{title}</span>}
          {url && <span className="font-mono text-xs uppercase tracking-[0.12em] text-subtle-foreground">{url}</span>}
        </span>
      )}
    </div>
  );
}
