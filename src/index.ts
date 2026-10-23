// -- Utilitarios ----------------------------------------------------------------
export { cn } from './lib/utils';

// -- Tipos de Bracket ------------------------------------------------------------
export type { BracketMatch, BracketType, MatchStatus, Team, MatchSet } from './types/bracket';

// ==============================================================================
// COMPONENTES DE DOMINIO (torneio + suaArena)
// ==============================================================================
export {
  // existentes
  ChampionshipCard,
  StatusBadge,
  EmptyState,
  AvatarGroup,
  PageHeader,
  // novos utilitarios
  FormField,
  PasswordInput,
  isPasswordValid,
  ConfirmDialog,
  DatePicker,
  ExpandableDescription,
  // skeletons
  ChampionshipCardSkeleton,
  ChampionshipGridSkeleton,
  TorneioPageSkeleton,
  RankingSkeleton,
  MatchListSkeleton,
  // bracket
  MatchCard,
  MatchCardWithBadge,
  // placar e ranking (0.12.0)
  Podium,
  StatStrip,
  ScoreBoard,
  // rodada da pelada (0.13.0)
  TeamCard,
  // torneio (0.13.0)
  StandingsTable,
  MatchRow,
  // ranking e perfil (0.14.0)
  FormStrip,
  MyRankCard,
  // entrada e configuracao (0.15.0)
  FerinoCard,
} from './components/domain';
export type {
  ChampionshipCardProps,
  ChampionshipCardData,
  TournamentFormat,
  StatusBadgeProps,
  StatusBadgeVariant,
  TournamentStatus,
  RegistrationStatus,
  EmptyStateProps,
  AvatarGroupProps,
  AvatarGroupUser,
  PageHeaderProps,
  FormFieldProps,
  FormFieldError,
  PasswordInputProps,
  PasswordRule,
  ConfirmDialogProps,
  DatePickerProps,
  ExpandableDescriptionProps,
  ChampionshipGridSkeletonProps,
  MatchCardProps,
  PodiumProps,
  PodiumEntry,
  StatStripProps,
  Stat,
  ScoreBoardProps,
  TeamCardProps,
  TeamCardPlayer,
  TeamCardStatusTone,
  StandingsTableProps,
  StandingsRow,
  MatchRowProps,
  MatchRowSide,
  MatchRowTagTone,
  FormStripProps,
  FormResult,
  MyRankCardProps,
  FerinoCardProps,
  FerinoCardTone,
  ScoreSide,
} from './components/domain';

// -- Icones (lucide-react re-export) -------------------------------------------
export * from 'lucide-react';

// ==============================================================================
// COMPONENTES SHADCN / RADIX UI
// ==============================================================================

