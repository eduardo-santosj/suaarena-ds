import type { Meta, StoryObj } from '@storybook/react';
import {
  Select, SelectContent, SelectGroup, SelectItem,
  SelectLabel, SelectTrigger, SelectValue,
} from '../components/ui/select';

const meta: Meta<typeof Select> = {
  title: 'UI/Select',
  component: Select,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  decorators: [(Story) => <div className="w-64"><Story /></div>],
};

export default meta;
type Story = StoryObj<typeof Select>;

export const Default: Story = {
  render: () => (
    <Select>
      <SelectTrigger>
        <SelectValue placeholder="Selecione a categoria" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="c">Beach Tennis C</SelectItem>
        <SelectItem value="b">Beach Tennis B</SelectItem>
        <SelectItem value="a">Beach Tennis A</SelectItem>
        <SelectItem value="open">Beach Tennis Open</SelectItem>
      </SelectContent>
    </Select>
  ),
};

export const WithGroups: Story = {
  name: 'Com grupos',
  render: () => (
    <Select>
      <SelectTrigger>
        <SelectValue placeholder="Selecione o esporte" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Beach Tennis</SelectLabel>
          <SelectItem value="bt-c">Categoria C</SelectItem>
          <SelectItem value="bt-b">Categoria B</SelectItem>
          <SelectItem value="bt-a">Categoria A</SelectItem>
          <SelectItem value="bt-open">Open</SelectItem>
        </SelectGroup>
        <SelectGroup>
          <SelectLabel>Futevôlei</SelectLabel>
          <SelectItem value="ftv-masc">Masculino</SelectItem>
          <SelectItem value="ftv-fem">Feminino</SelectItem>
          <SelectItem value="ftv-misto">Misto</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  ),
};

export const Disabled: Story = {
  name: 'Desabilitado',
  render: () => (
    <Select disabled>
      <SelectTrigger>
        <SelectValue placeholder="Inscrições encerradas" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="x">-</SelectItem>
      </SelectContent>
    </Select>
  ),
};
