import { RefreshCw, WifiOff } from 'lucide-react';
import { cn } from '../../lib/utils';
import { LiveTag } from './Stage';

export interface OfflineBannerProps {
  /** Texto da faixa. */
  message?: string;
  /** Botão opcional à direita ("Tentar de novo"). */
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

/** Faixa âmbar de "sem conexão" no topo da tela: a tela não some, o placar fica apagado. */
export function OfflineBanner({
  message = 'Sem conexão. Mostrando o último placar que chegou.', actionLabel, onAction, className,
}: OfflineBannerProps) {
  return (
    <div role="status" className={cn('flex items-center gap-2 rounded-xl bg-offline px-3 py-[9px] text-[12.5px] text-offline-foreground', className)}>
      <WifiOff className="h-[15px] w-[15px] shrink-0" aria-hidden="true" />
      <span className="flex-1">{message}</span>
      {actionLabel && onAction && (
        <button type="button" onClick={onAction} className="inline-flex shrink-0 items-center gap-1 font-semibold underline-offset-2 hover:underline">
          <RefreshCw className="h-3.5 w-3.5" aria-hidden="true" />
          {actionLabel}
        </button>
      )}
    </div>
  );
}

export interface StaleTagProps {
  /** Minutos desde o último dado recebido. */
  minutes: number;
  className?: string;
}

/** Texto de "há N min" (ou "há N h"), sem o componente. */
export function agoLabel(minutes: number): string {
  if (minutes < 1) return 'agora há pouco';
  if (minutes < 60) return `há ${Math.floor(minutes)} min`;
  return `há ${Math.floor(minutes / 60)} h`;
}

/** Etiqueta cinza "há 2 min" no lugar do "ao vivo" quando o dado está velho. Combine com `Stage stale`. */
export function StaleTag({ minutes, className }: StaleTagProps) {
  return <LiveTag stale label={agoLabel(minutes)} className={className} />;
}

export type QueueStatus = 'queued' | 'sending' | 'failed';

export interface QueueItemProps {
  /** O que está na fila: "Gol do Rafa · Laranja". */
  title: string;
  /** Explicação curta: "Vai sozinho quando a internet voltar. Pode continuar marcando.". */
  description?: string;
  status?: QueueStatus;
  /** Para status failed: refaz o envio. */
  onRetry?: () => void;
  className?: string;
}

const LABEL: Record<QueueStatus, string> = { queued: 'na fila', sending: 'enviando', failed: 'não enviou' };
const TONE: Record<QueueStatus, string> = { queued: 'text-primary', sending: 'text-muted-foreground', failed: 'text-destructive' };

/** Item de uma ação guardada no celular, esperando a rede (gol marcado offline). */
export function QueueItem({ title, description, status = 'queued', onRetry, className }: QueueItemProps) {
  return (
    <div className={cn('flex flex-col gap-2.5 rounded-2xl bg-surface-1 px-4 py-3.5', className)}>
      <div className="flex items-center justify-between gap-3">
        <span className="min-w-0 truncate text-sm font-semibold text-foreground">{title}</span>
        <span className={cn('shrink-0 font-mono text-[10.5px] uppercase tracking-[0.1em]', TONE[status])}>{LABEL[status]}</span>
      </div>
      {description && <p className="text-[12.5px] leading-snug text-subtle-foreground">{description}</p>}
      {status === 'failed' && onRetry && (
        <button type="button" onClick={onRetry} className="self-start text-[13px] font-bold text-primary hover:underline">
          Tentar de novo
        </button>
      )}
    </div>
  );
}
