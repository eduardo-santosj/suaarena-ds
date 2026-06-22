import type { Meta, StoryObj } from '@storybook/react';
import { Switch } from '../components/ui/switch';
import { Label } from '../components/ui/label';

const meta: Meta<typeof Switch> = {
  title: 'UI/Switch',
  component: Switch,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
};

export default meta;
type Story = StoryObj<typeof Switch>;

export const Default: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Switch id="notif" />
      <Label htmlFor="notif">Notificações por e-mail</Label>
    </div>
  ),
};

export const Checked: Story = {
  name: 'Ativado',
  render: () => (
    <div className="flex items-center gap-2">
      <Switch id="active" defaultChecked />
      <Label htmlFor="active">Inscrições abertas</Label>
    </div>
  ),
};

export const Settings: Story = {
  name: 'Lista de configurações',
  render: () => (
    <div className="space-y-4 w-64">
      {[
        { id: 's1', label: 'Inscrições abertas', checked: true },
        { id: 's2', label: 'Notificar atletas', checked: true },
        { id: 's3', label: 'Modo público', checked: false },
        { id: 's4', label: 'Grand Final Reset', checked: false },
      ].map(({ id, label, checked }) => (
        <div key={id} className="flex items-center justify-between">
          <Label htmlFor={id}>{label}</Label>
          <Switch id={id} defaultChecked={checked} />
        </div>
      ))}
    </div>
  ),
};
