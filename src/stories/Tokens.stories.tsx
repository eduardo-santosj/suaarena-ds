import type { Meta, StoryObj } from '@storybook/react';
import { dark, light } from '../tokens/tokens';

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

// 0.12.0: valores lidos de tokens.ts, os dois temas lado a lado.
const SEMANTIC_TOKENS: Array<{ name: string; key: keyof typeof dark; desc: string }> = [
  { name: 'background',        key: 'background',       desc: 'Fundo da tela' },
  { name: 'surface-1',         key: 'surface1',         desc: 'Card' },
  { name: 'surface-2',         key: 'surface2',         desc: 'Sheet, popover, dialogo' },
  { name: 'surface-3',         key: 'surface3',         desc: 'Press, hover, toast, botao secundario' },
  { name: 'stage',             key: 'stage',            desc: 'Palco: o evento ao vivo' },
  { name: 'chrome',            key: 'chrome',           desc: 'Tab bar, action bar, sidebar' },
  { name: 'foreground',        key: 'foreground',       desc: 'Texto' },
  { name: 'muted-foreground',  key: 'mutedForeground',  desc: 'Texto 2' },
  { name: 'subtle-foreground', key: 'subtleForeground', desc: 'Texto 3, rotulo mono' },
  { name: 'primary',           key: 'primary',          desc: 'Laranja: acao e destaque' },
  { name: 'you',               key: 'you',              desc: 'Ciano: voce e votacao' },
  { name: 'star',              key: 'star',             desc: 'Amarelo: estrela e resultado' },
  { name: 'destructive',       key: 'destructive',      desc: 'Destrutivo, erro, dinheiro em aberto' },
  { name: 'success',           key: 'success',          desc: 'Confirmado, fim de jogo' },
  { name: 'offline',           key: 'offline',          desc: 'Faixa de sem conexao' },
  { name: 'border',            key: 'border',           desc: 'Borda (hairline = border/60)' },
];

function Swatch({ name, desc, hexLight, hexDark }: { name: string; desc: string; hexLight: string; hexDark: string }) {
  return (
    <div className="flex items-center gap-4">
      <div className="flex gap-1.5 flex-shrink-0">
        <div className="light w-12 h-12 rounded-lg border border-border" style={{ background: `hsl(var(--${name}))` }} />
        <div className="dark w-12 h-12 rounded-lg border border-border" style={{ background: `hsl(var(--${name}))` }} />
      </div>
      <div>
        <p className="font-mono text-xs text-foreground">--{name}</p>
        <p className="text-xs text-muted-foreground font-mono">{hexLight} · {hexDark}</p>
        <p className="text-xs text-muted-foreground mt-0.5">{desc}</p>
      </div>
    </div>
  );
}

export const SemanticTokens: Story = {
  name: 'Tokens semânticos',
  render: () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 p-4">
      {SEMANTIC_TOKENS.map((t) => (
        <Swatch key={t.name} name={t.name} desc={t.desc} hexLight={light[t.key]} hexDark={dark[t.key]} />
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
