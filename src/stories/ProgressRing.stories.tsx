import type { Meta, StoryObj } from '@storybook/react';
import { ProgressRing } from '../components/custom/ProgressRing';
import { TemasLado } from './_TemasLado';

const meta: Meta<typeof ProgressRing> = {
  title: 'Layout/ProgressRing',
  component: ProgressRing,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
};

export default meta;
type Story = StoryObj<typeof ProgressRing>;

export const Presenca: Story = {
  args: { value: 14 / 22, label: '14', caption: 'de 22' },
};

export const Cheio: Story = { args: { value: 1, label: '22', caption: 'de 22' } };

export const Vazio: Story = { args: { value: 0, label: '0', caption: 'de 22' } };

export const Tons: Story = {
  render: () => (
    <div className="flex items-center gap-6">
      <ProgressRing value={0.64} label="14" caption="de 22" />
      <ProgressRing value={0.64} tone="you" label="14" caption="de 22" />
      <ProgressRing value={0.64} tone="success" label="14" caption="pagos" />
      <ProgressRing value={0.64} size={72} stroke={6} tone="foreground" label="64%" />
    </div>
  ),
};

export const ClaroEEscuro: Story = {
  name: 'Claro e escuro',
  render: () => (
    <div className="w-[560px] max-w-full">
      <TemasLado>
        <div className="flex items-center gap-4 rounded-2xl bg-stage p-4">
          <ProgressRing value={14 / 22} label="14" caption="de 22" />
          <div className="flex flex-col gap-1.5">
            <span className="text-base font-bold text-foreground">Você vai?</span>
            <span className="text-[12.5px] leading-snug text-muted-foreground">Faltam 2 pra fechar 4 times.</span>
          </div>
        </div>
      </TemasLado>
    </div>
  ),
};
