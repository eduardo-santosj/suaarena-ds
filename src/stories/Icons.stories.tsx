import type { Meta, StoryObj } from '@storybook/react';
import {
  // Navigation & Layout
  Home, Menu, X, ChevronLeft, ChevronRight, ChevronUp, ChevronDown,
  ChevronsLeft, ChevronsRight, ChevronsUpDown, ArrowLeft, ArrowRight,
  ArrowUp, ArrowDown, LayoutGrid, List, Layers,
  // Actions
  Plus, Minus, Edit, Edit2, Edit3, Trash, Trash2, Copy, Clipboard,
  Save, Upload, Download, Share, Share2, ExternalLink, Link, Link2,
  Search, Filter, SlidersHorizontal, Settings, Settings2, RefreshCw,
  RotateCcw, RotateCw, Undo, Redo, ZoomIn, ZoomOut,
  // Status & Feedback
  Check, CheckCircle, CheckCircle2, AlertCircle, AlertTriangle,
  Info, HelpCircle, Bell, BellOff, Eye, EyeOff, Lock, Unlock,
  // Users & Social
  User, UserPlus, UserMinus, UserCheck, Users, UserCircle,
  // Tournament & Sports
  Trophy, Medal, Star, Crown, Flag, Target, Award,
  // Files & Media
  File, FileText, FileImage, Image, Camera, Video, Music,
  // Communication
  Mail, MessageCircle, MessageSquare, Phone, Send,
  // Data & Analytics
  BarChart, BarChart2, BarChart3, BarChart4, LineChart, PieChart,
  TrendingUp, TrendingDown, Activity,
  // Calendar & Time
  Calendar, CalendarDays, CalendarCheck, Clock, Timer,
  // Location
  MapPin, Map, Navigation, Compass,
  // UI Elements
  Circle, Square, Triangle, Dot, Grip, GripVertical,
  // Misc
  QrCode, Wifi, WifiOff, Loader, Loader2, MoreHorizontal, MoreVertical,
  LogIn, LogOut, Shield, ShieldCheck, Heart, Bookmark, Tag,
  Zap, Globe, Package, Box, Inbox, Archive, Folder,
} from 'lucide-react';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { useState } from 'react';

