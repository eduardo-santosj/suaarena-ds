# @sua-arena/ui

Design System compartilhado entre **SuaArena** (gestão de arenas) e **Torneio** (plataforma de campeonatos).

- Tokens de design extraídos do projeto Torneio (cores, radius, animações)
- Componentes shadcn/ui + Radix UI com Tailwind
- Storybook 8 para documentação visual
- TypeScript estrito
- Publicado via GitHub Packages

---

## Instalação

### 1. Configure o registro do GitHub Packages

Crie ou edite `~/.npmrc` (global) ou `.npmrc` na raiz do projeto:

```ini
@sua-arena:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=SEU_GITHUB_PAT
```

> Gere o PAT em: GitHub → Settings → Developer settings → Personal access tokens
> Permissões necessárias: `read:packages` (consumers) ou `write:packages` (publisher)

### 2. Instale o pacote

```bash
npm install @sua-arena/ui
```

---

## Configuração no projeto

### Tailwind

```ts
// tailwind.config.ts
import suaArenaPreset from '@sua-arena/ui/tailwind-preset';

export default {
  presets: [suaArenaPreset],
  content: [
    './src/**/*.{ts,tsx}',
    // Inclui os componentes do DS para purge correto
    './node_modules/@sua-arena/ui/dist/**/*.{js,mjs}',
  ],
};
```

### CSS Global

```ts
// app/layout.tsx ou _app.tsx — importe uma vez na raiz
import '@sua-arena/ui/tokens.css';
```

---

## Uso dos componentes

```tsx
import { Button, Badge, Card, CardHeader, CardTitle, Logo } from '@sua-arena/ui';

export function MyComponent() {
  return (
    <Card>
      <CardHeader>
        <Logo variant="horizontal-dark" height={32} />
        <CardTitle>Torneio Open Verão</CardTitle>
      </CardHeader>
      <div className="flex gap-2 p-6 pt-0">
        <Button>Inscrever</Button>
        <Badge variant="success">Vagas disponíveis</Badge>
      </div>
    </Card>
  );
}
```

---

## Componentes disponíveis

| Componente | Descrição |
|---|---|
| `Button` | 6 variantes (default, secondary, outline, destructive, ghost, link), 4 tamanhos |
| `Input` | Campo de texto com suporte a ícone, elemento direito e mensagem de erro |
| `Badge` | Etiqueta inline — variantes extras: `success`, `warning` |
| `Card` | Container com `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter` |
| `Dialog` | Modal acessível via Radix UI |
| `Label` | Label acessível com Radix UI |
| `Select` | Select acessível com Radix UI |
| `Logo` | 6 variantes de logo SVG (icon-orange, icon-white, horizontal-dark, horizontal-white, vertical-dark, vertical-white) |

---

## Tokens de design

As cores são definidas como CSS variables e consumidas pelo Tailwind preset:

| Token | Valor (HSL) | Hex |
|---|---|---|
| `--primary` | 25 100% 58% | #FF7E29 (Laranja Solar) |
| `--secondary` | 190 100% 58% | #29E7FF (Ciano Areia) |
| `--background` dark | 214 11% 12% | #1A1D21 |
| `--background` light | 216 33% 97% | #F5F7FA |
| `--radius` | 0.5rem | — |

---

## Storybook

```bash
npm run storybook   # http://localhost:6006
```

O Storybook documenta todos os componentes com controles interativos e alternância dark/light.

---

## Publicação

```bash
# Build
npm run build

# Publish (requer .npmrc configurado com write:packages)
npm publish
```

Para publicar automaticamente via GitHub Actions, crie `.github/workflows/publish.yml`:

```yaml
name: Publish DS

on:
  push:
    tags:
      - 'v*'

jobs:
  publish:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      packages: write
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          registry-url: 'https://npm.pkg.github.com'
      - run: npm ci
      - run: npm run build
      - run: npm publish
        env:
          NODE_AUTH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

### Workflow de versão

```bash
# 1. Atualiza versão
npm version patch   # 0.1.0 → 0.1.1
npm version minor   # 0.1.0 → 0.2.0
npm version major   # 0.1.0 → 1.0.0

# 2. Git tag é criada automaticamente
git push && git push --tags

# 3. GitHub Actions publica automaticamente
```

---

## Desenvolvimento local com npm link

Para iterar no DS sem publicar:

```bash
# No repo ds/
npm run build:watch   # ou npm link

# No projeto consumidor
npm link @sua-arena/ui
```

---

## Estrutura do pacote

```
ds/
├── src/
│   ├── tokens/
│   │   ├── tokens.css          ← CSS variables (:root + .dark)
│   │   └── tailwind-preset.ts  ← Preset exportado
│   ├── lib/
│   │   └── utils.ts            ← cn() helper
│   ├── components/
│   │   ├── ui/                 ← Button, Input, Badge, Card, Dialog, Label, Select
│   │   └── brand/              ← Logo
│   ├── stories/                ← Storybook stories
│   └── index.ts                ← Barrel export
├── .storybook/
├── package.json
├── tsup.config.ts
└── tailwind.config.ts
```
