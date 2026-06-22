'use client';

/**
 * AlertProvider + useAlert hook.
 * Design original: projeto Torneio (Eduardo Jacinto).
 *
 * Uso:
 *   // Wrape o app uma vez
 *   <AlertProvider>...</AlertProvider>
 *
 *   // Em qualquer componente filho
 *   const alert = useAlert();
 *   alert.show('success', 'Salvo com sucesso!');
 *   alert.show('error', 'Erro ao salvar.');
 *   alert.show('warning', 'Atenção: sessão expirando.');
 *   alert.show('info', 'Nova versão disponível.');
 */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { Alert, type AlertType } from './Alert';

type AlertContextType = {
  show: (type: AlertType, message: string) => void;
};

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export function useAlert() {
  const ctx = useContext(AlertContext);
  if (!ctx) throw new Error('useAlert deve ser usado dentro de <AlertProvider>');
  return ctx;
}

export function AlertProvider({ children }: { readonly children: ReactNode }) {
  const [alert, setAlert] = useState<{ type: AlertType; message: string } | null>(null);

  const show = useCallback((type: AlertType, message: string) => {
    setAlert({ type, message });
  }, []);

  const handleClose = useCallback(() => setAlert(null), []);

  // Detecta sessão expirada (comportamento do torneio preservado)
  useEffect(() => {
    const flag = sessionStorage.getItem('session-expired');
    if (flag) {
      sessionStorage.removeItem('session-expired');
      show('warning', 'Sua sessão expirou. Faça login novamente.');
    }
  }, [show]);

  const value = useMemo(() => ({ show }), [show]);

  return (
    <AlertContext.Provider value={value}>
      {children}
      {alert && (
        <Alert type={alert.type} text={alert.message} onClose={handleClose} />
      )}
    </AlertContext.Provider>
  );
}
