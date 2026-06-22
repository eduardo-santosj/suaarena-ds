"use client";

import * as React from 'react';
import { useState } from 'react';
import { Check, Clock, MapPin, Pencil, Radio, Trophy, UserX, X } from 'lucide-react';
import { cn } from '../../lib/utils';
import type { BracketMatch, MatchSet, Team } from '../../types/bracket';

export type { BracketMatch, MatchSet, Team };

// ─── Props ───────────────────────────────────────────────────────────────────

export interface MatchCardProps {
  match: BracketMatch;
  isAdmin?: boolean;
  /** Numero de sets (1 = placar unico FTV; 3 = melhor de 3 BT). Default 1 */
  maxSets?: number;
  /** Mostra "S.TB" no 3o set em vez de "Set 3" */
  hasSuperTiebreak?: boolean;
  /**
   * Mapa nome_lower -> userId para renderizar links nos jogadores.
   * O consumidor passa um renderer via renderPlayerLink.
   */
  playerLinks?: Map<string, string>;
  /**
   * Como renderizar o link de um jogador. Recebe o nome visivel e o userId.
   * No torneio: (name, id) => <Link href={`/jogador/${id}`}>{name}</Link>
   * Se ausente: renderiza texto puro.
   */
  renderPlayerLink?: (name: string, id: string) => React.ReactNode;
  onSaveScore?: (matchId: string, scoreA: number, scoreB: number, winnerId: string, sets?: MatchSet[]) => void;
  onWalkover?: (matchId: string, winnerId: string) => void;
  onToggleLive?: (matchId: string, live: boolean) => void;
  onTeamHover?: (teamId: string | null) => void;
  classNameMatch?: string;
  teamAPlaceholder?: string;
  teamBPlaceholder?: string;
  /** Modo confortavel (aba Cards): card maior, nomes maiores. Default false = compacto (chaveamento). */
  comfortable?: boolean;
  /** Modo telao/graphView: enxuto, sem linha de quadra/acoes detalhadas. Usado junto com comfortable. */
  graphView?: boolean;
}

// ─── TeamNameText ─────────────────────────────────────────────────────────────

function TeamNameText({
  name,
  playerLinks,
  renderPlayerLink,
}: {
  name: string;
  playerLinks?: Map<string, string>;
  renderPlayerLink?: (name: string, id: string) => React.ReactNode;
}) {
  if (!playerLinks || playerLinks.size === 0 || !renderPlayerLink) return <>{name}</>;
  const parts = name.split(' / ');
  return (
    <>
      {parts.map((part, i) => {
        const id = playerLinks.get(part.trim().toLowerCase());
        return (
          <React.Fragment key={part + '-' + i}>
            {i > 0 && ' / '}
            {id != null ? renderPlayerLink(part, id) : part}
          </React.Fragment>
        );
      })}
    </>
  );
}

// ─── TeamSlot (single-score mode) ───────────────────────────────────────────

