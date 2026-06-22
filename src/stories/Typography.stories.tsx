import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta = {
  title: 'Design Tokens/Typography',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Escala tipografica do DS. Usa a escala padrao do Tailwind com font-family configurada via CSS var ' +
          '(--font-geist-sans / --font-geist-mono). Todos os estilos sao classes utilitarias compostas.',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const Headings: Story = {
  name: 'Headings',
  render: () => (
    <div className="space-y-4">
      {[
        { cls: 'text-4xl font-bold tracking-tight', label: 'text-4xl / bold / tracking-tight', sample: 'Campeonato Estadual 2026' },
        { cls: 'text-3xl font-bold tracking-tight', label: 'text-3xl / bold / tracking-tight', sample: 'Torneio Open Verao' },
        { cls: 'text-2xl font-bold tracking-tight', label: 'text-2xl / bold / tracking-tight', sample: 'Categoria Masculino' },
        { cls: 'text-xl font-semibold',             label: 'text-xl / semibold',               sample: 'Ftv Alto Parana' },
        { cls: 'text-lg font-semibold',             label: 'text-lg / semibold',               sample: 'Rodada 1 - Grupo A' },
        { cls: 'text-base font-semibold',           label: 'text-base / semibold',             sample: 'Carlos Silva / Ana Oliveira' },
      ].map(({ cls, label, sample }) => (
        <div key={label} className="border-b border-border pb-3">
          <p className={`${cls} text-foreground`}>{sample}</p>
          <p className="text-xs text-muted-foreground font-mono mt-1">{cls}</p>
        </div>
      ))}
    </div>
  ),
};

export const BodyText: Story = {
  name: 'Body & UI text',
  render: () => (
    <div className="space-y-4">
      {[
        { cls: 'text-base text-foreground',              label: 'text-base',               sample: 'Texto principal de pagina. Descricao do torneio e regras gerais.' },
        { cls: 'text-sm text-foreground',                label: 'text-sm',                 sample: 'Texto secundario. Informacoes de data, local e formato.' },
        { cls: 'text-sm text-muted-foreground',          label: 'text-sm text-muted',      sample: 'Texto de suporte. Subtitulos, labels de campo, dicas.' },
        { cls: 'text-xs text-muted-foreground',          label: 'text-xs text-muted',      sample: 'Texto de metadados. Timestamps, codigos, contadores.' },
        { cls: 'text-xs font-mono text-muted-foreground',label: 'text-xs font-mono',       sample: 'codigo-torneio-2026 / ID: abc123' },
      ].map(({ cls, label, sample }) => (
        <div key={label} className="border-b border-border pb-3">
          <p className={cls}>{sample}</p>
          <p className="text-xs text-muted-foreground font-mono mt-1">{cls}</p>
        </div>
      ))}
    </div>
  ),
};

export const Pesos: Story = {
  name: 'Font weights',
  render: () => (
    <div className="space-y-2">
      {[
        ['font-normal',    'Normal (400) — texto corrido'],
        ['font-medium',    'Medium (500) — labels, botoes'],
        ['font-semibold',  'Semibold (600) — titulos de cards'],
        ['font-bold',      'Bold (700) — page headings'],
      ].map(([cls, label]) => (
        <div key={cls} className="flex items-center gap-4">
          <span className={`text-lg text-foreground w-64 ${cls}`}>SuaArena</span>
          <span className="text-xs text-muted-foreground font-mono">{cls} — {label}</span>
        </div>
      ))}
    </div>
  ),
};

export const PalavrasChave: Story = {
  name: 'Palavras-chave do produto (referencia)',
  render: () => (
    <div className="space-y-6 max-w-lg">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">Campeonato</h2>
        <p className="text-sm text-muted-foreground mt-1">Titulo de pagina — text-2xl font-bold</p>
      </div>
      <div>
        <h3 className="text-xl font-semibold text-foreground">Categoria Masculino A</h3>
        <p className="text-sm text-muted-foreground">Subtitulo de secao — text-xl font-semibold</p>
      </div>
      <div className="rounded-lg border border-border p-4 space-y-1">
        <p className="text-base font-medium text-foreground">Carlos Silva / Ana Oliveira</p>
        <p className="text-sm text-muted-foreground">Dupla Eliminacao | 64 duplas | Curitiba, PR</p>
        <p className="text-xs text-muted-foreground">15/03/2026</p>
      </div>
    </div>
  ),
};
