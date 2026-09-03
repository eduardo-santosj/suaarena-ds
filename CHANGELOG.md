# Changelog

Todas as mudancas notaveis deste pacote estao documentadas aqui.
Formato baseado em [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).
Este projeto segue [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [0.11.0] - 2026-09-03

### Adicionado

**Tokens de superficie (dark ganha profundidade):**
- `--surface-1` (#171B20, card), `--surface-2` (#1F242A, sheet/popover), `--surface-3` (#272D34, press/hover), com utilitarios `bg-surface-1/2/3`.
- `--card`, `--popover` e `--muted` passam a apontar para as superficies, entao todo `bg-card` existente ganha o novo valor sem mudar codigo.
- Versao clara das tres superficies em `:root`.

**Tokens de estado:**
- `--success` / `--success-foreground` e `--warning` / `--warning-foreground`, com `bg-success`, `text-warning` etc. Antes cada app inventava o seu verde e o seu amarelo.
- No dark, os valores sao os de sistema do iOS (`#30D158`, `#FFD60A`), calibrados para fundo escuro.

**Tipografia:**
- `--font-display` (Poppins, fonte do brand sheet) para titulo, placar e numero grande. Utilitario `font-display`.
- `--font-sans` e `--font-mono` ganham as variaveis `--font-poppins` / `--font-jetbrains` na frente da cadeia; sem elas o fallback e o sistema.

**Tokens como objeto JS (`@eduardo-santosj/ui/tokens`):**
- `src/tokens/tokens.ts` exporta `brand`, `dark`, `light`, `radius`, `fonts`, `typeScale`, `spacing` e `tailwindColors`.
- `tailwindColors` entra direto em `theme.extend.colors` do NativeWind. Fim da copia manual de hex no `tailwind.config.js` do React Native.
- Entrada propria no tsup (sem `"use client"`, sem React).

**Animacao:**
- `animate-pulse-dot` (ponto pulsante do estado "ao vivo").

### Alterado

- **`.dark --background`: #1A1D21 -> #0F1215.** O grafite #1A1D21 continua como cor de marca (`brand-dark`), mas deixa de ser o fundo. Motivo: fundo e card estavam a ~1,15:1 de contraste e o app parecia plano.
- **`.dark --destructive`: `0 62% 30%` -> `3 100% 61%` (#FF453A).** O valor antigo era um vermelho escuro que quase nao se separava do fundo, problema de acessibilidade em botao destrutivo.
- `.dark --border`: `214 11% 20%` -> `213 12% 17%` (hairline mais discreta sobre o fundo novo).
- `--radius`: `0.5rem` -> `0.625rem` (controle passa de 8 para 10px; card usa `rounded-2xl`, palco/sheet `rounded-3xl`).

### Notas de migracao

- Nenhum token foi removido ou renomeado. Consumidores compilam sem mudanca.
- O fundo do dark e o raio mudam visualmente. Revise as telas principais ao subir a versao.
- Para o `--font-display` aparecer, o app precisa carregar Poppins (ex.: `next/font/google` com `variable: '--font-poppins'`). Sem isso, cai em `--font-geist-sans` e depois no sistema.

---

## [0.4.0] a [0.10.0] - 2026-06-22 a 2026-06-27

Versoes publicadas sem entrada aqui. Resumo pelo historico do git:

- **0.10.0** Logo com os SVGs vetorizados do designer.
- **0.7.0** `Logo` ganha `product="torneio" | "ferinos"` para as submarcas.
- **0.6.0** Tabs v2 (orientacao vertical, variante line) e Calendar v2 (react-day-picker v9, range, `CalendarDayButton`).
- **0.5.0** Migracao para Tailwind v4: CSS-first, `@theme inline`, `@tailwindcss/vite`; remove postcss config.
- **0.4.x** Chromatic, scripts `release:patch/minor/major`, correcoes de Storybook e de bloco nao fechado em `tokens.css`.

---

## [0.3.0] - 2026-06-22

### Adicionado

**Componentes de dominio extraidos do torneio (production-ready):**
- `MatchCard` - card de partida completo: modo FTV (placar unico) + BT (sets), ao vivo, walkover, admin, comfortable/graphView. Desacoplado de Next.js e BracketSettingsContext via props diretas.
- `MatchCardWithBadge` - wrapper com badge "Disputa de 1o e 2o lugar"
- `FormField` - wrapper de campo de formulario com Label, hint e erro (compativel com react-hook-form FieldError)
- `PasswordInput` - input de senha com show/hide e regras de validacao configuráveis (min 8 chars)
- `ConfirmDialog` - dialog de confirmacao com variante destructive/default e estado de loading
- `DatePicker` - seletor de data com locale ptBR via date-fns
- `ExpandableDescription` - descricao HTML colapsavel com gradiente e "Leia mais"
- `ChampionshipCardSkeleton` - skeleton do card de campeonato
- `ChampionshipGridSkeleton` - grid de skeletons (count configuravel)
- `TorneioPageSkeleton` - skeleton de pagina completa de torneio
- `RankingSkeleton` - skeleton de pagina de ranking
- `MatchListSkeleton` - skeleton de lista de partidas

**Tipos compartilhados:**
- `BracketMatch`, `Team`, `MatchSet`, `MatchStatus`, `BracketType` - exportados de `@eduardo-santosj/ui`

**Stories (Storybook):**
- `Design System/Introduction` - landing page vitrine do DS com paleta, componentes, instalacao
- `Composed/TournamentListPage` - pagina completa interativa com tabs, busca, favoritos, loading, empty state
- Stories individuais para FormField, PasswordInput, ConfirmDialog, DatePicker, ExpandableDescription, Skeletons, MatchCard

**Fixes:**
- `tokens.css`: alinhado com padrao shadcn (`outline-ring/50`, `font-sans antialiased`)
- Dark mode texto branco corrigido via `body { @apply bg-background text-foreground }`
- Nome do pacote corrigido em todos os comentarios

---

## [0.2.0] - 2026-06-22

### Adicionado

**Componentes de dominio** (`src/components/domain/`)
- `ChampionshipCard` — card de torneio com suporte a imagem, favoritar (controlado/nao controlado), click, todos os status e formatos
- `StatusBadge` — mapeia status do sistema (torneio + inscricao) para Badge com variante e label corretos
- `EmptyState` — placeholder para listas/tabelas vazias com icone, titulo, descricao e slot de acao
- `AvatarGroup` — avatares sobrepostos para duplas/grupos, com overflow "+N" e 3 tamanhos
- `PageHeader` — header padrao de pagina com titulo, descricao, breadcrumb e slot de acoes

**Stories novas**
- `Domain/ChampionshipCard` — 6 stories cobrindo todos os estados e layout grid
- `Domain/StatusBadge` — todos os status de torneio e inscricao
- `Domain/EmptyState` — 4 cenarios reais dos produtos
- `Domain/AvatarGroup` — dupla, overflow e comparacao de tamanhos
- `Domain/PageHeader` — simples, com acoes, com breadcrumb, sem separador
- `Design Tokens/Typography` — headings, body text, pesos, palavras-chave do produto

**Acessibilidade**
- Addon `@storybook/addon-a11y` instalado e configurado — painel de auditoria a11y em todas as stories
- `ChampionshipCard` com `aria-label`, `aria-pressed`, `role="button"` e suporte a teclado (Enter/Space)
- `AvatarGroup` com `role="group"` e `aria-label`

**Documentacao**
- `README.md` com instrucoes de instalacao, configuracao do preset, uso de todos os componentes e tabela de tokens/status
- `CHANGELOG.md` (este arquivo)

### Corrigido

- `defaultTheme: 'dark'` alterado para `'light'` no `.storybook/preview.ts` — botoes apareciam pretos no canvas branco
- Classes `text-brand-primary` / `bg-brand-primary` substituidas por `text-primary` / `bg-primary` (classe invalida silenciosa)
- `tailwind-preset.ts` truncado por edit anterior — reescrito via bash heredoc
- Comentarios com `@sua-arena/ui` atualizados para `@eduardo-santosj/ui`
- Logo stories: background hardcoded por variante, independente do toggle de tema do Storybook
- Card story: reescrita para espelhar o layout real do `ChampionshipCard` do projeto torneio
- `AlertBlock`: conflito de nome `Info` resolvido com alias `Info as InfoIcon`
- `Toast`: prop `title` aceita apenas `string`, nao `ReactNode`
- Imports nao utilizados removidos: `CommandDialog`, `DropdownMenuSub*`, `HelpCircle`

---

## [0.1.0] - 2026-06-01

### Adicionado

- Setup inicial do Design System com Storybook 8.6, tsup, GitHub Packages e GitHub Pages
- 33 componentes shadcn/ui (New York): Accordion, Alert, AlertDialog, Avatar, Badge, Button, Calendar, Card, Checkbox, Collapsible, Command, Dialog, DropdownMenu, HoverCard, Input, Label, Menubar, NavigationMenu, Pagination, Popover, Progress, RadioGroup, ScrollArea, Select, Separator, Sheet, Skeleton, Slider, Switch, Table, Tabs, Textarea, Toast, Toggle, ToggleGroup, Tooltip
- Componente `Alert` customizado com `AlertProvider` e hook `useAlert`
- Componente `Logo` com 6 variantes (horizontal/vertical/icon x dark/white)
- Tokens de marca: CSS variables (`--primary`, `--secondary`, `--background`, etc.) e Tailwind preset
- Stories para todos os componentes shadcn + Icons (lucide-react) + Design Tokens/Cores
- CI/CD: workflow de publish para GitHub Packages e deploy do Storybook para GitHub Pages
