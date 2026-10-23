import type { Meta, StoryObj } from '@storybook/react';
import { Podium } from '../components/domain/Podium';
import { TemasLado } from './_TemasLado';

const meta: Meta<typeof Podium> = {
  title: 'Domain/Podium',
  component: Podium,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof Podium>;

export const ClaroEEscuro: Story = {
  name: 'Claro e escuro',
  render: () => (
    <TemasLado>
      <Podium entries={[{ name: 'Bruno', points: 30 }, { name: 'Diego', points: 22 }, { name: 'Caio', points: 18 }]} />
    </TemasLado>
  ),
};

export const DoisColocados: Story = {
  name: 'Só dois colocados',
  render: () => (
    <TemasLado>
      <Podium entries={[{ name: 'Cristopher', points: 12 }, { name: 'Gabriel', points: 8 }]} />
    </TemasLado>
  ),
};
