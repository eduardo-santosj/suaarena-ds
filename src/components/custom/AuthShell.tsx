import * as React from 'react';
import { cn } from '../../lib/utils';
import { Logo, type LogoProduct } from '../brand/Logo';

export interface AuthShellProps {
  title: string;
  subtitle?: string;
  /** Produto do logo. Padrão: ferinos. */
  product?: LogoProduct;
  /** Botões de entrada (passkey, Google), o divisor e o formulário. */
  children: React.ReactNode;
  /** Rodapé: "Não tem conta? Criar conta". */
  footer?: React.ReactNode;
  className?: string;
}

/**
 * Casca da tela de entrada: logo, título e a coluna de botões e formulário. No
 * celular o logo fica em cima; acima de 1024px ele ocupa a coluna da esquerda.
 */
export function AuthShell({ title, subtitle, product = 'ferinos', children, footer, className }: AuthShellProps) {
  return (
    <div
      className={cn(
        'mx-auto flex min-h-screen w-full max-w-md flex-col justify-center gap-4 px-6 py-8',
        'lg:grid lg:max-w-5xl lg:grid-cols-2 lg:items-center lg:gap-16',
        className,
      )}
    >
      <div className="flex justify-center py-4 lg:py-0">
        <Logo variant="vertical-dark" product={product} height={112} className="hidden dark:block lg:!h-[220px] lg:w-auto" aria-label="suaArena Ferinos" />
        <Logo variant="horizontal-light" product={product} height={56} className="dark:hidden lg:!h-[110px] lg:w-auto" aria-label="suaArena Ferinos" />
      </div>
      <div className="flex flex-col gap-3.5">
        <div className="mb-1 text-center lg:text-left">
          <h1 className="font-display text-[25px] font-extrabold leading-tight tracking-[-0.025em] text-foreground">{title}</h1>
          {subtitle && <p className="mt-1.5 text-[13px] text-subtle-foreground">{subtitle}</p>}
        </div>
        {children}
        {footer && <div className="pt-1 text-center text-[13.5px] text-muted-foreground lg:text-left">{footer}</div>}
      </div>
    </div>
  );
}

export interface SocialButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  /** google: botão escuro com o G. passkey: botão claro de destaque (Face ID, digital, Windows Hello). */
  provider: 'google' | 'passkey';
  label: string;
  /** Ícone Lucide do passkey (ScanFace, Fingerprint). */
  icon?: React.ReactNode;
  loading?: boolean;
}

/** Botão de entrada social ou biométrica da casca de login. Sem Apple (decisão do produto). */
export function SocialButton({ provider, label, icon, loading, disabled, className, type = 'button', ...props }: SocialButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={cn(
        'flex w-full items-center justify-center gap-2 rounded-xl text-sm font-semibold transition-opacity',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-60',
        provider === 'passkey' ? 'h-[50px] bg-foreground text-background hover:opacity-90' : 'h-12 bg-surface-3 text-foreground hover:opacity-90',
        className,
      )}
      {...props}
    >
      {provider === 'google' ? <span className="text-[15px] font-bold" aria-hidden="true">G</span> : icon}
      {label}
    </button>
  );
}

/** Divisor com texto no meio: "ou com e-mail". */
export function AuthDivider({ children = 'ou com e-mail', className }: { children?: React.ReactNode; className?: string }) {
  return (
    <div
      role="separator"
      className={cn(
        'flex items-center gap-2.5 font-mono text-[10px] uppercase tracking-[0.12em] text-subtle-foreground',
        'before:h-px before:flex-1 before:bg-border after:h-px after:flex-1 after:bg-border',
        className,
      )}
    >
      {children}
    </div>
  );
}
