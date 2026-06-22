import type { Meta, StoryObj } from '@storybook/react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';

const meta: Meta<typeof Accordion> = {
  title: 'UI/Accordion',
  component: Accordion,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  decorators: [(Story) => <div className="w-96"><Story /></div>],
};

export default meta;
type Story = StoryObj<typeof Accordion>;

export const Default: Story = {
  render: () => (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger>Como funciona o torneio?</AccordionTrigger>
        <AccordionContent>
          O torneio usa formato de dupla eliminação. Você é eliminado apenas após duas derrotas.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Como me inscrever?</AccordionTrigger>
        <AccordionContent>
          Acesse a página do torneio, escolha a categoria e clique em "Inscrever-se".
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Quais são as categorias disponíveis?</AccordionTrigger>
        <AccordionContent>
          Categorias C, B, A e Open para Beach Tennis. Para Futevôlei, masculino e feminino.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const Multiple: Story = {
  name: 'Múltiplos abertos',
  render: () => (
    <Accordion type="multiple">
      <AccordionItem value="item-1">
        <AccordionTrigger>Regras gerais</AccordionTrigger>
        <AccordionContent>Sets até 6 games, tie-break no 6x6. Super tie-break no terceiro set.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Premiação</AccordionTrigger>
        <AccordionContent>1º lugar: R$ 1.000 + troféu. 2º lugar: R$ 500. 3º lugar: R$ 250.</AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};
