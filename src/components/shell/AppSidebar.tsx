'use client';

import { ChevronDown } from 'lucide-react';
import type { ReactNode } from 'react';
import { cn } from '../../lib/utils';
import { Logo } from '../brand/Logo';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { NAV_ICON, NavBadge, NavLink, navItems, type NavProps } from './nav';

export interface AppSidebarFerino {
  name: string;
  /** Ex.: "admin · futevôlei". */
  subtitle?: string;
  logoUrl?: string | null;
}

export interface AppSidebarProps extends NavProps {
  /** Ferino ativo, no cartao do topo. */
  ferino?: AppSidebarFerino | null;
  /** Abre a troca de Ferino (mostra a seta). */
  onFerinoClick?: () => void;
  /** Substitui a logo padrao (suaArena Ferinos). */
  logo?: ReactNode;
  /** Link da logo. Padrao: sem link. */
  logoHref?: string;
  /** Abaixo das tres abas (ex.: grupo de admin). */
  children?: ReactNode;
  /** Rodape (plano, conta, sair). */
  footer?: ReactNode;
  className?: string;
}

function initials(name: string) {
  return name.trim().split(/\s+/).slice(0, 2).map((p) => p[0]?.toUpperCase() ?? '').join('');
}

/**
 * Barra lateral do web acima de 1024px: logo, Ferino ativo e as mesmas tres
 * abas da BottomNav. Abaixo de md, quem navega e a BottomNav.
 */
export function AppSidebar({
  sport, active, hrefs, linkComponent, onSelect, badges,
  ferino, onFerinoClick, logo, logoHref, children, footer, className,
}: AppSidebarProps) {
  const L = linkComponent ?? 'a';
  const brand = logo ?? (
    <>
      <Logo variant="horizontal-dark" product="ferinos" height={26} className="hidden dark:block" />
      <Logo variant="horizontal-light" product="ferinos" height={26} className="dark:hidden" />
    </>
  );
  const FerinoTag = onFerinoClick ? 'button' : 'div';

  return (
    <aside className={cn('w-[232px] shrink-0 flex flex-col gap-4 bg-chrome border-r border-border/60 px-3 py-[18px] overflow-y-auto', className)}>
      {logoHref
        ? <L href={logoHref} className="mx-2 mt-0.5 mb-1 self-start" aria-label="Início">{brand}</L>
        : <div className="mx-2 mt-0.5 mb-1 self-start">{brand}</div>}

      {ferino && (
        <FerinoTag
          {...(onFerinoClick ? { type: 'button' as const, onClick: onFerinoClick, 'aria-label': `Trocar Ferino (atual: ${ferino.name})` } : {})}
          className={cn(
            'w-full flex items-center gap-2 rounded-2xl bg-surface-1 ring-1 ring-border dark:ring-0 px-3 py-2.5 text-left',
            onFerinoClick && 'hover:bg-surface-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
          )}
        >
          <Avatar className="w-[30px] h-[30px]">
            {ferino.logoUrl && <AvatarImage src={ferino.logoUrl} alt="" className="object-cover" />}
            <AvatarFallback className="bg-primary text-primary-foreground text-[10px] font-bold">{initials(ferino.name)}</AvatarFallback>
          </Avatar>
          <span className="flex-1 min-w-0 flex flex-col">
            <span className="text-[12.5px] font-semibold truncate text-foreground">{ferino.name}</span>
            {ferino.subtitle && <span className="text-[10.5px] text-subtle-foreground truncate">{ferino.subtitle}</span>}
          </span>
          {onFerinoClick && <ChevronDown aria-hidden className="w-4 h-4 text-subtle-foreground shrink-0" />}
        </FerinoTag>
      )}

      <nav aria-label="Navegação principal" className="flex flex-col">
        {navItems(sport).map(({ key, label }) => {
          const Icon = NAV_ICON[key];
          const on = active === key;
          return (
            <NavLink key={key} tab={key} href={hrefs?.[key]} linkComponent={linkComponent} onSelect={onSelect} current={on}
              className={cn(
                'flex items-center gap-2.5 px-2.5 py-[9px] rounded-[10px] text-[13px] w-full text-left',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                on ? 'bg-primary/12 text-primary font-semibold' : 'text-muted-foreground hover:bg-surface-1 hover:text-foreground',
              )}>
              <Icon className="w-4 h-4 shrink-0" />
              <span className="flex-1 truncate">{label}</span>
              <NavBadge value={badges?.[key]} className="" />
            </NavLink>
          );
        })}
      </nav>

      {children}
      {footer && <div className="mt-auto flex flex-col gap-3">{footer}</div>}
    </aside>
  );
}
