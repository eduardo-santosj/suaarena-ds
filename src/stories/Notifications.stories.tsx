import type { Meta, StoryObj } from '@storybook/react';
import { NotificationBell } from '../components/custom/NotificationBell';
import { NoticeItem } from '../components/custom/NoticeItem';
import { NotificationPanel, NotificationMenu } from '../components/custom/NotificationPanel';
import { PermissionCard } from '../components/custom/PermissionCard';
import { TemasLado } from './_TemasLado';

const meta: Meta = {
  title: 'Layout/Avisos',
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj;

export const Sino: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <NotificationBell />
      <NotificationBell unread={3} />
      <NotificationBell unread size="lg" />
      <NotificationBell unread size="lg" active />
    </div>
  ),
};

export const Assuntos: Story = {
  name: 'Itens por assunto',
  render: () => (
    <div className="max-w-sm space-y-2">
      <NoticeItem kind="presenca" unread title="Você vai ficar de fora?" description="A rodada de hoje fecha às 19h." meta="Pelada de Quinta · 12:04" />
      <NoticeItem kind="pedido" unread title="2 pedidos pra entrar no FFTVI" description="Gu Martins e Ana Lima esperam aprovação." meta="FFTVI · 09:15" />
      <NoticeItem kind="votacao" title="Votação aberta: craque e bagre" description="Copa dos Ferinos · fecha meia-noite." meta="FFTVI · ontem" />
      <NoticeItem kind="resultado" title="Bruno e Caio campeões" description="Você terminou em 4º no ranking de outubro." meta="FFTVI · ontem" />
      <NoticeItem kind="cobranca" title="Mensalidade de outubro em aberto" description="R$ 80 · venceu dia 10. Toque pra copiar o Pix." meta="Pelada de Quinta · seg" onClick={() => {}} />
      <NoticeItem kind="evento" title="Times sorteados" description="Você está no Laranja." meta="Pelada de Quinta · 20:03" />
      <NoticeItem kind="ranking" title="Você subiu pra 4º" meta="FFTVI · ontem" />
    </div>
  ),
};

function Painel() {
  return (
    <NotificationPanel onMarkAllRead={() => {}} onSeeAll={() => {}}>
      <NoticeItem elevated unread kind="pedido" title="2 pedidos pra entrar" description="Gu Martins e Ana Lima." meta="FFTVI · 09:15" />
      <NoticeItem elevated kind="votacao" title="Votação aberta" description="Copa dos Ferinos · fecha meia-noite." meta="FFTVI · ontem" />
      <NoticeItem elevated kind="cobranca" title="5 mensalidades em aberto" description="Resumo semanal · Pelada de Quinta." meta="seg" />
    </NotificationPanel>
  );
}

export const PainelSuspenso: Story = {
  name: 'Painel suspenso',
  render: () => <Painel />,
};

export const MenuComSino: Story = {
  name: 'Sino que abre o painel (web)',
  render: () => (
    <div className="flex justify-end">
      <NotificationMenu unread={2} onMarkAllRead={() => {}} onSeeAll={() => {}}>
        <NoticeItem elevated unread kind="pedido" title="2 pedidos pra entrar" description="Gu Martins e Ana Lima." meta="FFTVI · 09:15" />
        <NoticeItem elevated kind="votacao" title="Votação aberta" description="Copa dos Ferinos · fecha meia-noite." meta="FFTVI · ontem" />
      </NotificationMenu>
    </div>
  ),
};

export const PainelVazio: Story = {
  name: 'Painel vazio',
  render: () => <NotificationPanel />,
};

export const Permissao: Story = {
  name: 'Cartão de permissão',
  render: () => (
    <div className="max-w-sm space-y-3">
      <PermissionCard
        title="Quer saber quando os times saírem?"
        description="A gente avisa no sorteio, quando abrir a votação e se você for o craque."
        onAccept={() => {}}
        onDismiss={() => {}}
      />
      <PermissionCard
        layout="inline"
        title="Avisos neste navegador"
        description="Pra saber quando abrir votação e sair resultado, mesmo com a aba fechada."
        onAccept={() => {}}
      />
    </div>
  ),
};

export const ClaroEEscuro: Story = {
  name: 'Claro e escuro',
  render: () => (
    <TemasLado>
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <NotificationBell unread={2} />
          <NotificationBell unread size="lg" active />
        </div>
        <PermissionCard
          title="Quer saber quando os times saírem?"
          description="A gente avisa no sorteio, quando abrir a votação e se você for o craque."
          onAccept={() => {}}
          onDismiss={() => {}}
        />
        <NoticeItem kind="votacao" unread title="Votação aberta: craque e bagre" description="Copa dos Ferinos · fecha meia-noite." meta="FFTVI · ontem" />
        <NoticeItem kind="cobranca" title="Mensalidade em aberto" description="R$ 80 · venceu dia 10." meta="Pelada de Quinta · seg" />
        <Painel />
      </div>
    </TemasLado>
  ),
};
