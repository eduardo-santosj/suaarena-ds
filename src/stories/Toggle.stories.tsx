import type { Meta, StoryObj } from '@storybook/react';
import { Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight, Eye, EyeOff } from 'lucide-react';
import { Toggle } from '../components/ui/toggle';

const meta: Meta<typeof Toggle> = {
  title: 'UI/Toggle',
  component: Toggle,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
};

export default meta;
type Story = StoryObj<typeof Toggle>;

export const Default: Story = {
  render: () => (
    <Toggle aria-label="Toggle bold">
      <Bold className="h-4 w-4" />
    </Toggle>
  ),
};

export const WithText: Story = {
  name: 'Com texto',
  render: () => (
    <div className="flex gap-2">
      <Toggle aria-label="Toggle italic">
        <Italic className="h-4 w-4 mr-1" />Itálico
      </Toggle>
      <Toggle aria-label="Toggle underline" pressed>
        <Underline className="h-4 w-4 mr-1" />Sublinhado
      </Toggle>
    </div>
  ),
};

export const Alignment: Story = {
  name: 'Alinhamento',
  render: () => (
    <div className="flex gap-1 border rounded-md p-1">
      <Toggle size="sm" aria-label="Alinhar esquerda">
        <AlignLeft className="h-4 w-4" />
      </Toggle>
      <Toggle size="sm" aria-label="Alinhar centro" pressed>
        <AlignCenter className="h-4 w-4" />
      </Toggle>
      <Toggle size="sm" aria-label="Alinhar direita">
        <AlignRight className="h-4 w-4" />
      </Toggle>
    </div>
  ),
};

export const Variants: Story = {
  name: 'Variantes',
  render: () => (
    <div className="flex gap-2 flex-wrap">
      <Toggle variant="default" aria-label="Default">Default</Toggle>
      <Toggle variant="outline" aria-label="Outline">Outline</Toggle>
      <Toggle variant="outline" pressed aria-label="Pressed">Ativo</Toggle>
      <Toggle disabled aria-label="Disabled">Desabilitado</Toggle>
    </div>
  ),
};

export const VisibilityToggle: Story = {
  name: 'Visibilidade',
  render: () => (
    <div className="flex gap-2">
      <Toggle variant="outline" aria-label="Mostrar bracket">
        <Eye className="h-4 w-4 mr-1" />Bracket
      </Toggle>
      <Toggle variant="outline" pressed aria-label="Ocultar scores">
        <EyeOff className="h-4 w-4 mr-1" />Scores
      </Toggle>
    </div>
  ),
};
