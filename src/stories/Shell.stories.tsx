import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { BottomNav } from '../components/shell/BottomNav';
import { AppSidebar } from '../components/shell/AppSidebar';
import { FerinoPill } from '../components/shell/FerinoPill';
import { ThemeSwitcher, type ThemePreference } from '../components/shell/ThemeSwitcher';
import type { NavTab } from '../components/shell/nav';
import { TemasLado } from './_TemasLado';

const meta: Meta = {
  title: 'Cascas/Navegação e aparência',
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj;

function Nav({ sport }: { sport: string }) {
  const [tab, setTab] = useState<NavTab>('eventos');
  return <BottomNav sport={sport} active={tab} onSelect={setTab} badges={{ config: 3 }} className="-mx-4 -mb-4 rounded-b-2xl" />;
}

function Sidebar() {
  const [tab, setTab] = useState<NavTab>('eventos');
  return (
    <div className="h-[420px] flex -m-4 rounded-2xl overflow-hidden">
      <AppSidebar
        sport="futevolei"
        active={tab}
        onSelect={setTab}
        ferino={{ name: 'FFTVI', subtitle: 'admin · futevôlei' }}
        onFerinoClick={() => {}}
        footer={<span className="px-2.5 text-xs text-subtle-foreground">rodapé (plano, conta, sair)</span>}
      />
    </div>
  );
}

function Aparencia() {
  const [v, setV] = useState<ThemePreference>('system');
  return <ThemeSwitcher value={v} onChange={setV} />;
}

export const BottomNavStory: Story = {
  name: 'BottomNav: claro e escuro (3 abas)',
  render: () => (
    <div className="flex flex-col gap-6">
      <TemasLado><Nav sport="futevolei" /></TemasLado>
      <TemasLado><Nav sport="futebol" /></TemasLado>
    </div>
  ),
};

export const AppSidebarStory: Story = {
  name: 'AppSidebar: claro e escuro',
  render: () => <TemasLado><Sidebar /></TemasLado>,
};

export const FerinoPillStory: Story = {
  name: 'FerinoPill: claro e escuro',
  render: () => (
    <TemasLado>
      <div className="flex flex-wrap gap-2">
        <FerinoPill label="FFTVI" onClick={() => {}} />
        <FerinoPill label="Pelada de Quinta" />
      </div>
    </TemasLado>
  ),
};

export const ThemeSwitcherStory: Story = {
  name: 'ThemeSwitcher (K3): claro e escuro',
  render: () => <TemasLado><Aparencia /></TemasLado>,
};
