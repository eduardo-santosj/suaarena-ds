import type { Meta, StoryObj } from '@storybook/react';
import { RadioGroup, RadioGroupItem } from '../components/ui/radio-group';
import { Label } from '../components/ui/label';

const meta: Meta<typeof RadioGroup> = {
  title: 'UI/RadioGroup',
  component: RadioGroup,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
};

export default meta;
type Story = StoryObj<typeof RadioGroup>;

export const Default: Story = {
  render: () => (
    <RadioGroup defaultValue="double">
      {[
        { value: 'single', label: 'Eliminação Simples' },
        { value: 'double', label: 'Dupla Eliminação' },
        { value: 'groups', label: 'Fase de Grupos' },
        { value: 'swiss',  label: 'Swiss System' },
      ].map(({ value, label }) => (
        <div key={value} className="flex items-center gap-2">
          <RadioGroupItem value={value} id={value} />
          <Label htmlFor={value}>{label}</Label>
        </div>
      ))}
    </RadioGroup>
  ),
};

export const Horizontal: Story = {
  name: 'Horizontal',
  render: () => (
    <RadioGroup defaultValue="b" className="flex gap-6">
      {['C', 'B', 'A', 'Open'].map((cat) => (
        <div key={cat} className="flex items-center gap-2">
          <RadioGroupItem value={cat.toLowerCase()} id={`cat-${cat}`} />
          <Label htmlFor={`cat-${cat}`}>{cat}</Label>
        </div>
      ))}
    </RadioGroup>
  ),
};
