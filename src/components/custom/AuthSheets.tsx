'use client';

import * as React from 'react';
import { ScanFace } from 'lucide-react';
import { Sheet, SheetContent, SheetDescription, SheetTitle } from '../ui/sheet';
import { cn } from '../../lib/utils';

const SHEET = 'mx-auto max-w-md items-center gap-3 rounded-t-[28px] border-0 bg-surface-2 px-[18px] pb-9 pt-2.5 text-center flex flex-col';
const BTN = 'h-[50px] w-full rounded-xl text-[14.5px] font-semibold transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-60';

function Hero({ icon, title, description }: { icon?: React.ReactNode; title: string; description: string }) {
  return (
    <>
      <span aria-hidden="true" className="h-[5px] w-[38px] rounded-full bg-foreground/20" />
      <span className="mt-1.5 flex h-16 w-16 items-center justify-center rounded-[20px] bg-primary/15 text-primary [&>svg]:h-8 [&>svg]:w-8">
        {icon ?? <ScanFace />}
      </span>
      <SheetTitle className="text-xl font-bold text-foreground">{title}</SheetTitle>
      <SheetDescription className="text-[13.5px] leading-relaxed text-muted-foreground">{description}</SheetDescription>
    </>
  );
}

export interface PasskeySheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** create: oferece criar a passkey depois do 1º login (P1b). signin: pede para entrar com ela. */
  mode?: 'create' | 'signin';
  /** Como o aparelho chama: "Face ID", "digital", "Windows Hello". */
  methodLabel?: string;
  /** Nome da pessoa, usado no modo signin ("Confirma que é você, Edu"). */
  name?: string;
  /** Troca o título padrão. */
  title?: string;
  /** Troca o texto padrão. */
  description?: string;
  loading?: boolean;
  /** Toque no botão principal: chama a biometria do sistema. */
  onConfirm: () => void;
  /** create: "Agora não". signin: "Entrar com outra conta". */
  onDismiss?: () => void;
  /** Ícone Lucide do método (ScanFace, Fingerprint). */
  icon?: React.ReactNode;
}

/**
 * Folha da passkey. No modo create aparece uma vez, logo depois do primeiro
 * login ("Agora não" some por 30 dias). No modo signin entra no lugar da senha.
 */
export function PasskeySheet({
  open, onOpenChange, mode = 'create', methodLabel = 'Face ID', name, title, description, loading, onConfirm, onDismiss, icon,
}: PasskeySheetProps) {
  const create = mode === 'create';
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className={SHEET}>
        <Hero
          icon={icon}
          title={title ?? (create ? `Entrar com ${methodLabel} da próxima vez?` : name ? `Confirma que é você, ${name}` : 'Confirma que é você')}
          description={
            description ??
            (create
              ? 'Sem digitar senha. Sua digital ou seu rosto ficam no aparelho; o Ferinos só recebe a confirmação.'
              : `Um toque no ${methodLabel} e você volta pro que estava fazendo.`)
          }
        />
        <button type="button" disabled={loading} onClick={onConfirm} className={cn(BTN, 'mt-1.5 bg-primary text-primary-foreground hover:opacity-90')}>
          {create ? `Ativar ${methodLabel}` : `Continuar com ${methodLabel}`}
        </button>
        {onDismiss && (
          <button type="button" onClick={onDismiss} className="p-1.5 text-[12.5px] font-medium text-muted-foreground hover:text-foreground">
            {create ? 'Agora não' : 'Entrar com outra conta'}
          </button>
        )}
      </SheetContent>
    </Sheet>
  );
}

export interface SessionExpiredSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  name?: string;
  /** E-mail da conta, já preenchido no fallback de senha. */
  email: string;
  /** Se informado, mostra o botão de passkey no lugar da senha ("Face ID"). */
  passkeyLabel?: string;
  onPasskey?: () => void;
  /** Senha digitada. Chamado no fallback de senha. */
  onPassword?: (password: string) => void;
  /** "Entrar com outra conta". */
  onOtherAccount?: () => void;
  loading?: boolean;
  /** Mensagem de erro da última tentativa. */
  error?: string;
}

/**
 * Sessão vencida: uma folha por cima da tela onde a pessoa estava, em vez de
 * jogá-la no login. Passkey é um toque; sem passkey pede só a senha, com o
 * e-mail já preenchido. Depois de entrar, a tela e a ação de antes continuam.
 */
export function SessionExpiredSheet({
  open, onOpenChange, name, email, passkeyLabel, onPasskey, onPassword, onOtherAccount, loading, error,
}: SessionExpiredSheetProps) {
  const [password, setPassword] = React.useState('');
  const usePasskey = !!passkeyLabel && !!onPasskey;
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className={SHEET}>
        <Hero
          title={name ? `Confirma que é você, ${name}` : 'Confirma que é você'}
          description={
            usePasskey
              ? `Faz mais de 7 dias que você entrou. Um olhar no ${passkeyLabel} e você volta pra onde estava.`
              : `Faz mais de 7 dias que você entrou. Digite a senha de ${email} pra continuar.`
          }
        />
        {usePasskey ? (
          <button type="button" disabled={loading} onClick={onPasskey} className={cn(BTN, 'mt-1.5 bg-primary text-primary-foreground hover:opacity-90')}>
            Continuar com {passkeyLabel}
          </button>
        ) : (
          <form
            className="mt-1.5 flex w-full flex-col gap-2.5"
            onSubmit={(e) => {
              e.preventDefault();
              onPassword?.(password);
            }}
          >
            <input
              type="email"
              value={email}
              readOnly
              aria-label="E-mail"
              className="h-12 w-full rounded-xl border border-input bg-surface-1 px-3.5 text-sm text-muted-foreground"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              autoFocus
              aria-label="Senha"
              placeholder="Senha"
              className="h-12 w-full rounded-xl border border-input bg-surface-1 px-3.5 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
            {error && <p role="alert" className="text-left text-xs text-destructive">{error}</p>}
            <button type="submit" disabled={loading || !password} className={cn(BTN, 'bg-primary text-primary-foreground hover:opacity-90')}>
              Entrar
            </button>
          </form>
        )}
        {onOtherAccount && (
          <button type="button" onClick={onOtherAccount} className="p-1.5 text-[12.5px] font-medium text-muted-foreground hover:text-foreground">
            Entrar com outra conta
          </button>
        )}
      </SheetContent>
    </Sheet>
  );
}
