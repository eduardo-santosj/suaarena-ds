import type { Meta, StoryObj } from '@storybook/react';
import { Progress } from '../components/ui/progress';

const meta: Meta<typeof Progress> = {
  title: 'UI/Progress',
  component: Progress,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  decorators: [(Story) => <div className="w-80"><Story /></div>],
};

export default meta;
type Story = StoryObj<typeof Progress>;

export const Default: Story = {
  render: () => <Progress value={60} />,
};

export const TournamentProgress: Story = {
  name: 'Progresso do torneio',
  render: () => (
    <div className="space-y-4">
      {[
        { label: 'Inscrições', value: 87, text: '28/32 duplas' },
        { label: 'Partidas disputadas', value: 45, text: '9/20' },
        { label: 'Check-ins', value: 100, text: '32/32' },
      ].map(({ label, value, text }) => (
        <div key={label} className="space-y-1">
          <div className="flex justify-between text-sm">
            <span>{label}</span>
            <span className="text-muted-foreground">{text}</span>
          </div>
          <Progress value={value} />
        </div>
      ))}
    </div>
  ),
};

export const States: Story = {
  name: 'Estados',
  render: () => (
    <div className="space-y-3">
      <Progress value={0} />
      <Progress value={25} />
      <Progress value={50} />
      <Progress value={75} />
      <Progress value={100} />
    </div>
  ),
};
