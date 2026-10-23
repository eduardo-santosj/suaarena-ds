import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { CircleDot, Goal, Grid2x2, Fingerprint, Volleyball } from 'lucide-react';
import { SavedIndicator } from '../components/custom/SavedIndicator';
import { StepChecklist } from '../components/custom/StepChecklist';
import { SportPicker } from '../components/custom/SportPicker';
import { AuthShell, AuthDivider, SocialButton } from '../components/custom/AuthShell';
import { FerinoCard } from '../components/domain/FerinoCard';
import { SegmentedProgress } from '../components/custom/SegmentedProgress';
import { Input } from '../components/ui/input';
import { FormField } from '../components/domain/FormField';
import { TemasLado } from './_TemasLado';

const meta: Meta = {
  title: 'Layout/Config e entrada',
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj;

export const Salvo: Story = {
  name: 'Indicador salvo de seção',
  render: () => (
    <div className="flex flex-col gap-3">
      <SavedIndicator status="saving" />
      <SavedIndicator status="saved" when="há 3 segundos" />
      <SavedIndicator status="error" />
      <SavedIndicator status="idle" />
    </div>
  ),
};

const PASSOS = [
  { key: 'criar', title: 'Criar o Ferino', description: 'Ferino da Brava · futevôlei', done: true },
  { key: 'chamar', title: 'Chamar a galera', description: 'Mande o link no grupo, eles pedem entrada' },
  { key: 'torneio', title: 'Criar o primeiro torneio', description: 'Nome, data e local' },
  { key: 'pontos', title: 'Conferir a pontuação', description: '1º 10 · 2º 5 · 3º 1 · último −1' },
];

export const Roteiro: Story = {
  name: 'Roteiro de passos',
  render: () => <div className="max-w-sm"><StepChecklist steps={PASSOS} onStepClick={() => {}} /></div>,
};

const ESPORTES = [
  { key: 'futevolei', label: 'Futevôlei', description: 'torneios · duplas', icon: <Volleyball /> },
  { key: 'futebol', label: 'Futebol', description: 'rodadas · times', icon: <Goal /> },
  { key: 'beach', label: 'Beach Tennis', description: 'torneios · duplas', icon: <CircleDot /> },
  { key: 'padel', label: 'Padel', description: 'torneios · duplas', icon: <Grid2x2 /> },
];

function Esporte() {
  const [v, setV] = React.useState<string | null>('futevolei');
  return (
    <div className="max-w-sm space-y-3">
      <SegmentedProgress total={2} current={1} />
      <SportPicker options={ESPORTES} value={v} onChange={setV} />
    </div>
  );
}

export const Esportes: Story = { name: 'Seletor de esporte', render: () => <Esporte /> };

export const Ferinos: Story = {
  name: 'Cartão de Ferino',
  render: () => (
    <div className="max-w-sm space-y-2.5">
      <FerinoCard name="FFTVI" initials="FF" meta="futevôlei · admin · 48 atletas" active live="Copa dos Ferinos ao vivo" pending={2} onClick={() => {}} />
      <FerinoCard name="Pelada de Quinta" initials="PQ" tone="success" meta="futebol · atleta · 31 atletas" info="Rodada hoje 20h · você ainda não confirmou" onClick={() => {}} />
      <FerinoCard name="Ferino da Brava" initials="FB" tone="neutral" meta="futevôlei" />
    </div>
  ),
};

function Login() {
  return (
    <AuthShell title="Bem-vindo de volta" subtitle="Entre pra ver o seu Ferino." footer={<>Não tem conta? <b className="text-primary">Criar conta</b></>}>
      <SocialButton provider="passkey" label="Entrar com Face ID" icon={<Fingerprint className="h-[18px] w-[18px]" />} />
      <SocialButton provider="google" label="Continuar com Google" />
      <AuthDivider />
      <FormField label="E-mail"><Input type="email" placeholder="edu@email.com" /></FormField>
      <FormField label="Senha"><Input type="password" placeholder="senha" /></FormField>
      <button type="button" className="h-[50px] rounded-xl bg-primary text-sm font-semibold text-primary-foreground">Entrar</button>
    </AuthShell>
  );
}

export const Entrada: Story = {
  name: 'Casca de login',
  parameters: { layout: 'fullscreen' },
  render: () => <Login />,
};

export const ClaroEEscuro: Story = {
  name: 'Claro e escuro',
  render: () => (
    <TemasLado>
      <div className="space-y-4">
        <div className="flex items-center gap-4"><SavedIndicator status="saved" when="há 3 segundos" /><SavedIndicator status="error" /></div>
        <StepChecklist steps={PASSOS} />
        <SportPicker options={ESPORTES} value="futebol" onChange={() => {}} />
        <FerinoCard name="FFTVI" initials="FF" meta="futevôlei · admin · 48 atletas" active live="Copa dos Ferinos ao vivo" pending={2} />
        <FerinoCard name="Pelada de Quinta" initials="PQ" tone="success" meta="futebol · atleta" info="Rodada hoje 20h" />
      </div>
    </TemasLado>
  ),
};
