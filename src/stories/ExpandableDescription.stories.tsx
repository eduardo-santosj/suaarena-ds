import type { Meta, StoryObj } from '@storybook/react';
import { ExpandableDescription } from '../components/domain/ExpandableDescription';

const meta: Meta<typeof ExpandableDescription> = {
  title: 'Domain/ExpandableDescription',
  component: ExpandableDescription,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof ExpandableDescription>;

const SHORT_HTML = '<p>Campeonato de Beach Tennis em Sao Paulo. Inscricoes abertas.</p>';

const LONG_HTML = `
<h2>Campeonato Estadual de Beach Tennis SP 2024</h2>
<p>O maior campeonato de Beach Tennis do estado de Sao Paulo esta de volta com uma edicao ainda maior e mais competitiva.</p>
<h3>Formato</h3>
<p>O campeonato sera disputado no formato de dupla eliminacao, com fases de grupos seguidas de eliminatorias diretas. Cada partida sera melhor de 3 sets, com super tie-break no terceiro set.</p>
<h3>Categorias</h3>
<ul>
  <li>Masculino A - Pro</li>
  <li>Masculino B</li>
  <li>Masculino C</li>
  <li>Feminino A - Pro</li>
  <li>Feminino B</li>
  <li>Misto A</li>
  <li>Misto B</li>
</ul>
<h3>Local</h3>
<p>Arena Beach Tennis - Av. Paulista, 1000 - Sao Paulo/SP. Quadras profissionais com areia especial importada, iluminacao noturna e transmissao ao vivo.</p>
<h3>Premiacoes</h3>
<p>Premiacoes em dinheiro para as categorias Pro, com premios especiais para os vencedores de todas as categorias. Trofeus e medalhas para o podium de cada categoria.</p>
`;

export const TextoCurto: Story = {
  args: { html: SHORT_HTML },
};

export const TextoLongo: Story = {
  args: { html: LONG_HTML },
};

export const JaExpandido: Story = {
  args: { html: LONG_HTML, collapsedHeight: 9999 },
};