const meta: Meta = {
  title: 'Icons/Lucide Icons',
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj;

type IconEntry = { name: string; icon: React.ElementType };

const ALL_ICONS: IconEntry[] = [
  // Navigation & Layout
  { name: 'Home', icon: Home }, { name: 'Menu', icon: Menu }, { name: 'X', icon: X },
  { name: 'ChevronLeft', icon: ChevronLeft }, { name: 'ChevronRight', icon: ChevronRight },
  { name: 'ChevronUp', icon: ChevronUp }, { name: 'ChevronDown', icon: ChevronDown },
  { name: 'ChevronsLeft', icon: ChevronsLeft }, { name: 'ChevronsRight', icon: ChevronsRight },
  { name: 'ChevronsUpDown', icon: ChevronsUpDown }, { name: 'ArrowLeft', icon: ArrowLeft },
  { name: 'ArrowRight', icon: ArrowRight }, { name: 'ArrowUp', icon: ArrowUp },
  { name: 'ArrowDown', icon: ArrowDown }, { name: 'LayoutGrid', icon: LayoutGrid },
  { name: 'List', icon: List }, { name: 'Layers', icon: Layers },
  // Actions
  { name: 'Plus', icon: Plus }, { name: 'Minus', icon: Minus },
  { name: 'Edit', icon: Edit }, { name: 'Edit2', icon: Edit2 }, { name: 'Edit3', icon: Edit3 },
  { name: 'Trash', icon: Trash }, { name: 'Trash2', icon: Trash2 },
  { name: 'Copy', icon: Copy }, { name: 'Clipboard', icon: Clipboard },
  { name: 'Save', icon: Save }, { name: 'Upload', icon: Upload }, { name: 'Download', icon: Download },
  { name: 'Share', icon: Share }, { name: 'Share2', icon: Share2 },
  { name: 'ExternalLink', icon: ExternalLink }, { name: 'Link', icon: Link }, { name: 'Link2', icon: Link2 },
  { name: 'Search', icon: Search }, { name: 'Filter', icon: Filter },
  { name: 'SlidersHorizontal', icon: SlidersHorizontal },
  { name: 'Settings', icon: Settings }, { name: 'Settings2', icon: Settings2 },
  { name: 'RefreshCw', icon: RefreshCw }, { name: 'RotateCcw', icon: RotateCcw },
  { name: 'RotateCw', icon: RotateCw }, { name: 'Undo', icon: Undo }, { name: 'Redo', icon: Redo },
  { name: 'ZoomIn', icon: ZoomIn }, { name: 'ZoomOut', icon: ZoomOut },
  // Status & Feedback
  { name: 'Check', icon: Check }, { name: 'CheckCircle', icon: CheckCircle },
  { name: 'CheckCircle2', icon: CheckCircle2 }, { name: 'AlertCircle', icon: AlertCircle },
  { name: 'AlertTriangle', icon: AlertTriangle }, { name: 'Info', icon: Info },
  { name: 'HelpCircle', icon: HelpCircle }, { name: 'Bell', icon: Bell }, { name: 'BellOff', icon: BellOff },
  { name: 'Eye', icon: Eye }, { name: 'EyeOff', icon: EyeOff },
  { name: 'Lock', icon: Lock }, { name: 'Unlock', icon: Unlock },
  // Users
  { name: 'User', icon: User }, { name: 'UserPlus', icon: UserPlus },
  { name: 'UserMinus', icon: UserMinus }, { name: 'UserCheck', icon: UserCheck },
  { name: 'Users', icon: Users }, { name: 'UserCircle', icon: UserCircle },
  // Tournament & Sports
  { name: 'Trophy', icon: Trophy }, { name: 'Medal', icon: Medal },
  { name: 'Star', icon: Star }, { name: 'Crown', icon: Crown },
  { name: 'Flag', icon: Flag }, { name: 'Target', icon: Target }, { name: 'Award', icon: Award },
  // Files & Media
  { name: 'File', icon: File }, { name: 'FileText', icon: FileText },
  { name: 'FileImage', icon: FileImage }, { name: 'Image', icon: Image },
  { name: 'Camera', icon: Camera }, { name: 'Video', icon: Video }, { name: 'Music', icon: Music },
  // Communication
  { name: 'Mail', icon: Mail }, { name: 'MessageCircle', icon: MessageCircle },
  { name: 'MessageSquare', icon: MessageSquare }, { name: 'Phone', icon: Phone },
  { name: 'Send', icon: Send },
  // Data & Analytics
  { name: 'BarChart', icon: BarChart }, { name: 'BarChart2', icon: BarChart2 },
  { name: 'BarChart3', icon: BarChart3 }, { name: 'BarChart4', icon: BarChart4 },
  { name: 'LineChart', icon: LineChart }, { name: 'PieChart', icon: PieChart },
  { name: 'TrendingUp', icon: TrendingUp }, { name: 'TrendingDown', icon: TrendingDown },
  { name: 'Activity', icon: Activity },
  // Calendar & Time
  { name: 'Calendar', icon: Calendar }, { name: 'CalendarDays', icon: CalendarDays },
  { name: 'CalendarCheck', icon: CalendarCheck }, { name: 'Clock', icon: Clock },
  { name: 'Timer', icon: Timer },
  // Location
  { name: 'MapPin', icon: MapPin }, { name: 'Map', icon: Map },
  { name: 'Navigation', icon: Navigation }, { name: 'Compass', icon: Compass },
  // UI Elements
  { name: 'Circle', icon: Circle }, { name: 'Square', icon: Square },
  { name: 'Triangle', icon: Triangle }, { name: 'Dot', icon: Dot },
  { name: 'Grip', icon: Grip }, { name: 'GripVertical', icon: GripVertical },
  // Misc
  { name: 'QrCode', icon: QrCode }, { name: 'Wifi', icon: Wifi }, { name: 'WifiOff', icon: WifiOff },
  { name: 'Loader', icon: Loader }, { name: 'Loader2', icon: Loader2 },
  { name: 'MoreHorizontal', icon: MoreHorizontal }, { name: 'MoreVertical', icon: MoreVertical },
  { name: 'LogIn', icon: LogIn }, { name: 'LogOut', icon: LogOut },
  { name: 'Shield', icon: Shield }, { name: 'ShieldCheck', icon: ShieldCheck },
  { name: 'Heart', icon: Heart }, { name: 'Bookmark', icon: Bookmark }, { name: 'Tag', icon: Tag },
  { name: 'Zap', icon: Zap }, { name: 'Globe', icon: Globe }, { name: 'Package', icon: Package },
  { name: 'Box', icon: Box }, { name: 'Inbox', icon: Inbox },
  { name: 'Archive', icon: Archive }, { name: 'Folder', icon: Folder },
];

export const Showcase: Story = {
  name: 'Showcase (busca)',
  render: () => {
    const [query, setQuery] = useState('');
    const filtered = ALL_ICONS.filter((e) =>
      e.name.toLowerCase().includes(query.toLowerCase()),
    );
    return (
      <div className="p-8 space-y-6">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold">Lucide Icons</h2>
          <p className="text-sm text-muted-foreground">
            {ALL_ICONS.length} ícones disponíveis via <code className="font-mono text-xs bg-muted px-1 py-0.5 rounded">lucide-react</code>
          </p>
        </div>
        <div className="relative w-full max-w-xs">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            className="pl-8"
            placeholder="Buscar ícone..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        {filtered.length === 0 ? (
          <p className="text-sm text-muted-foreground">Nenhum ícone encontrado.</p>
        ) : (
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-3">
            {filtered.map(({ name, icon: Icon }) => (
              <button
                key={name}
                className="flex flex-col items-center gap-2 p-3 rounded-lg border hover:border-primary hover:bg-accent transition-colors group"
                onClick={() => navigator.clipboard.writeText(name)}
                title={`Copiar: ${name}`}
              >
                <Icon className="h-5 w-5 text-foreground group-hover:text-primary transition-colors" />
                <span className="text-[10px] text-muted-foreground text-center leading-tight break-all">
                  {name}
                </span>
              </button>
            ))}
          </div>
        )}
        <p className="text-xs text-muted-foreground">Clique em um ícone para copiar o nome.</p>
      </div>
    );
  },
};

