import * as React from 'react';

/**
 * Mostra o mesmo conteúdo nos dois temas lado a lado. O painel claro força a classe .light (variaveis do claro mesmo com o
 * Storybook no escuro); o escuro força a classe .dark.
 * O alternador de tema da barra continua valendo para as demais stories.
 */
export function TemasLado({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="light rounded-2xl bg-background p-4 text-foreground">{children}</div>
      <div className="dark rounded-2xl bg-background p-4 text-foreground">{children}</div>
    </div>
  );
}
