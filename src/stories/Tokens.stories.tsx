import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta = {
  title: 'Design Tokens/Cores',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Paleta de cores do DS. Todas as cores são definidas como CSS variables (`--primary`, `--secondary`, etc.) e consumidas via Tailwind (`text-primary`, `bg-secondary`, etc.).',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

const SEMANTIC_TOKENS = [
  { name: 'primary',     label: 'Primary',     hex: '#FF7E29', desc: 'Laranja Solar — ações principais, foco, destaque' },
  { name: 'secondary',   label: 'Secondary',   hex: '#29E7FF', desc: 'Ciano Areia — ações secundárias, acentos' },
  { name: 'background',  label: 'Background',  hex: '#1A1D21', desc: 'Fundo escuro da aplicação' },
  { name: 'card',        label: 'Card',        hex: '#1E2126', desc: 'Superfície de cartões' },
  { name: 'muted',       label: 'Muted',       hex: '#2A2D33', desc: 'Superfícies discretas, inputs desabilitados' },
  { name: 'destructive', label: 'Destructive', hex: '#4d1a1a', desc: 'Erros e ações destrutivas' },
  { name: 'border',      label: 'Border',      hex: '#2A2D33', desc: 'Bordas e separadores' },
  { name: 'ring',        label: 'Ring',        hex: '#FF7E29', desc: 'Foco de acessibilidade (= primary)' },
];

function Swatch({ name, label, hex, desc }: { name: string; label: string; hex: string; desc: string }) {
  return (
    <div className="flex items-start gap-4">
      <div
        className={`w-14 h-14 rounded-lg border border-border bg-${name} flex-shrink-0`}
        style={{ background: `hsl(var(--${name}))` }}
      />
      <div>
        <p className="font-medium text-sm text-foreground">{label}</p>
        <p className="text-xs text-muted-foreground font-mono">--{name}</p>
        <p className="text-xs text-muted-foreground font-mono">{hex}</p>
        <p className="text-xs text-muted-foreground mt-1">{desc}</p>
      </div>
    </div>
  );
}

export const SemanticTokens: Story = {
  name: 'Tokens semânticos',
  render: () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-4">
      {SEMANTIC_TOKENS.map((t) => (
        <Swatch key={t.name} {...t} />
      ))}
    </div>
  ),
};

export const BrandColors: Story = {
  name: 'Cores de marca',
  render: () => (
    <div className="flex flex-wrap gap-6 p-4">
      {[
        { color: '#FF7E29', label: 'Laranja Solar', var: 'brand.orange' },
        { color: '#29E7FF', label: 'Ciano Areia',   var: 'brand.cyan'   },
        { color: '#1A1D21', label: 'Fundo escuro',  var: 'brand.dark'   },
        { color: '#F5F7FA', label: 'Branco Gelo',   var: 'brand.light'  },
      ].map(({ color, label, var: v }) => (
        <div key={color} className="text-center">
          <div
            className="w-20 h-20 rounded-xl border border-border shadow-sm mx-auto"
            style={{ background: color }}
          />
          <p className="text-sm font-medium mt-2 text-foreground">{label}</p>
          <p className="text-xs text-muted-foreground font-mono">{color}</p>
          <p className="text-xs text-muted-foreground font-mono">{v}</p>
        </div>
      ))}
    </div>
  ),
};