function TeamSlot({
  team, score, isWinner, isBye, editing, inputValue,
  onInputChange, onTeamHover, placeholder, isWalkoverLoser, comfortable,
  playerLinks, renderPlayerLink,
}: {
  team: Team | null;
  score: number | null;
  isWinner: boolean;
  isBye: boolean;
  editing: boolean;
  inputValue: string;
  onInputChange: (v: string) => void;
  onTeamHover?: (teamId: string | null) => void;
  placeholder?: string;
  isWalkoverLoser?: boolean;
  comfortable?: boolean;
  playerLinks?: Map<string, string>;
  renderPlayerLink?: (name: string, id: string) => React.ReactNode;
}) {
  const label = team?.name ?? (isBye ? 'BYE' : (placeholder ?? 'A definir'));
  return (
    <div
      className={cn(
        'flex items-center justify-between gap-2 px-3 py-2 text-sm border-b last:border-b-0 transition-colors min-h-[36px]',
        comfortable && 'py-2.5 min-h-[44px]',
        isWinner && 'bg-primary/10 font-semibold',
        !isWinner && score !== null && 'opacity-60',
        !team && 'text-muted-foreground italic',
        team && 'cursor-default',
      )}
      onMouseEnter={() => { if (team?.id) onTeamHover?.(team.id); }}
    >
      <span
        className={cn('truncate flex-1 text-xs flex items-center gap-1', comfortable && 'text-sm')}
        title={team?.name ?? undefined}
      >
        {team?.seed && (
          <span className="text-[9px] font-mono text-muted-foreground">#{team.seed}</span>
        )}
        {team?.name
          ? <TeamNameText name={team.name} playerLinks={playerLinks} renderPlayerLink={renderPlayerLink} />
          : label}
      </span>
      {editing ? (
        <input
          type="number"
          inputMode="numeric"
          pattern="\d*"
          className="w-10 h-6 text-center text-xs font-mono border rounded bg-background focus:outline-none focus:ring-1 focus:ring-primary"
          value={inputValue}
          onChange={e => {
            const v = e.target.value;
            if (v === '' || /^\d+$/.test(v)) onInputChange(v);
          }}
          onPaste={e => {
            if (!/^\d+$/.test(e.clipboardData.getData('text'))) e.preventDefault();
          }}
          autoFocus
        />
      ) : isWalkoverLoser ? (
        <span className="text-[9px] font-bold text-orange-500 uppercase">WO</span>
      ) : (
        score !== null && (
          <span className={cn('text-xs font-mono tabular-nums', comfortable && 'text-lg', isWinner && 'font-bold text-primary')}>
            {score}
          </span>
        )
      )}
    </div>
  );
}

// ─── TeamNameRow (sets mode) ─────────────────────────────────────────────────

function TeamNameRow({
  team, setsWon, totalSets, isWinner, onTeamHover, placeholder,
  isWalkoverLoser, comfortable, playerLinks, renderPlayerLink,
}: {
  team: Team | null;
  setsWon: number;
  totalSets: number;
  isWinner: boolean;
  onTeamHover?: (teamId: string | null) => void;
  placeholder?: string;
  isWalkoverLoser?: boolean;
  comfortable?: boolean;
  playerLinks?: Map<string, string>;
  renderPlayerLink?: (name: string, id: string) => React.ReactNode;
}) {
  const label = team?.name ?? (placeholder ?? 'A definir');
  return (
    <div
      className={cn(
        'flex items-center justify-between gap-2 px-3 py-2 text-sm border-b transition-colors min-h-[36px]',
        comfortable && 'py-2.5 min-h-[44px]',
        isWinner && 'bg-primary/10 font-semibold',
        !isWinner && totalSets > 0 && 'opacity-60',
        !team && 'text-muted-foreground italic',
      )}
      onMouseEnter={() => { if (team?.id) onTeamHover?.(team.id); }}
    >
      <span
        className={cn('truncate flex-1 text-xs flex items-center gap-1', comfortable && 'text-sm')}
        title={team?.name ?? undefined}
      >
        {team?.seed && (
          <span className="text-[9px] font-mono text-muted-foreground">#{team.seed}</span>
        )}
        {team?.name
          ? <TeamNameText name={team.name} playerLinks={playerLinks} renderPlayerLink={renderPlayerLink} />
          : label}
      </span>
      {isWalkoverLoser ? (
        <span className="text-[9px] font-bold text-orange-500 uppercase">WO</span>
      ) : totalSets > 0 && (
        <span className={cn('text-xs font-mono tabular-nums', comfortable && 'text-lg', isWinner && 'font-bold text-primary')}>
          {setsWon}
        </span>
      )}
    </div>
  );
}

// ─── SetRow ──────────────────────────────────────────────────────────────────

