# Changelog

Todas as mudancas notaveis deste pacote estao documentadas aqui.
Formato baseado em [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).
Este projeto segue [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
