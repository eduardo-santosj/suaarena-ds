import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from '../components/ui/badge';
import {
  Table, TableBody, TableCaption, TableCell,
  TableHead, TableHeader, TableRow,
} from '../components/ui/table';

const meta: Meta<typeof Table> = {
  title: 'UI/Table',
  component: Table,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof Table>;

const pairs = [
  { pos: 1, pair: 'Eduardo / Carlos',  pts: 12, wins: 4, losses: 0 },
  { pos: 2, pair: 'Roberto / Felipe',  pts: 9,  wins: 3, losses: 1 },
  { pos: 3, pair: 'Lucas / André',     pts: 6,  wins: 2, losses: 2 },
  { pos: 4, pair: 'Marcos / Thiago',   pts: 3,  wins: 1, losses: 3 },
  { pos: 5, pair: 'Pedro / João',      pts: 0,  wins: 0, losses: 4 },
];

export const Standings: Story = {
  name: 'Classificação de grupo',
  render: () => (
    <Table>
      <TableCaption>Grupo A — Beach Tennis Categoria B</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-10">#</TableHead>
          <TableHead>Dupla</TableHead>
          <TableHead className="text-center">V</TableHead>
          <TableHead className="text-center">D</TableHead>
          <TableHead className="text-right">Pts</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {pairs.map((row) => (
          <TableRow key={row.pos}>
            <TableCell className="font-medium">{row.pos}</TableCell>
            <TableCell>{row.pair}</TableCell>
            <TableCell className="text-center">{row.wins}</TableCell>
            <TableCell className="text-center">{row.losses}</TableCell>
            <TableCell className="text-right font-semibold">{row.pts}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
};

export const Registrations: Story = {
  name: 'Lista de inscrições',
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Dupla</TableHead>
          <TableHead>Categoria</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {[
          { pair: 'Eduardo / Carlos', cat: 'BT-B', status: 'confirmed' },
          { pair: 'Roberto / Felipe', cat: 'BT-A', status: 'awaiting_payment' },
          { pair: 'Lucas / André',    cat: 'BT-B', status: 'confirmed' },
        ].map((row) => (
          <TableRow key={row.pair}>
            <TableCell>{row.pair}</TableCell>
            <TableCell>{row.cat}</TableCell>
            <TableCell>
              {row.status === 'confirmed'
                ? <Badge variant="success">Confirmado</Badge>
                : <Badge variant="warning">Aguardando</Badge>}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
};