function SetRow({
  setNum, label, aVal, bVal, onChangeA, onChangeB, disabled, result,
}: {
  setNum: number;
  label?: string;
  aVal: string;
  bVal: string;
  onChangeA: (v: string) => void;
  onChangeB: (v: string) => void;
  disabled: boolean;
  result?: { winnerA: boolean } | null;
}) {
  const numInput = (val: string, onChange: (v: string) => void, af?: boolean) => (
    <input
      type="number"
      inputMode="numeric"
      pattern="\d*"
      disabled={disabled}
      autoFocus={af}
      className="w-9 h-6 text-center text-xs font-mono border rounded bg-background focus:outline-none focus:ring-1 focus:ring-primary disabled:opacity-40"
      value={val}
      onChange={e => {
        const v = e.target.value;
        if (v === '' || /^\d+$/.test(v)) onChange(v);
      }}
    />
  );
  return (
    <div className={cn('flex items-center gap-1 px-3 py-1 text-[10px] border-b last:border-0', disabled && 'opacity-40')}>
      <span className="w-10 text-muted-foreground">{label ?? 'Set ' + setNum}</span>
      <div className="flex items-center gap-1 flex-1">
        {numInput(aVal, onChangeA, setNum === 1 && !disabled)}
        <span className="text-muted-foreground">x</span>
        {numInput(bVal, onChangeB)}
      </div>
      {result && (
        <span className={cn('text-[9px] font-medium', result.winnerA ? 'text-primary' : 'text-muted-foreground')}>
          {result.winnerA ? 'A' : 'B'}
        </span>
      )}
      {!result && aVal !== '' && bVal !== '' && aVal === bVal && (
        <span className="text-[9px] text-orange-500">empate</span>
      )}
    </div>
  );
}

// ─── MatchCardHeader ──────────────────────────────────────────────────────────

