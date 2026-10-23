import type { Meta, StoryObj } from '@storybook/react';
import { FormStrip } from '../components/domain/FormStrip';
import { TemasLado } from './_TemasLado';

const meta: Meta<typeof FormStrip> = {
  title: 'Domain/FormStrip',
  component: FormStrip,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  decorators: [(Story) => <div className="max-w-sm"><Story /></div>],
};

export default meta;
type Story = StoryObj<typeof FormStrip>;

export const UltimasCinco: Story = { name: 'Últimas 5', args: { results: ['V', 'V', 'E', 'V', 'D'] } };

export const SoVitorias: Story = { name: 'Só vitórias', args: { results: ['V', 'V', 'V', 'V', 'V'] } };

export const Menos: Story = { name: 'Menos de 5 jogos', args: { results: ['D', 'E'] } };

export const ClaroEEscuro: Story = {
  name: 'Claro e escuro',
  args: UltimasCinco.args,
  render: () => (
    <TemasLado>
      <div className="space-y-2">
        <FormStrip results={['V', 'V', 'E', 'V', 'D']} />
        <FormStrip results={['D', 'D', 'E', 'D', 'D']} label="Últimas 5 do Caio" />
      </div>
    </TemasLado>
  ),
};
