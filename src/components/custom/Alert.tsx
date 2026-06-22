'use client';

/**
 * Alert customizado — toast com auto-dismiss.
 * Design original: projeto Torneio (Eduardo Jacinto).
 *
 * Diferente do AlertBlock (shadcn inline), este é um toast
 * posicionado no canto superior direito com animação de entrada/saída.
 *
 * Usa as keyframes alert-in / alert-out definidas no tokens.css.
 */

import { AlertTriangle, CheckCircle, Info, X, XCircle } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export type AlertType = 'success' | 'error' | 'warning' | 'info';

export type AlertProps = {
  readonly type: AlertType;
  readonly text: string;
  readonly onClose: () => void;
  /** Tempo em ms até auto-dismiss. Default: 4000 */
  readonly duration?: number;
};

const CONFIG: Record<AlertType, { icon: React.ElementType; bg: string; border: string }> = {
  success: { icon: CheckCircle,  bg: 'bg-green-600',  border: 'border-green-500'  },
  error:   { icon: XCircle,      bg: 'bg-red-600',    border: 'border-red-500'    },
  warning: { icon: AlertTriangle, bg: 'bg-yellow-500', border: 'border-yellow-400' },
  info:    { icon: Info,          bg: 'bg-blue-600',   border: 'border-blue-500'   },
};

export function Alert({ type, text, onClose, duration = 4000 }: AlertProps) {
  const { icon: Icon, bg, border } = CONFIG[type];
  const [closing, setClosing] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const dismiss = () => {
    if (closing) return;
    setClosing(true);
    timerRef.current = setTimeout(onClose, 280);
  };

  useEffect(() => {
    timerRef.current = setTimeout(dismiss, duration);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      role="alert"
      aria-live="assertive"
      className={`fixed top-4 right-4 z-50 flex items-center gap-3 px-4 py-3 rounded-lg border text-white shadow-lg max-w-sm ${bg} ${border}`}
      style={{ animation: `${closing ? 'alert-out' : 'alert-in'} 0.3s ease forwards` }}
    >
      <Icon className="h-5 w-5 shrink-0" aria-hidden />
      <span className="text-sm font-medium flex-1">{text}</span>
      <button
        onClick={dismiss}
        className="ml-2 hover:opacity-70 transition-opacity"
        aria-label="Fechar alerta"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
