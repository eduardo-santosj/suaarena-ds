"use client";

import { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { cn } from '../../lib/utils';

const DEFAULT_COLLAPSED_HEIGHT = 120;

export interface ExpandableDescriptionProps {
  /** HTML sanitizado para renderizar como descricao */
  html: string;
  collapsedHeight?: number;
  expandLabel?: string;
  collapseLabel?: string;
  className?: string;
}

export function ExpandableDescription({
  html,
  collapsedHeight = DEFAULT_COLLAPSED_HEIGHT,
  expandLabel = 'Leia mais',
  collapseLabel = 'Recolher',
  className,
}: ExpandableDescriptionProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [needsTruncation, setNeedsTruncation] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [contentHeight, setContentHeight] = useState<number>(0);

  useEffect(() => {
    if (!contentRef.current) return;
    const h = contentRef.current.scrollHeight;
    setContentHeight(h);
    setNeedsTruncation(h > collapsedHeight + 20);
  }, [html, collapsedHeight]);

  const toggle = useCallback(() => setExpanded(prev => !prev), []);

  const maxHeight =
    expanded || !needsTruncation ? contentHeight || 9999 : collapsedHeight;

  return (
    <Card className={cn('mb-8', className)}>
      <CardContent className="p-6 relative">
        <div
          ref={contentRef}
          className="prose prose-sm dark:prose-invert max-w-none prose-p:my-2 prose-headings:my-3 break-words overflow-hidden [&_*]:max-w-full transition-[max-height] duration-300 ease-in-out"
          style={{ maxHeight }}
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: html }}
        />
        {needsTruncation && !expanded && (
          <div className="absolute bottom-12 left-0 right-0 h-12 bg-gradient-to-t from-card to-transparent pointer-events-none" />
        )}
        {needsTruncation && (
          <button
            type="button"
            onClick={toggle}
            className="flex items-center gap-1 text-xs font-medium text-primary hover:underline mt-2 mx-auto"
          >
            {expanded ? (
              <>{collapseLabel} <ChevronUp className="h-3.5 w-3.5" /></>
            ) : (
              <>{expandLabel} <ChevronDown className="h-3.5 w-3.5" /></>
            )}
          </button>
        )}
      </CardContent>
    </Card>
  );
}