export const Sizes: Story = {
  name: 'Tamanhos',
  render: () => (
    <div className="p-8 space-y-8">
      <h2 className="text-xl font-semibold">Tamanhos de ícones</h2>
      <div className="flex items-end gap-8 flex-wrap">
        {[12, 16, 20, 24, 32, 40, 48].map((size) => (
          <div key={size} className="flex flex-col items-center gap-2">
            <Trophy style={{ width: size, height: size }} className="text-primary" />
            <span className="text-xs text-muted-foreground">{size}px</span>
          </div>
        ))}
      </div>
    </div>
  ),
};

export const Colors: Story = {
  name: 'Cores do DS',
  render: () => (
    <div className="p-8 space-y-8">
      <h2 className="text-xl font-semibold">Ícones com cores do Design System</h2>
      <div className="flex gap-6 flex-wrap items-center">
        <div className="flex flex-col items-center gap-2">
          <Trophy className="h-8 w-8 text-primary" />
          <Badge>brand-primary</Badge>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Trophy className="h-8 w-8 text-secondary" />
          <Badge variant="secondary">brand-secondary</Badge>
        </div>
        <div className="flex flex-col items-center gap-2">
          <CheckCircle className="h-8 w-8 text-green-500" />
          <Badge className="bg-green-500">success</Badge>
        </div>
        <div className="flex flex-col items-center gap-2">
          <AlertCircle className="h-8 w-8 text-destructive" />
          <Badge variant="destructive">destructive</Badge>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Info className="h-8 w-8 text-blue-500" />
          <Badge className="bg-blue-500">info</Badge>
        </div>
        <div className="flex flex-col items-center gap-2">
          <AlertTriangle className="h-8 w-8 text-yellow-500" />
          <Badge className="bg-yellow-500 text-black">warning</Badge>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Trophy className="h-8 w-8 text-muted-foreground" />
          <Badge variant="outline">muted</Badge>
        </div>
      </div>
    </div>
  ),
};

export const TournamentIcons: Story = {
  name: 'Torneio & Esportes',
  render: () => (
    <div className="p-8 space-y-6">
      <h2 className="text-xl font-semibold">Ícones de torneio e esportes</h2>
      <div className="grid grid-cols-4 gap-4">
        {[
          { icon: Trophy, label: 'Campeão' },
          { icon: Medal, label: 'Medalha' },
          { icon: Award, label: 'Prêmio' },
          { icon: Crown, label: 'Coroa' },
          { icon: Star, label: 'Destaque' },
          { icon: Flag, label: 'Bandeira' },
          { icon: Target, label: 'Meta' },
          { icon: Users, label: 'Duplas' },
          { icon: User, label: 'Atleta' },
          { icon: UserCheck, label: 'Check-in' },
          { icon: Activity, label: 'Atividade' },
          { icon: BarChart2, label: 'Ranking' },
        ].map(({ icon: Icon, label }) => (
          <div key={label} className="flex flex-col items-center gap-2 p-4 rounded-lg border">
            <Icon className="h-8 w-8 text-primary" />
            <span className="text-xs font-medium">{label}</span>
          </div>
        ))}
      </div>
    </div>
  ),
};
