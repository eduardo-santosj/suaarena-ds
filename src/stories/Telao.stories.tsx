import type { Meta, StoryObj } from '@storybook/react';
import { LiveTag } from '../components/custom/Stage';
import { QrBlock } from '../components/custom/QrBlock';
import { TvPanel, TvRow, TvScore, TvShell } from '../components/custom/TvShell';

const meta: Meta = {
  title: 'Layout/Telão',
  tags: ['autodocs'],
  parameters: { layout: 'centered', backgrounds: { disable: true } },
};

export default meta;
type Story = StoryObj;

// QR de exemplo: o DS não gera QR, quem usa passa o desenho pronto.
const FakeQr = () => (
  <svg viewBox="0 0 21 21" shapeRendering="crispEdges" aria-hidden="true" className="fill-black">
    <path d="M0 0h7v7H0zM14 0h7v7h-7zM0 14h7v7H0z" />
    <path className="fill-white" d="M1 1h5v5H1zM15 1h5v5h-5zM1 15h5v5H1z" />
    <path d="M2 2h3v3H2zM16 2h3v3h-3zM2 16h3v3H2zM8 0h1v2H8zM10 1h2v1h-2zM9 3h2v2H9zM12 4h1v3h-1zM8 6h3v1H8zM0 8h2v1H0zM3 8h3v2H3zM8 8h2v2H8zM11 8h3v1h-3zM15 8h2v2h-2zM18 9h3v1h-3zM1 10h1v2H1zM6 11h3v1H6zM10 10h1v4h-1zM13 11h2v2h-2zM17 11h1v3h-1zM19 12h2v1h-2zM8 13h1v2H8zM12 14h4v1h-4zM8 16h2v1H8zM11 16h1v3h-1zM14 16h2v2h-2zM18 15h1v2h-1zM8 18h2v3H8zM13 19h3v1h-3zM17 18h2v1h-2zM19 19h2v2h-2zM15 20h1v1h-1z" />
  </svg>
);

export const Qr: Story = {
  name: 'Bloco de QR',
  parameters: { layout: 'padded' },
  render: () => (
    <div className="flex max-w-md flex-col gap-4">
      <QrBlock title="Chave e ranking no seu celular" url="ferinos.app/fftvi"><FakeQr /></QrBlock>
      <QrBlock layout="stacked" size={160} title="Aponte a câmera e vote" url="só quem jogou hoje consegue votar"><FakeQr /></QrBlock>
    </div>
  ),
};

export const TorneioFutevolei: Story = {
  name: 'Telão: torneio',
  render: () => (
    <TvShell
      fit={false}
      title="Copa dos Ferinos"
      label="Masculino A"
      status={<LiveTag label="AO VIVO · QUADRA 1" className="h-[34px] px-4 text-[15px]" />}
      footerStart="3º lugar · perdedores das semis · quadra 2"
      footerEnd="ferinos.app/tv · código 4821"
      aside={
        <>
          <TvPanel label="Próximos">
            <TvRow value="Semi 2">Léo e Thiago</TvRow>
            <TvRow value="Final">Vencedores</TvRow>
          </TvPanel>
          <QrBlock title="Chave e ranking no seu celular" url="ferinos.app/fftvi"><FakeQr /></QrBlock>
        </>
      }
    >
      <TvScore label="Semifinal 1 · set único até 21" a={{ name: 'Bruno e Caio', score: 17 }} b={{ name: 'Diego e Rafa', score: 15 }} />
    </TvShell>
  ),
};

export const RodadaFutebol: Story = {
  name: 'Telão: rodada',
  render: () => (
    <TvShell
      fit={false}
      title="Pelada de Quinta"
      label="rodada de 23/10"
      status={<span className="font-mono text-[30px] font-bold text-primary">08:12</span>}
      footerStart="gol contra conta pro adversário · rei da quadra"
      footerEnd="ferinos.app/tv · código 7310"
      aside={
        <>
          <TvPanel label="Artilharia da noite">
            <TvRow value={5}>Rafa</TvRow>
            <TvRow value={4}>Bruno</TvRow>
            <TvRow value={2}>Mateus</TvRow>
          </TvPanel>
        </>
      }
    >
      <TvScore
        layout="sides"
        label="Jogo 3 de 6"
        a={{ name: 'Laranja', score: 3, detail: 'Rafa 2 · Mateus 1', color: 'hsl(var(--primary))' }}
        b={{ name: 'Preto', score: 2, detail: 'Bruno 2', color: 'hsl(var(--foreground))' }}
        footer="Próximo: vencedor × Azul"
      />
    </TvShell>
  ),
};
