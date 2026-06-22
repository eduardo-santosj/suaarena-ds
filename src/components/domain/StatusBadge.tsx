import { Badge } from '../ui/badge';
import { cn } from '../../lib/utils';

export type TournamentStatus =
  | 'registration_open'
  | 'active'
  | 'in_progress'
  | 'finished'
  | 'cancelled';

export type RegistrationStatus =
  | 'confirmed'
  | 'awaiting_payment'
  | 'pending'
  | 'cancelled';

export type StatusBadgeVariant = TournamentStatus | RegistrationStatus;

interface StatusConfig {
  label: string;
  variant: 'default' | 'secondary' | 'destructive' | 'outline';
  className?: string;
}

const TOURNAMENT_STATUS_MAP: Record<TournamentStatus, StatusConfig> = {
  registration_open: { label: 'Inscrições abertas', variant: 'secondary' },
  active:            { label: 'Em andamento',        variant: 'default'   },
  in_progress:       { label: 'Em andamento',        variant: 'default'   },
  finished:          { label: 'Finalizado',           variant: 'outline'   },
  cancelled:         { label: 'Cancelado',            variant: 'destructive' },
};

const REGISTRATION_STATUS_MAP: Record<RegistrationStatus, StatusConfig> = {
  confirmed:        { label: 'Confirmado',           variant: 'default', className: 'bg-green-600 hover:bg-green-700 text-white' },
  awaiting_payment: { label: 'Aguardando pagamento', variant: 'outline', className: 'border-yellow-500 text-yellow-600 dark:text-yellow-400' },
  pending:          { label: 'Pendente',             variant: 'outline' },
  cancelled:        { label: 'Cancelado',            variant: 'destructive' },
};

const ALL_STATUS_MAP: Record<StatusBadgeVariant, StatusConfig> = {
  ...TOURNAMENT_STATUS_MAP,
  ...REGISTRATION_STATUS_MAP,
};

export interface StatusBadgeProps {
  status: StatusBadgeVariant;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = ALL_STATUS_MAP[status] ?? { label: status, variant: 'outline' as const };
  return (
    <Badge variant={config.variant} className={cn(config.className, className)}>
      {config.label}
    </Badge>
  );
}
