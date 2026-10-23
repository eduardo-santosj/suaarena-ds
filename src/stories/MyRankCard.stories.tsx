import type { Meta, StoryObj } from '@storybook/react';
import { MyRankCard } from '../components/domain/MyRankCard';
import { TemasLado } from './_TemasLado';

const meta: Meta<typeof MyRankCard> = {
  title: 'Domain/MyRankCard',
  component: MyRankCard,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  decorators: [(Story) => <div className="max-w-sm"><Story /></div>],
};

export default meta;
type Story = StoryObj<typeof MyRankCard>;

export const PlanoGratis: Story = {
  name: 'Plano grátis (só a posição)',
  args: { position: 6, initials: 'ES', subtitle: 'de 31 atletas · 12 pts em outubro' },
};

export const ComPontosEDica: Story = {
  name: 'Com pontos e dica',
  args: {
    position: 4,
    initials: 'ES',
    title: 'Você',
    subtitle: '3 torneios · 1 título',
    points: 15,
    footer: (
      <>
        Faltam <b className="text-foreground">3 pontos</b> pro pódio. Próxima chance: sáb, 1º de novembro.
      </>
    ),
  },
};

export const ClaroEEscuro: Story = {
  name: 'Claro e escuro',
  args: PlanoGratis.args,
  render: () => (
    <TemasLado>
      <div className="space-y-2">
        <MyRankCard position={6} initials="ES" subtitle="de 31 atletas · 12 pts em outubro" />
        <MyRankCard position={4} initials="ES" title="Você" subtitle="3 torneios · 1 título" points={15} footer="Faltam 3 pontos pro pódio." />
      </div>
    </TemasLado>
  ),
};
