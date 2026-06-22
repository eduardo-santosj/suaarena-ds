import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { cn } from '../../lib/utils';

export interface AvatarGroupUser {
  name: string;
  imageUrl?: string;
}

export interface AvatarGroupProps {
  users: AvatarGroupUser[];
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const SIZE_CLASSES = {
  sm: 'h-7 w-7 text-xs',
  md: 'h-9 w-9 text-sm',
  lg: 'h-11 w-11 text-base',
};

function getInitials(name: string): string {
  return name
    .split(' ')
    .slice(0, 2)
    .map((n) => n[0])
    .join('')
    .toUpperCase();
}

export function AvatarGroup({ users, max = 3, size = 'md', className }: AvatarGroupProps) {
  const visible = users.slice(0, max);
  const overflow = users.length - max;
  const sizeClass = SIZE_CLASSES[size];

  return (
    <div className={cn('flex items-center', className)} role="group" aria-label={`${users.length} participantes`}>
      {visible.map((user, i) => (
        <Avatar
          key={`${user.name}-${i}`}
          className={cn(sizeClass, 'border-2 border-background ring-0', i > 0 && '-ml-2')}
          title={user.name}
        >
          {user.imageUrl && <AvatarImage src={user.imageUrl} alt={user.name} />}
          <AvatarFallback className="bg-primary/10 text-primary font-semibold">
            {getInitials(user.name)}
          </AvatarFallback>
        </Avatar>
      ))}
      {overflow > 0 && (
        <div
          className={cn(sizeClass, '-ml-2 flex items-center justify-center rounded-full border-2 border-background bg-muted text-muted-foreground font-medium')}
          aria-label={`e mais ${overflow} participantes`}
        >
          +{overflow}
        </div>
      )}
    </div>
  );
}
