'use client';

import { CircleAlert, CircleCheck } from 'lucide-react';
import {
  createContext, useCallback, useContext, useEffect, useMemo, useRef, useState,
  type ReactNode,
} from 'react';
import { cn } from '../../lib/utils';

export type ActionToastTone = 'default' | 'success' | 'error';

export interface ActionToastOptions {
  /** Diz exatamente o que aconteceu: "Laranja venceu 4 × 2", "Gol do Caio não foi salvo". */
  title: string;
  /** Estado atual: "Laranja × Azul já começou", "O placar voltou pra 3 × 2." */
  description?: string;
  /** default = desfazer/aviso (H5); error = acao que falhou (T3). */
  tone?: ActionToastTone;
  /** "Desfazer" no H5, "Tentar de novo" no T3. Um botao so. */
  action?: { label: string; onClick: () => void };
  /** Peca a esquerda (cor do time, avatar). Sem ela, o tom decide o icone. */
  leading?: ReactNode;
  /** ms. Padrao 3500; com acao, 5000. */
  duration?: number;
}

export interface ActionToastProps extends ActionToastOptions {
  /** Fechar ao tocar no corpo (o botao de acao fecha sozinho). */
  onDismiss?: () => void;
  className?: string;
}

/**
 * Toast com uma acao: confirma o que aconteceu e oferece desfazer, ou diz o
 * que nao foi salvo e oferece tentar de novo. Nunca "Erro 500" sozinho.
 * O mesmo componente no app (RN) e no web.
 */
export function ActionToast({
  title, description, tone = 'default', action, leading, onDismiss, className,
}: ActionToastProps) {
  const icon = leading ?? (tone === 'error'
    ? <span className="w-8 h-8 rounded-[10px] bg-destructive/15 text-destructive flex items-center justify-center shrink-0"><CircleAlert className="w-[17px] h-[17px]" /></span>
    : tone === 'success'
      ? <span className="w-8 h-8 rounded-[10px] bg-success/15 text-success flex items-center justify-center shrink-0"><CircleCheck className="w-[17px] h-[17px]" /></span>
      : null);

  return (
    <div
      role={tone === 'error' ? 'alert' : 'status'}
      aria-live={tone === 'error' ? 'assertive' : 'polite'}
      onClick={onDismiss}
      className={cn(
        'relative overflow-hidden flex items-center gap-2.5 rounded-2xl px-3.5 py-3',
        'shadow-[0_14px_30px_rgba(0,0,0,0.30)] ring-1 ring-border/60 dark:ring-0',
        tone === 'error' ? 'bg-background' : 'bg-surface-3',
        onDismiss && 'cursor-pointer',
        className,
      )}
    >
      {tone === 'error' && <span aria-hidden className="absolute inset-0 bg-destructive/12 pointer-events-none" />}
      {icon && <span className="relative shrink-0">{icon}</span>}
      <div className="relative flex-1 min-w-0 flex flex-col gap-0.5">
        <span className="text-[13.5px] font-semibold text-foreground truncate">{title}</span>
        {description && <span className="text-xs text-subtle-foreground line-clamp-2">{description}</span>}
      </div>
      {action && (
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); action.onClick(); onDismiss?.(); }}
          className="relative shrink-0 text-[13px] font-bold text-primary px-1 py-1 rounded-md hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          {action.label}
        </button>
      )}
    </div>
  );
}

interface ActionToastCtx {
  show: (t: ActionToastOptions) => void;
  hide: () => void;
}

const Ctx = createContext<ActionToastCtx | null>(null);

/**
 * Um toast por vez, no topo; o proximo substitui o atual. Coloque uma vez na
 * raiz e chame `useActionToast().show(...)`.
 */
export function ActionToastProvider({ children }: { children: ReactNode }) {
  const [toast, setToast] = useState<(ActionToastOptions & { id: number }) | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const seq = useRef(0);

  const hide = useCallback(() => {
    if (timer.current) { clearTimeout(timer.current); timer.current = null; }
    setToast(null);
  }, []);

  const show = useCallback((t: ActionToastOptions) => {
    if (timer.current) clearTimeout(timer.current);
    seq.current += 1;
    setToast({ ...t, id: seq.current });
    timer.current = setTimeout(hide, t.duration ?? (t.action ? 5000 : 3500));
  }, [hide]);

  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  const value = useMemo(() => ({ show, hide }), [show, hide]);

  return (
    <Ctx.Provider value={value}>
      {children}
      {toast && (
        <div className="fixed inset-x-3 top-[max(12px,env(safe-area-inset-top))] z-[100] flex justify-center pointer-events-none">
          <ActionToast key={toast.id} {...toast} onDismiss={hide}
            className="pointer-events-auto w-full max-w-md motion-safe:animate-toast-in" />
        </div>
      )}
    </Ctx.Provider>
  );
}

export function useActionToast(): ActionToastCtx {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useActionToast precisa do ActionToastProvider na raiz');
  return ctx;
}
