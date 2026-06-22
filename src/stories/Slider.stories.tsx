import type { Meta, StoryObj } from '@storybook/react';
import { Slider } from '../components/ui/slider';

const meta: Meta<typeof Slider> = {
  title: 'UI/Slider',
  component: Slider,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  decorators: [(Story) => <div className="w-80"><Story /></div>],
};

export default meta;
type Story = StoryObj<typeof Slider>;

export const Default: Story = {
  render: () => <Slider defaultValue={[50]} max={100} step={1} />,
};

export const MaxPairs: Story = {
  name: 'Limite de duplas',
  render: () => (
    <div className="space-y-3">
      <div className="flex justify-between text-sm">
        <span>Máximo de duplas</span>
        <span className="font-semibold">32</span>
      </div>
      <Slider defaultValue={[32]} min={4} max={128} step={4} />
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>4</span>
        <span>128</span>
      </div>
    </div>
  ),
};

export const Range: Story = {
  name: 'Intervalo',
  render: () => <Slider defaultValue={[20, 80]} max={100} step={5} />,
};
