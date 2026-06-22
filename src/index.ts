// ── Utilitários ──────────────────────────────────────────────────────────────
export { cn } from './lib/utils';

// ── Ícones (lucide-react re-export) ──────────────────────────────────────────
export * from 'lucide-react';

// ════════════════════════════════════════════════════════════════════════════
// COMPONENTES SHADCN / RADIX UI
// ════════════════════════════════════════════════════════════════════════════

// Accordion
export { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from './components/ui/accordion';

// Alert inline (shadcn) — bloco estático, NÃO é o toast customizado
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
export { Tabs, TabsList, TabsTrigger, TabsContent } from './components/ui/tabs';

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

// Toast (Radix) — primitivos para toasts com estado
export {
  type ToastProps, type ToastActionElement,
  ToastProvider, ToastViewport, Toast, ToastTitle, ToastDescription, ToastClose, ToastAction, toastVariants,
} from './components/ui/toast';
export { Toaster } from './components/ui/toaster';
export { useToast, toast } from './components/ui/use-toast';

// Calendar
export { Calendar } from './components/ui/calendar';
export type { CalendarProps } from './components/ui/calendar';

// ════════════════════════════════════════════════════════════════════════════
// COMPONENTES CUSTOMIZADOS (design original SuaArena/Torneio)
// ════════════════════════════════════════════════════════════════════════════

// Alert Toast — toast com auto-dismiss, posicionado no canto da tela
export { Alert, AlertProvider, useAlert } from './components/custom';
export type { AlertType, AlertProps } from './components/custom';

// ════════════════════════════════════════════════════════════════════════════
// MARCA
// ════════════════════════════════════════════════════════════════════════════

export { Logo } from './components/brand';
export type { LogoProps } from './components/brand';