function MatchCardHeader({
  match, isLive, isFinished, canEdit, canLive, editing,
  canSave, setEditing, onSave, onStartEdit, onToggleLive, onWalkover,
  comfortable, graphView,
}: {
  match: BracketMatch;
  isLive: boolean;
  isFinished: boolean;
  canEdit: boolean;
  canLive: boolean;
  editing: boolean;
  comfortable?: boolean;
  graphView?: boolean;
  canSave: boolean;
  setEditing: () => void;
  onSave: () => void;
  onStartEdit: () => void;
  onToggleLive: () => void;
  onWalkover: () => void;
}) {
  const numberLabel = match.matchNumber
    ? 'Jogo ' + match.matchNumber
    : match.position != null
      ? 'Jogo ' + (match.position + 1)
      : 'Partida';

  const onRed = isLive && !comfortable;
  const iconSize = comfortable ? 'h-5 w-5' : 'h-3.5 w-3.5';
  const btnHit = cn(
    'rounded transition-colors',
    comfortable
      ? 'min-h-[40px] min-w-[40px] flex items-center justify-center'
      : 'p-0.5',
  );

  const actions = canEdit ? (
    <div className="flex items-center gap-0.5">
      {editing ? (
        <>
          <button
            onClick={setEditing}
            className={cn(btnHit, onRed ? 'text-destructive-foreground hover:bg-destructive-foreground/20' : 'text-destructive hover:bg-destructive/10')}
            title="Cancelar edicao"
          >
            <X className={iconSize} />
          </button>
          <button
            onClick={onSave}
            disabled={!canSave}
            className={cn(btnHit, !canSave && 'opacity-40 cursor-not-allowed', canSave && (onRed ? 'text-destructive-foreground hover:bg-destructive-foreground/20' : 'text-primary hover:bg-primary/20'))}
            title="Salvar placar"
          >
            <Check className={iconSize} />
          </button>
        </>
      ) : (
        <>
          {canLive && (
            <button
              onClick={onToggleLive}
              className={cn(btnHit, onRed ? 'text-destructive-foreground hover:bg-destructive-foreground/20' : 'text-destructive hover:bg-destructive/10')}
              title={isLive ? 'Parar ao vivo' : 'Marcar ao vivo'}
            >
              <Radio className={iconSize} />
            </button>
          )}
          {canLive && (
            <button
              onClick={onWalkover}
              className={cn(btnHit, onRed ? 'text-destructive-foreground hover:bg-destructive-foreground/20' : 'hover:bg-foreground/10')}
              title="WO (Walkover)"
            >
              <UserX className={iconSize} />
            </button>
          )}
          <button
            onClick={onStartEdit}
            className={cn(btnHit, onRed ? 'text-destructive-foreground hover:bg-destructive-foreground/20' : 'hover:bg-foreground/10')}
            title={isFinished ? 'Corrigir placar' : 'Definir placar'}
          >
            <Pencil className={iconSize} />
          </button>
        </>
      )}
    </div>
  ) : null;

  if (comfortable) {
    const status = isLive
      ? { label: 'Ao vivo', cls: 'bg-destructive text-destructive-foreground', dot: true }
      : isFinished
        ? { label: 'Finalizado', cls: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400', dot: false }
        : match.scheduledAt
          ? { label: 'Agendado', cls: 'bg-amber-500/15 text-amber-600 dark:text-amber-500', dot: false }
          : { label: 'Pendente', cls: 'bg-muted-foreground/15 text-muted-foreground', dot: false };

    const timeLabel = match.scheduledAt && !isFinished && !isLive
      ? new Date(match.scheduledAt).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
      : null;

    const showStatusPill = !graphView || isLive || isFinished;

    return (
      <div className="px-3 py-2 border-b bg-muted/40">
        <div className="flex items-center justify-between gap-2">
          <span className="text-base font-bold truncate">{numberLabel}</span>
          <div className="flex items-center gap-1.5 shrink-0">
            {graphView && match.court && (
              <span className="inline-flex items-center gap-1 rounded-md bg-primary/10 px-2 py-0.5 text-[11px] font-semibold text-primary">
                <MapPin className="h-3 w-3 shrink-0" /> {match.court}
              </span>
            )}
            {timeLabel && (
              <span className="inline-flex items-center gap-1 rounded-md bg-muted px-2 py-0.5 text-[11px] font-semibold text-foreground/80">
                <Clock className="h-3 w-3 shrink-0" /> {timeLabel}
              </span>
            )}
            {showStatusPill && (
              <span className={cn('inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide', status.cls)}>
                {status.dot && <span className="h-2 w-2 rounded-full bg-current animate-pulse" />}
                {status.label}
              </span>
            )}
          </div>
        </div>
        {!graphView && (
          <div className="mt-2 flex items-center justify-between gap-2 min-h-[40px]">
            {match.court ? (
              <span className="inline-flex min-w-0 items-center gap-1 truncate rounded-md bg-primary/10 px-2 py-1 text-xs font-semibold text-primary">
                <MapPin className="h-3.5 w-3.5 shrink-0" />
                <span className="truncate">{match.court}</span>
              </span>
            ) : (
              <span className="text-xs text-muted-foreground">Sem quadra</span>
            )}
            {actions}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={cn(
      'flex items-center justify-between px-2 py-1 text-[10px] font-medium',
      isLive ? 'bg-destructive text-destructive-foreground' : 'bg-muted text-muted-foreground',
    )}>
      <span className="flex items-center gap-1 min-w-0">
        <span className="font-bold whitespace-nowrap">{numberLabel}</span>
        {isLive && (
          <span className="flex items-center gap-1 font-bold whitespace-nowrap">
            <span aria-hidden>•</span>
            <span className="animate-pulse" aria-hidden>{"•"}</span> AO VIVO
          </span>
        )}
        {match.court && (
          <span className={cn(
            'ml-1 px-1.5 py-0.5 rounded text-[9px] font-medium truncate max-w-[80px]',
            isLive ? 'bg-destructive-foreground/20 text-destructive-foreground' : 'bg-primary/10 text-primary',
          )}>
            {match.court}
          </span>
        )}
      </span>
      {actions}
    </div>
  );
}

// ─── Main MatchCard ───────────────────────────────────────────────────────────

export function MatchCard({
  match, isAdmin, onSaveScore, onWalkover, onToggleLive, onTeamHover,
  classNameMatch, teamAPlaceholder, teamBPlaceholder, comfortable, graphView,
  maxSets: maxSetsProp, hasSuperTiebreak = false, playerLinks, renderPlayerLink,
}: MatchCardProps) {
  const maxSets = maxSetsProp ?? 1;
  const useSets = maxSets > 1;
  const setsNeeded = useSets ? Math.ceil(maxSets / 2) : 0;

  const [editing, setEditing] = useState(false);
  const [sA, setSA] = useState('');
  const [sB, setSB] = useState('');
  const [woMode, setWoMode] = useState(false);

  const emptySetInputs = Array.from({ length: maxSets }, () => ({ a: '', b: '' }));
  const [setsInput, setSetsInput] = useState(emptySetInputs);

  const isLive = match.status === 'live' || !!match.live;
  const isFinished = match.status === 'finished';
  const isBye = match.status === 'bye' || !!match.isByeAdvance;
  const winnerA = match.winner?.id === match.teamA?.id;
  const winnerB = match.winner?.id === match.teamB?.id;
  const isWalkover = !!match.walkover && isFinished;
  const canEdit = !!isAdmin && !isBye && !!match.teamA && !!match.teamB;
  const canLive = !!(canEdit && !isFinished);

  if (isBye) return null;

  const setComplete = (s: { a: string; b: string }) =>
    s.a !== '' && s.b !== '' && s.a !== s.b;

  const setWinner = (s: { a: string; b: string }) =>
    Number.parseInt(s.a) > Number.parseInt(s.b) ? 'A' : 'B';

  const computeSetsProgress = () => {
    const s0 = setsInput[0];
    const s1 = setsInput[1];
    const s2 = setsInput[2];
    const s0done = setComplete(s0);
    const s1show = s0done;
    const s1done = s0done && setComplete(s1);
    const s2show = s1done && setWinner(s0) !== setWinner(s1);
    const s2done = s2show && setComplete(s2);
    const wins = { A: 0, B: 0 } as Record<'A' | 'B', number>;
    if (s0done) wins[setWinner(s0)]++;
    if (s1done) wins[setWinner(s1)]++;
    if (s2done) wins[setWinner(s2)]++;
    const matchWinner = wins.A >= setsNeeded ? 'A' : wins.B >= setsNeeded ? 'B' : null;
    return { s0done, s1show, s1done, s2show, s2done, wins, matchWinner };
  };

  const handleStartEdit = () => {
    if (useSets) {
      const existing = match.sets && match.sets.length > 0
        ? match.sets.map(s => ({ a: String(s.scoreA), b: String(s.scoreB) }))
        : emptySetInputs;
      setSetsInput([...existing, ...emptySetInputs].slice(0, maxSets));
    } else {
      setSA(match.scoreA?.toString() ?? '');
      setSB(match.scoreB?.toString() ?? '');
    }
    setEditing(true);
    setWoMode(false);
  };

  const handleSave = () => {
    if (!onSaveScore) return;
    if (useSets) {
      const { wins } = computeSetsProgress();
      const filledSets: MatchSet[] = setsInput
        .filter(s => setComplete(s))
        .map(s => ({ scoreA: Number.parseInt(s.a), scoreB: Number.parseInt(s.b) }));
      onSaveScore(match.id, wins.A, wins.B, '', filledSets);
    } else {
      onSaveScore(match.id, Number.parseInt(sA) || 0, Number.parseInt(sB) || 0, '');
    }
    setEditing(false);
  };

  const handleTrophy = (team: 'A' | 'B') => {
    if (!onSaveScore) return;
    const winnerId = team === 'A' ? match.teamA?.id : match.teamB?.id;
    if (!winnerId) return;
    if (useSets) {
      const { wins } = computeSetsProgress();
      const filledSets: MatchSet[] = setsInput
        .filter(s => setComplete(s))
        .map(s => ({ scoreA: Number.parseInt(s.a), scoreB: Number.parseInt(s.b) }));
      onSaveScore(match.id, wins.A, wins.B, winnerId, filledSets);
    } else {
      onSaveScore(match.id, Number.parseInt(sA) || 0, Number.parseInt(sB) || 0, winnerId);
    }
    setEditing(false);
  };

  const handleWoSelect = (winnerId: string) => {
    if (onWalkover) onWalkover(match.id, winnerId);
    else if (onSaveScore) onSaveScore(match.id, 0, 0, winnerId);
    setWoMode(false);
  };

  const updateSet = (idx: number, field: 'a' | 'b', val: string) => {
    setSetsInput(prev => prev.map((s, i) => i === idx ? { ...s, [field]: val } : s));
  };

  const canSave = useSets
    ? setsInput[0].a !== '' && setsInput[0].b !== ''
    : sA !== '' && sB !== '';

  const existingSets = isFinished && match.sets && match.sets.length > 0 ? match.sets : null;

  const sharedTeamProps = { playerLinks, renderPlayerLink };

  return (
    <div
      className={cn(
        comfortable ? 'w-full sm:w-[260px]' : 'w-[200px]',
        'border rounded-md bg-card shadow-sm overflow-hidden relative group',
        'transition-shadow hover:shadow-md hover:border-primary/40',
        isLive && 'ring-2 ring-destructive',
        editing && 'ring-2 ring-primary',
        isFinished && 'animate-in fade-in duration-300',
        classNameMatch,
      )}
      title={match.nextMatchId && !isFinished && match.nextMatchNumber != null
        ? 'Vencedor vai para M' + match.nextMatchNumber
        : undefined}
    >
      <MatchCardHeader
        match={match}
        isLive={isLive}
        isFinished={isFinished}
        canEdit={canEdit}
        canLive={canLive}
        editing={editing}
        comfortable={comfortable}
        canSave={canSave}
        graphView={graphView}
        setEditing={() => setEditing(false)}
        onSave={handleSave}
        onStartEdit={handleStartEdit}
        onToggleLive={() => { if (onToggleLive) onToggleLive(match.id, !isLive); }}
        onWalkover={() => setWoMode(true)}
      />

      {woMode && (
        <div className="p-2 space-y-1 bg-orange-500/5 border-b">
          <p className="text-[9px] text-orange-600 font-medium text-center">Selecione o vencedor (WO)</p>
          <div className="flex gap-1">
            <button onClick={() => handleWoSelect(match.teamA!.id)} className="flex-1 text-[10px] px-2 py-1 rounded border hover:bg-primary/10 truncate">
              {match.teamA?.name}
            </button>
            <button onClick={() => handleWoSelect(match.teamB!.id)} className="flex-1 text-[10px] px-2 py-1 rounded border hover:bg-primary/10 truncate">
              {match.teamB?.name}
            </button>
          </div>
          <button onClick={() => setWoMode(false)} className="w-full text-[9px] text-muted-foreground hover:underline">Cancelar</button>
        </div>
      )}

      {useSets ? (
        <>
          <TeamNameRow team={match.teamA} setsWon={isFinished ? (match.scoreA ?? 0) : 0} totalSets={isFinished ? 1 : 0} comfortable={comfortable} isWinner={winnerA} onTeamHover={onTeamHover} placeholder={teamAPlaceholder} isWalkoverLoser={isWalkover && !winnerA} {...sharedTeamProps} />
          <TeamNameRow team={match.teamB} setsWon={isFinished ? (match.scoreB ?? 0) : 0} totalSets={isFinished ? 1 : 0} comfortable={comfortable} isWinner={winnerB} onTeamHover={onTeamHover} placeholder={teamBPlaceholder} isWalkoverLoser={isWalkover && !winnerB} {...sharedTeamProps} />
          {existingSets && !editing && !graphView && (
            <div className="border-t">
              {existingSets.map((s, i) => {
                const isDeciding = hasSuperTiebreak && i === existingSets.length - 1 && existingSets.length === 3;
                return (
                  <div key={'set-' + i} className="flex items-center gap-1 px-3 py-0.5 text-[10px] text-muted-foreground border-b last:border-0">
                    <span className="w-10">{isDeciding ? 'S.TB' : 'Set ' + (i + 1)}</span>
                    <span className="font-mono">{s.scoreA} x {s.scoreB}</span>
                  </div>
                );
              })}
            </div>
          )}
          {editing && (() => {
            const { s1show, s2show } = computeSetsProgress();
            return (
              <div className="border-t">
                <SetRow setNum={1} aVal={setsInput[0].a} bVal={setsInput[0].b} onChangeA={v => updateSet(0, 'a', v)} onChangeB={v => updateSet(0, 'b', v)} disabled={false} result={setComplete(setsInput[0]) ? { winnerA: setWinner(setsInput[0]) === 'A' } : null} />
                {s1show && <SetRow setNum={2} aVal={setsInput[1].a} bVal={setsInput[1].b} onChangeA={v => updateSet(1, 'a', v)} onChangeB={v => updateSet(1, 'b', v)} disabled={false} result={setComplete(setsInput[1]) ? { winnerA: setWinner(setsInput[1]) === 'A' } : null} />}
                {s2show && <SetRow setNum={3} label={hasSuperTiebreak ? 'S.TB' : undefined} aVal={setsInput[2].a} bVal={setsInput[2].b} onChangeA={v => updateSet(2, 'a', v)} onChangeB={v => updateSet(2, 'b', v)} disabled={false} result={setComplete(setsInput[2]) ? { winnerA: setWinner(setsInput[2]) === 'A' } : null} />}
              </div>
            );
          })()}
        </>
      ) : (
        <>
          <TeamSlot team={match.teamA} score={isFinished || isLive ? match.scoreA : null} comfortable={comfortable} isWinner={winnerA} isBye={!!(isBye && !match.teamA)} editing={editing} inputValue={sA} onInputChange={setSA} onTeamHover={onTeamHover} placeholder={teamAPlaceholder} isWalkoverLoser={isWalkover && !winnerA} {...sharedTeamProps} />
          <TeamSlot team={match.teamB} score={isFinished || isLive ? match.scoreB : null} comfortable={comfortable} isWinner={winnerB} isBye={!!(isBye && !match.teamB)} editing={editing} inputValue={sB} onInputChange={setSB} onTeamHover={onTeamHover} placeholder={teamBPlaceholder} isWalkoverLoser={isWalkover && !winnerB} {...sharedTeamProps} />
          {editing && sA !== '' && sB !== '' && sA === sB && Number.parseInt(sA) > 0 && (
            <div className="px-2 py-1 text-[9px] text-amber-500 bg-amber-500/5 text-center">
              Placar empatado - salve e marque o vencedor com o trofeu
            </div>
          )}
        </>
      )}

      {editing && match.teamA && match.teamB && (
        <div className="flex border-t">
          <button onClick={() => handleTrophy('A')} className="flex-1 flex items-center justify-center gap-1 py-1.5 text-[10px] hover:bg-primary/10 transition-colors" title={match.teamA.name + ' avanca de fase'}>
            <Trophy className="h-3 w-3 text-primary shrink-0" />
            <span className="truncate max-w-[60px]">{match.teamA.name}</span>
          </button>
          <div className="w-px bg-border shrink-0" />
          <button onClick={() => handleTrophy('B')} className="flex-1 flex items-center justify-center gap-1 py-1.5 text-[10px] hover:bg-primary/10 transition-colors" title={match.teamB.name + ' avanca de fase'}>
            <Trophy className="h-3 w-3 text-primary shrink-0" />
            <span className="truncate max-w-[60px]">{match.teamB.name}</span>
          </button>
        </div>
      )}
    </div>
  );
}

// ─── MatchCardWithBadge ───────────────────────────────────────────────────────

export function MatchCardWithBadge(props: MatchCardProps) {
  return (
    <div className="space-y-1">
      <div className="flex items-center gap-2 justify-center">
        <Trophy className="h-4 w-4 text-primary" />
        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Disputa de 1o e 2o lugar
        </span>
      </div>
      <MatchCard {...props} />
    </div>
  );
}
