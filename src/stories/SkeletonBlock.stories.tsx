import type { Meta, StoryObj } from '@storybook/react';
import { SkeletonBlock } from '../components/custom/Skeleton';
import { TemasLado } from './_TemasLado';

const meta: Meta<typeof SkeletonBlock> = {
  title: 'Layout/SkeletonBlock',
  component: SkeletonBlock,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: { description: { component: 'Pulsa de leve; com "reduzir movimento" ligado no sistema fica parado (motion-safe).' } },
  },
};

export default meta;
type Story = StoryObj<typeof SkeletonBlock>;

function LinhaData() {
  return (
    <div className="flex items-stretch overflow-hidden rounded-[14px] bg-surface-1">
      <div className="flex w-[52px] flex-col items-center gap-1 border-r border-border py-3">
        <SkeletonBlock width={20} height={8} />
        <SkeletonBlock width={26} height={18} />
        <SkeletonBlock width={20} height={8} />
      </div>
      <div className="flex flex-1 flex-col justify-center gap-2 px-3">
        <SkeletonBlock width="70%" height={14} />
        <SkeletonBlock width="45%" height={10} />
      </div>
    </div>
  );
}

function Lista() {
  return (
    <div className="space-y-2">
      <SkeletonBlock height={120} radius={18} />
      <LinhaData />
      <LinhaData />
      <LinhaData />
    </div>
  );
}

export const Basico: Story = {
  args: { width: 240, height: 14 },
};

export const ListaDeEventos: Story = {
  name: 'Lista de eventos',
  render: () => <div className="max-w-sm"><Lista /></div>,
};

export const ClaroEEscuro: Story = {
  name: 'Claro e escuro',
  render: () => <div className="max-w-3xl"><TemasLado><Lista /></TemasLado></div>,
};
