/**
 * @eduardo-santosj/ui — Bracket Types
 *
 * Tipos compartilhados entre os produtos torneio e suaArena.
 * Importe via: import type { BracketMatch, Team, MatchSet } from "@eduardo-santosj/ui";
 */

export type BracketType = "single" | "double" | "groups" | "swiss";

export type MatchStatus = "pending" | "live" | "finished" | "bye";

export interface Team {
  id: string;
  name: string;
  seed?: number | null;
}

export interface MatchSet {
  scoreA: number;
  scoreB: number;
}

export interface BracketMatch {
  id: string;
  position: number;
  round: number;
  teamA: Team | null;
  teamB: Team | null;
  scoreA: number | null;
  scoreB: number | null;
  sets: MatchSet[];
  winner: Team | null;
  loser?: Team | null;
  status: MatchStatus;
  live?: boolean;
  bracketReset?: boolean;
  groupId?: string;
  hidden?: boolean;
  isThirdPlace?: boolean;
  isByeAdvance?: boolean;
  matchNumber?: number;
  nextMatchId?: string | null;
  nextMatchNumber?: number | null;
  loserToMatchId?: string | null;
  sourceMatchIds?: string[];
  court?: string | null;
  walkover?: boolean;
  scheduledAt?: string | null;
  estimatedDuration?: number | null;
}
