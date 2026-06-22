# @eduardo-santosj/ui

Design System compartilhado dos produtos **SuaArena** e **Torneio**. Baseado em shadcn/ui (New York), Radix UI, Tailwind CSS e tokens de marca proprios.

**Storybook:** https://eduardo-santosj.github.io/suaarena-ds

---

## Instalacao

O pacote e publicado no GitHub Packages. Configure a autenticacao antes de instalar:

```bash
# .npmrc (na raiz do projeto consumidor)
@eduardo-santosj:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

```bash
npm install @eduardo-santosj/ui
```

---

## Configuracao

### 1. Tailwind preset

```ts
// tailwind.config.ts
import dsPreset from '@eduardo-santosj/ui/tailwind-preset';

export default {
  presets: [dsPreset],
  content: [
    './src/**/*.{ts,tsx}',
    './node_modules/@eduardo-santosj/ui/dist/**/*.{js,mjs}',
  ],
};
```

### 2. CSS tokens (uma vez, na raiz da app)

```ts
// app/layout.tsx ou _app.tsx
import '@eduardo-santosj/ui/tokens.css';
```

> O `tokens.css` define as CSS variables (`--primary`, `--background`, etc.) e as keyframes de animacao.

### 3. Dark mode (opcional)

O preset usa `darkMode: ['class']`. Para ativar o tema escuro, adicione a classe `dark` ao `<html>`:

```tsx
<html className="dark">
```

---

## Uso

### Componentes UI (shadcn/ui)

```tsx
import { Button, Badge, Card, CardHeader, CardTitle, Input, Dialog } from '@eduardo-santosj/ui';
```

### Componentes de dominio

```tsx
import {
  ChampionshipCard,
  StatusBadge,
  EmptyState,
  AvatarGroup,
  PageHeader,
} from '@eduardo-santosj/ui';

// Card de torneio
<ChampionshipCard
  championship={{
    id: '1',
    name: 'Open Verao 2026',
    format: 'double',
    city: 'Sao Paulo',
    state: 'SP',
    eventDate: '15/07/2026',
    status: 'active',
    registrationOpen: true,
  }}
  showFavorite
  onClick={() => router.push('/torneio/1')}
/>

// Status de torneio ou inscricao
<StatusBadge status="registration_open" />
<StatusBadge status="confirmed" />
<StatusBadge status="awaiting_payment" />

// Estado vazio
<EmptyState
  icon={Trophy}
  title="Nenhum torneio encontrado"
  description="Crie seu primeiro campeonato para comecar."
  action={<Button>Criar torneio</Button>}
/>

// Grupo de avatares
<AvatarGroup
  users={[{ name: 'Carlos Silva' }, { name: 'Ana Oliveira' }]}
  size="md"
/>

// Header padrao de pagina
<PageHeader
  title="Meus torneios"
  description="Gerencie todos os seus campeonatos"
  actions={<Button>Novo torneio</Button>}
/>
```

### Logo

```tsx
import { Logo } from '@eduardo-santosj/ui';

<Logo variant="horizontal-dark" height={40} />
// Variantes: horizontal-dark | horizontal-white | icon-orange | icon-white | vertical-dark | vertical-white
```

### Icones

O pacote re-exporta todos os icones do `lucide-react`:

```tsx
import { Trophy, Users, Calendar, MapPin } from '@eduardo-santosj/ui';
```

### Utilitarios

```tsx
import { cn } from '@eduardo-santosj/ui';
// Equivalente a clsx + tailwind-merge
```

---

## Tokens de marca

| Token           | Valor       | Uso                          |
|-----------------|-------------|------------------------------|
| `--primary`     | `#FF7E29`   | Laranja Solar — acoes, foco  |
| `--secondary`   | `#29E7FF`   | Ciano Areia — destaques      |
| `--background`  | `#F5F7FA`   | Fundo light                  |
| `--background`  | `#1A1D21`   | Fundo dark                   |
| `brand.orange`  | `#FF7E29`   | Classe Tailwind: `bg-brand-orange` |
| `brand.cyan`    | `#29E7FF`   | Classe Tailwind: `bg-brand-cyan` |

---

## Status de torneio

| Status              | Label                  | Componente            |
|---------------------|------------------------|-----------------------|
| `registration_open` | Inscricoes abertas     | Badge secondary       |
| `active`            | Em andamento           | Badge default         |
| `in_progress`       | Em andamento           | Badge default         |
| `finished`          | Finalizado             | Badge outline         |
| `cancelled`         | Cancelado              | Badge destructive     |
| `confirmed`         | Confirmado             | Badge verde           |
| `awaiting_payment`  | Aguardando pagamento   | Badge amarelo outline |
| `pending`           | Pendente               | Badge outline         |

---

## Versoes

Consulte o [CHANGELOG](./CHANGELOG.md) para historico de versoes.
