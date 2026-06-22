import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta = {
  title: 'Design System/Introduction',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: { toc: false },
  },
};
export default meta;
type Story = StoryObj;

function ColorSwatch({ name, cls, hex }: { name: string; cls: string; hex: string }) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className={cls + ' h-14 rounded-lg border'} />
      <div>
        <p className="text-xs font-semibold">{name}</p>
        <p className="text-xs text-muted-foreground font-mono">{hex}</p>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-4">
      <h2 className="text-xl font-bold border-b pb-2">{title}</h2>
      {children}
    </section>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="border rounded-xl p-4 bg-card text-center">
      <p className="text-3xl font-bold text-primary">{value}</p>
      <p className="text-sm text-muted-foreground mt-1">{label}</p>
    </div>
  );
}

export const Overview: Story = {
  name: 'Overview',
  render: () => (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero */}
      <div className="bg-gradient-to-br from-primary/10 via-background to-secondary/10 px-8 py-16 border-b">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-1.5 text-sm font-semibold">
            <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
            v0.3.0 - Producao
          </div>
          <h1 className="text-5xl font-bold tracking-tight">
            @eduardo-santosj/ui
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Design System compartilhado entre os produtos <strong className="text-foreground">SuaArena</strong> e <strong className="text-foreground">Torneio</strong>.
            Construido sobre shadcn/ui, Radix UI e Tailwind CSS com identidade visual propria.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <a
              href="https://github.com/eduardosantosj/suaarena-ds"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground rounded-lg px-4 py-2 text-sm font-semibold hover:bg-primary/90 transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://github.com/eduardosantosj?tab=packages"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 border rounded-lg px-4 py-2 text-sm font-medium hover:bg-muted transition-colors"
            >
              npm Package
            </a>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="max-w-4xl mx-auto px-8 py-12 space-y-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard value="45+" label="Componentes UI" />
          <StatCard value="15+" label="Componentes de Dominio" />
          <StatCard value="50+" label="Stories Storybook" />
          <StatCard value="2" label="Produtos em Producao" />
        </div>

        {/* Instalacao rapida */}
        <Section title="Instalacao rapida">
          <p className="text-sm text-muted-foreground">Configure o <code className="bg-muted px-1.5 py-0.5 rounded text-xs">.npmrc</code> e instale:</p>
          <pre className="bg-muted rounded-xl p-4 text-xs font-mono overflow-x-auto">
{`# .npmrc
@eduardo-santosj:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=YOUR_GITHUB_PAT

# instalar
npm install @eduardo-santosj/ui`}
          </pre>
          <pre className="bg-muted rounded-xl p-4 text-xs font-mono overflow-x-auto">
{`// tailwind.config.ts
import dsPreset from '@eduardo-santosj/ui/tailwind-preset';

export default {
  presets: [dsPreset],
  content: [
    './src/**/*.{ts,tsx}',
    './node_modules/@eduardo-santosj/ui/dist/**',
  ],
};`}
          </pre>
          <pre className="bg-muted rounded-xl p-4 text-xs font-mono overflow-x-auto">
{`// globals.css (ou layout raiz)
import '@eduardo-santosj/ui/tokens.css';`}
          </pre>
        </Section>

        {/* Paleta */}
        <Section title="Paleta de Cores">
          <p className="text-sm text-muted-foreground">Identidade visual da plataforma. Variaveis CSS com suporte a dark mode via <code className="bg-muted px-1.5 py-0.5 rounded text-xs">.dark</code>.</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <ColorSwatch name="Laranja Solar" cls="bg-primary" hex="#FF7E29" />
            <ColorSwatch name="Ciano Areia" cls="bg-secondary" hex="#29E7FF" />
            <ColorSwatch name="Branco Gelo" cls="bg-[#F5F7FA] dark:border-border" hex="#F5F7FA" />
            <ColorSwatch name="Escuro" cls="bg-[#1A1D21]" hex="#1A1D21" />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-2">
            <ColorSwatch name="Background" cls="bg-background border" hex="var(--background)" />
            <ColorSwatch name="Card" cls="bg-card border" hex="var(--card)" />
            <ColorSwatch name="Muted" cls="bg-muted" hex="var(--muted)" />
            <ColorSwatch name="Destructive" cls="bg-destructive" hex="var(--destructive)" />
          </div>
        </Section>

        {/* Componentes */}
        <Section title="Componentes Incluidos">
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h3 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">Primitivos (shadcn/Radix)</h3>
              <ul className="space-y-1 text-sm">
                {['Button', 'Input', 'Select', 'Dialog', 'Sheet', 'Tabs', 'Table', 'Badge', 'Card', 'Avatar', 'Calendar', 'Toast', 'Accordion', 'DropdownMenu', 'NavigationMenu', 'Tooltip', '+ 30 mais...'].map(c => (
                  <li key={c} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                    {c}
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">Dominio (torneio / suaArena)</h3>
              <ul className="space-y-1 text-sm">
                {[
                  'ChampionshipCard',
                  'StatusBadge',
                  'MatchCard (FTV + BT, sets, ao vivo)',
                  'FormField',
                  'PasswordInput',
                  'ConfirmDialog',
                  'DatePicker (ptBR)',
                  'ExpandableDescription',
                  'PageHeader',
                  'EmptyState',
                  'AvatarGroup',
                  'Skeletons (Card, Grid, Page)',
                  'Tipos: BracketMatch, Team, MatchSet',
                ].map(c => (
                  <li key={c} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-secondary shrink-0" />
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Section>

        {/* Stack */}
        <Section title="Stack Tecnica">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm">
            {[
              { tech: 'React 18+', desc: 'Peer dependency' },
              { tech: 'TypeScript', desc: 'Tipagem forte end-to-end' },
              { tech: 'Tailwind CSS 3+', desc: 'Preset incluido no pacote' },
              { tech: 'Radix UI', desc: 'Primitivos acessiveis' },
              { tech: 'shadcn/ui', desc: 'Estilo new-york' },
              { tech: 'Dark Mode', desc: 'Via classe .dark' },
            ].map(({ tech, desc }) => (
              <div key={tech} className="border rounded-lg p-3 bg-card">
                <p className="font-semibold text-xs">{tech}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{desc}</p>
              </div>
            ))}
          </div>
        </Section>
      </div>

      {/* Footer */}
      <div className="border-t mt-8 px-8 py-6 bg-muted/30">
        <div className="max-w-4xl mx-auto flex items-center justify-between text-xs text-muted-foreground">
          <span>@eduardo-santosj/ui - Design System</span>
          <span>Eduardo Jacinto - eduardosantosj2@gmail.com</span>
        </div>
      </div>
    </div>
  ),
};
