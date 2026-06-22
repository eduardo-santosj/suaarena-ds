import { useState } from 'react';
import { Trophy, MapPin, Calendar, Users, Star } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../ui/card';
import { Button } from '../ui/button';
import { StatusBadge, type TournamentStatus } from './StatusBadge';
import { cn } from '../../lib/utils';

export type TournamentFormat = 'single' | 'double' | 'groups' | 'swiss';

const FORMAT_LABELS: Record<TournamentFormat, string> = {
  single: 'Eliminação Simples',
  double: 'Dupla Eliminação',
  groups: 'Grupos + Eliminação',
  swiss:  'Sistema Suíço',
};

export interface ChampionshipCardData {
  id: string;
  name: string;
  format: TournamentFormat;
  city?: string;
  state?: string;
  eventDate?: string;
  maxPlayers?: number;
  status: TournamentStatus;
  registrationOpen?: boolean;
  imageUrl?: string;
}

export interface ChampionshipCardProps {
  championship: ChampionshipCardData;
  showFavorite?: boolean;
  isFavorite?: boolean;
  onClick?: () => void;
  onFavoriteToggle?: (isFavorite: boolean) => void;
  className?: string;
}

export function ChampionshipCard({
  championship,
  showFavorite = false,
  isFavorite: isFavoriteProp,
  onClick,
  onFavoriteToggle,
  className,
}: ChampionshipCardProps) {
  const [internalFavorite, setInternalFavorite] = useState(false);
  const isControlled = isFavoriteProp !== undefined;
  const isFavorite = isControlled ? isFavoriteProp : internalFavorite;

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const next = !isFavorite;
    if (!isControlled) setInternalFavorite(next);
    onFavoriteToggle?.(next);
  };

  const effectiveStatus: TournamentStatus =
    championship.registrationOpen ? 'registration_open' : championship.status;

  return (
    <Card
      className={cn('overflow-hidden hover:shadow-lg transition-shadow', onClick && 'cursor-pointer', className)}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => { if (e.key === 'Enter' || e.key === ' ') onClick(); } : undefined}
    >
      <div className="relative h-48 w-full overflow-hidden">
        {championship.imageUrl ? (
          <img src={championship.imageUrl} alt={championship.name} className="h-full w-full object-cover" />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
            <Trophy className="h-12 w-12 text-primary/40" aria-hidden="true" />
          </div>
        )}
        {showFavorite && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 bg-background/80 hover:bg-background"
            onClick={handleFavoriteClick}
            aria-label={isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
            aria-pressed={isFavorite}
          >
            <Star className={cn('h-5 w-5', isFavorite && 'fill-yellow-400 text-yellow-400')} />
          </Button>
        )}
      </div>

      <CardHeader>
        <CardTitle className="text-xl line-clamp-2">{championship.name}</CardTitle>
        <p className="text-sm text-muted-foreground">{FORMAT_LABELS[championship.format]}</p>
      </CardHeader>

      <CardContent className="space-y-2">
        {championship.city && (
          <div className="flex items-center gap-2 text-sm min-w-0">
            <MapPin className="h-4 w-4 text-muted-foreground shrink-0" aria-hidden="true" />
            <span className="truncate">{championship.city}, {championship.state}</span>
          </div>
        )}
        {championship.eventDate && (
          <div className="flex items-center gap-2 text-sm min-w-0">
            <Calendar className="h-4 w-4 text-muted-foreground shrink-0" aria-hidden="true" />
            <span className="truncate">{championship.eventDate}</span>
          </div>
        )}
        {championship.maxPlayers && (
          <div className="flex items-center gap-2 text-sm min-w-0">
            <Users className="h-4 w-4 text-muted-foreground shrink-0" aria-hidden="true" />
            <span className="truncate">Máximo: {championship.maxPlayers} jogadores</span>
          </div>
        )}
      </CardContent>

      <CardFooter>
        <StatusBadge status={effectiveStatus} />
      </CardFooter>
    </Card>
  );
}
