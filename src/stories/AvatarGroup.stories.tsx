import type { Meta, StoryObj } from '@storybook/react';
import { AvatarGroup } from '../components/domain/AvatarGroup';

const PLAYERS = [
  { name: 'Carlos Silva' },
  { name: 'Ana Oliveira' },
  { name: 'Pedro Santos' },
  { name: 'Maria Costa' },
  { name: 'Joao Ferreira' },
];

const meta: Meta<typeof AvatarGroup> = {
  title: 'Domain/AvatarGroup',
  component: AvatarGroup,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Avatares sobrepostos para exibir duplas e grupos de jogadores. Exibe iniciais quando sem foto. Overflow vira "+N".',
      },
    },
  },
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    max: { control: { type: 'number', min: 1, max: 10 } },
  },
};

export default meta;
type Story = StoryObj<typeof AvatarGroup>;

export const Dupla: Story = {
  name: 'Dupla (2 jogadores)',
  args: {
    users: PLAYERS.slice(0, 2),
    size: 'md',
  },
};

export const ComOverflow: Story = {
  name: 'Com overflow (+N)',
  args: {
    users: PLAYERS,
    max: 3,
    size: 'md',
  },
};

export const Tamanhos: Story = {
  name: 'Tamanhos',
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex flex-col gap-4">
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <div key={size} className="flex items-center gap-4">
          <span className="text-xs text-muted-foreground w-6">{size}</span>
          <AvatarGroup users={PLAYERS.slice(0, 3)} size={size} />
        </div>
      ))}
    </div>
  ),
};
