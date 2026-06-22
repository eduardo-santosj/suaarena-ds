import { Card, CardContent, CardFooter, CardHeader } from '../ui/card';
import { Skeleton } from '../ui/skeleton';
import { cn } from '../../lib/utils';

// ── Championship Card Skeleton ───────────────────────────────────────────────

export function ChampionshipCardSkeleton({ className }: { className?: string }) {
  return (
    <Card className={cn('overflow-hidden', className)}>
      <Skeleton className="h-48 w-full rounded-none" />
      <CardHeader>
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-1/2 mt-1" />
      </CardHeader>
      <CardContent className="space-y-3">
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-4 w-1/2" />
      </CardContent>
      <CardFooter>
        <Skeleton className="h-5 w-28 rounded-full" />
      </CardFooter>
    </Card>
  );
}

// ── Championship Grid Skeleton ───────────────────────────────────────────────

export interface ChampionshipGridSkeletonProps {
  count?: number;
  className?: string;
}

export function ChampionshipGridSkeleton({ count = 6, className }: ChampionshipGridSkeletonProps) {
  return (
    <div className={cn('grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6', className)}>
      {Array.from({ length: count }).map((_, i) => (
        <ChampionshipCardSkeleton key={'sk-card-' + i} />
      ))}
    </div>
  );
}

// ── Torneio Page Skeleton ─────────────────────────────────────────────────────

export function TorneioPageSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn('container mx-auto px-4 py-8 space-y-6', className)}>
      <Card>
        <CardContent className="p-0">
          <div className="grid md:grid-cols-[300px_1fr]">
            <Skeleton className="h-[250px] rounded-l-lg" />
            <div className="p-6 space-y-4">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-4 w-1/3" />
              <div className="flex gap-3">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-24" />
              </div>
              <Skeleton className="h-10 w-40 mt-4" />
            </div>
          </div>
        </CardContent>
      </Card>
      {[1, 2].map(i => (
        <Card key={'sk-cat-' + i}>
          <CardHeader>
            <Skeleton className="h-6 w-48" />
            <div className="flex gap-2 mt-2">
              <Skeleton className="h-5 w-20 rounded-full" />
              <Skeleton className="h-5 w-32 rounded-full" />
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <Skeleton className="h-10 w-full rounded-lg" />
            <Skeleton className="h-8 w-40" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

// ── Ranking Skeleton ─────────────────────────────────────────────────────────────

export function RankingSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn('container mx-auto px-4 py-8', className)}>
      <Skeleton className="h-10 w-64 mb-2" />
      <Skeleton className="h-4 w-48 mb-6" />
      <div className="flex gap-2 mb-6">
        {[1, 2, 3, 4].map(i => (
          <Skeleton key={'sk-tab-' + i} className="h-10 w-24 rounded-lg" />
        ))}
      </div>
      <div className="space-y-2">
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={'sk-row-' + i} className="flex items-center gap-4 p-3 border rounded-lg">
            <Skeleton className="h-6 w-8" />
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-4 flex-1 max-w-[200px]" />
            <Skeleton className="h-4 w-16 ml-auto" />
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Match List Skeleton ──────────────────────────────────────────────────────────────

export function MatchListSkeleton({ count = 6, className }: { count?: number; className?: string }) {
  return (
    <div className={cn('space-y-3', className)}>
      {Array.from({ length: count }).map((_, i) => (
        <Card key={'sk-match-' + i} className="w-[200px]">
          <div className="h-7 bg-muted" />
          <div className="divide-y">
            <div className="flex items-center justify-between px-3 py-2">
              <Skeleton className="h-3 w-24" />
              <Skeleton className="h-3 w-6" />
            </div>
            <div className="flex items-center justify-between px-3 py-2">
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-3 w-6" />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