// Accordion
export { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from './components/ui/accordion';

// Alert inline (shadcn) -- bloco estatico, NAO e o toast customizado
export {
  AlertBlock,
  AlertBlockTitle,
  AlertBlockDescription,
  alertBlockVariants,
} from './components/ui/alert-shadcn';

// Alert Dialog
export {
  AlertDialog, AlertDialogPortal, AlertDialogOverlay, AlertDialogTrigger,
  AlertDialogContent, AlertDialogHeader, AlertDialogFooter,
  AlertDialogTitle, AlertDialogDescription, AlertDialogAction, AlertDialogCancel,
} from './components/ui/alert-dialog';

// Avatar
export { Avatar, AvatarImage, AvatarFallback } from './components/ui/avatar';

// Badge
export { Badge, badgeVariants } from './components/ui/badge';
export type { BadgeProps } from './components/ui/badge';

// Button
export { Button, buttonVariants } from './components/ui/button';
export type { ButtonProps } from './components/ui/button';

// Card
export {
  Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent,
} from './components/ui/card';

// Checkbox
export { Checkbox } from './components/ui/checkbox';

// Collapsible
export { Collapsible, CollapsibleTrigger, CollapsibleContent } from './components/ui/collapsible';

// Command
export {
  Command, CommandDialog, CommandInput, CommandList, CommandEmpty,
  CommandGroup, CommandItem, CommandShortcut, CommandSeparator,
} from './components/ui/command';

// Dialog
export {
  Dialog, DialogPortal, DialogOverlay, DialogTrigger, DialogClose,
  DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription,
} from './components/ui/dialog';

// Dropdown Menu
export {
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuCheckboxItem, DropdownMenuRadioItem, DropdownMenuLabel,
  DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuGroup, DropdownMenuPortal,
  DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuRadioGroup,
} from './components/ui/dropdown-menu';

// Input
export { Input } from './components/ui/input';
export type { InputProps } from './components/ui/input';

// Label
export { Label } from './components/ui/label';

// Pagination
export {
  Pagination, PaginationContent, PaginationLink, PaginationItem,
  PaginationPrevious, PaginationNext, PaginationEllipsis,
} from './components/ui/pagination';

// Popover
export { Popover, PopoverTrigger, PopoverContent, PopoverAnchor } from './components/ui/popover';

// Progress
export { Progress } from './components/ui/progress';

// Radio Group
export { RadioGroup, RadioGroupItem } from './components/ui/radio-group';

// Scroll Area
export { ScrollArea, ScrollBar } from './components/ui/scroll-area';

// Select
export {
  Select, SelectGroup, SelectValue, SelectTrigger, SelectContent,
  SelectLabel, SelectItem, SelectSeparator,
  SelectScrollUpButton, SelectScrollDownButton,
} from './components/ui/select';

// Separator
export { Separator } from './components/ui/separator';

// Sheet
export {
  Sheet, SheetPortal, SheetOverlay, SheetTrigger, SheetClose,
  SheetContent, SheetHeader, SheetFooter, SheetTitle, SheetDescription,
} from './components/ui/sheet';

// Skeleton
export { Skeleton } from './components/ui/skeleton';

// Slider
export { Slider } from './components/ui/slider';

// Switch
export { Switch } from './components/ui/switch';

// Table
export {
  Table, TableHeader, TableBody, TableFooter,
  TableHead, TableRow, TableCell, TableCaption,
} from './components/ui/table';

// Tabs
export { Tabs, TabsList, TabsTrigger, TabsContent, tabsListVariants } from './components/ui/tabs';

// Textarea
export { Textarea } from './components/ui/textarea';

// Toggle
export { Toggle, toggleVariants } from './components/ui/toggle';

// Toggle Group
export { ToggleGroup, ToggleGroupItem } from './components/ui/toggle-group';

// Tooltip
export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from './components/ui/tooltip';

// Hover Card
export { HoverCard, HoverCardTrigger, HoverCardContent } from './components/ui/hover-card';

// Menubar
export {
  Menubar, MenubarMenu, MenubarTrigger, MenubarContent, MenubarItem, MenubarSeparator,
  MenubarLabel, MenubarCheckboxItem, MenubarRadioGroup, MenubarRadioItem, MenubarPortal,
  MenubarSubContent, MenubarSubTrigger, MenubarGroup, MenubarSub, MenubarShortcut,
} from './components/ui/menubar';

// Navigation Menu
export {
  navigationMenuTriggerStyle,
  NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuContent,
  NavigationMenuTrigger, NavigationMenuLink, NavigationMenuIndicator, NavigationMenuViewport,
} from './components/ui/navigation-menu';

// Toast (Radix) - primitivos para toasts com estado
export {
  ToastProvider, ToastViewport, Toast, ToastTitle, ToastDescription, ToastClose, ToastAction, toastVariants,
} from './components/ui/toast';
export type { ToastProps, ToastActionElement } from './components/ui/toast';
export { Toaster } from './components/ui/toaster';
export { useToast, toast } from './components/ui/use-toast';

// Calendar
export { Calendar, CalendarDayButton } from './components/ui/calendar';
export type { CalendarProps } from './components/ui/calendar';

// ==============================================================================
// COMPONENTES CUSTOMIZADOS (design original SuaArena/Torneio)
// ==============================================================================

// Alert Toast -- toast com auto-dismiss, posicionado no canto da tela
export { Alert, AlertProvider, useAlert } from './components/custom';
export type { AlertType, AlertProps } from './components/custom';

// Peças do novo layout (0.12.0)
export { PillTabs, DateRow, GroupedList, Row, Stepper, SkeletonBlock } from './components/custom';
// Rodada da pelada (0.13.0)
export { ProgressRing, StarVote, SegmentedProgress } from './components/custom';
export type {
  ProgressRingProps, ProgressRingTone, StarVoteProps, StarVoteTone, StarVoteSize,
  SegmentedProgressProps,
} from './components/custom';

// Ranking, perfil e avisos (0.14.0)
export {
  BarChart, NotificationBell, NoticeItem, NotificationPanel, NotificationMenu, PermissionCard,
} from './components/custom';
export type {
  BarChartProps, BarChartBar, NotificationBellProps, NoticeItemProps, NoticeKind, NoticeTone,
  NotificationPanelProps, NotificationMenuProps, PermissionCardProps,
} from './components/custom';

// Config, entrada e telao (0.15.0)
export {
  SavedIndicator, StepChecklist, SportPicker, QrBlock, AuthShell, SocialButton, AuthDivider,
  TvShell, TvPanel, TvRow, TvScore,
} from './components/custom';
export type {
  SavedIndicatorProps, SavedStatus, StepChecklistProps, ChecklistStep, SportPickerProps, SportOption,
  QrBlockProps, AuthShellProps, SocialButtonProps, TvShellProps, TvPanelProps, TvRowProps, TvScoreProps, TvScoreSide,
} from './components/custom';

// Passkey, offline e estados (0.16.0)
export {
  OfflineBanner, StaleTag, QueueItem, agoLabel, PasskeySheet, SessionExpiredSheet,
  DelayedSkeleton, StageSkeleton, DateRowSkeleton, ListRowSkeleton, ScreenSkeleton,
} from './components/custom';
export type {
  OfflineBannerProps, StaleTagProps, QueueItemProps, QueueStatus, PasskeySheetProps, SessionExpiredSheetProps,
  DelayedSkeletonProps, ScreenSkeletonProps,
} from './components/custom';
export type {
  PillTabOption, PillTabsProps, DateRowProps, GroupedListProps, RowProps, StepperProps, SkeletonBlockProps,
} from './components/custom';
export { Stage, StageLabel, LiveTag, ActionBar, ActionToast, ActionToastProvider, useActionToast } from './components/custom';
export type {
  StageProps, StageTone, StageLabelProps, LiveTagProps, ActionBarProps,
  ActionToastProps, ActionToastOptions, ActionToastTone,
} from './components/custom';

// ==============================================================================
// CASCAS DO APP (0.12.0): navegacao de tres abas, Ferino ativo, aparencia
// ==============================================================================

export { BottomNav, AppSidebar, FerinoPill, ThemeSwitcher, eventsLabel, navItems } from './components/shell';
export type {
  BottomNavProps, AppSidebarProps, AppSidebarFerino, FerinoPillProps,
  ThemeSwitcherProps, ThemePreference, NavTab, NavProps,
} from './components/shell';

// ==============================================================================
// MARCA
// ==============================================================================

export { Logo } from './components/brand';
export type { LogoProps, LogoProduct } from './components/brand';
