import type { Meta, StoryObj } from '@storybook/react';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';

const meta: Meta<typeof Avatar> = {
  title: 'UI/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const WithImage: Story = {
  name: 'Com imagem',
  render: () => (
    <Avatar>
      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  ),
};

export const Fallback: Story = {
  name: 'Fallback (sem imagem)',
  render: () => (
    <Avatar>
      <AvatarImage src="/broken.png" alt="Usuário" />
      <AvatarFallback>EJ</AvatarFallback>
    </Avatar>
  ),
};

export const Sizes: Story = {
  name: 'Tamanhos',
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar className="h-6 w-6">
        <AvatarFallback className="text-xs">XS</AvatarFallback>
      </Avatar>
      <Avatar className="h-8 w-8">
        <AvatarFallback className="text-xs">SM</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback>MD</AvatarFallback>
      </Avatar>
      <Avatar className="h-12 w-12">
        <AvatarFallback>LG</AvatarFallback>
      </Avatar>
      <Avatar className="h-16 w-16">
        <AvatarFallback className="text-lg">XL</AvatarFallback>
      </Avatar>
    </div>
  ),
};

export const PlayerPair: Story = {
  name: 'Dupla de jogadores',
  render: () => (
    <div className="flex items-center gap-3">
      <div className="flex -space-x-2">
        <Avatar className="border-2 border-background">
          <AvatarFallback>EJ</AvatarFallback>
        </Avatar>
        <Avatar className="border-2 border-background">
          <AvatarFallback>MS</AvatarFallback>
        </Avatar>
      </div>
      <div>
        <p className="text-sm font-medium">Eduardo / Maria</p>
        <p className="text-xs text-muted-foreground">Categoria B</p>
      </div>
    </div>
  ),
};
