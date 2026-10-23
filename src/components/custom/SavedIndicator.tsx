import { AlertCircle, Check, Loader2 } from 'lucide-react';
import { cn } from '../../lib/utils';

export type SavedStatus = 'idle' | 'saving' | 'saved' | 'error';

export interface SavedIndicatorProps {
  status: SavedStatus;
  /** Complemento do estado salvo: "há 3 segundos". */
  when?: string;
  className?: string;
}

/**
 * Indicador discreto de uma seção que salva sozinha: "salvando", "salvo há 3
 * segundos" ou "não salvou". Em idle não ocupa nada. Avisa leitor de tela.
 */
export function SavedIndicator({ status, when, className }: SavedIndicatorProps) {
  return (
    <span role="status" aria-live="polite" className={cn('inline-flex items-center gap-1.5 text-[12.5px]', className)}>
      {status === 'saving' && (
        <>
          <Loader2 className="h-3.5 w-3.5 animate-spin text-muted-foreground motion-reduce:animate-none" aria-hidden="true" />
          <span className="text-muted-foreground">salvando</span>
        </>
      )}
      {status === 'saved' && (
        <>
          <Check className="h-3.5 w-3.5 text-success" aria-hidden="true" />
          <span className="font-mono text-[10.5px] uppercase tracking-[0.1em] text-success">salvo</span>
          {when && <span className="text-muted-foreground">{when}</span>}
        </>
      )}
      {status === 'error' && (
        <>
          <AlertCircle className="h-3.5 w-3.5 text-destructive" aria-hidden="true" />
          <span className="text-destructive">não salvou</span>
        </>
      )}
    </span>
  );
}
