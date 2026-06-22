import type { Meta, StoryObj } from '@storybook/react';
import {
  Menubar, MenubarContent, MenubarItem, MenubarMenu,
  MenubarSeparator, MenubarShortcut, MenubarTrigger,
  MenubarCheckboxItem, MenubarRadioGroup, MenubarRadioItem,
  MenubarSub, MenubarSubContent, MenubarSubTrigger,
} from '../components/ui/menubar';

const meta: Meta<typeof Menubar> = {
  title: 'UI/Menubar',
  component: Menubar,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
};

export default meta;
type Story = StoryObj<typeof Menubar>;

export const Default: Story = {
  render: () => (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>Torneios</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            Criar torneio <MenubarShortcut>⌘N</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>Listar torneios</MenubarItem>
          <MenubarSeparator />
          <MenubarSub>
            <MenubarSubTrigger>Exportar</MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarItem>Exportar como PDF</MenubarItem>
              <MenubarItem>Exportar como CSV</MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
        </MenubarContent>
      </MenubarMenu>

      <MenubarMenu>
        <MenubarTrigger>Visualização</MenubarTrigger>
        <MenubarContent>
          <MenubarCheckboxItem checked>Chaveamento</MenubarCheckboxItem>
          <MenubarCheckboxItem>Lista de partidas</MenubarCheckboxItem>
          <MenubarCheckboxItem>Quadra em tempo real</MenubarCheckboxItem>
          <MenubarSeparator />
          <MenubarRadioGroup value="double">
            <MenubarRadioItem value="single">Eliminação Simples</MenubarRadioItem>
            <MenubarRadioItem value="double">Dupla Eliminação</MenubarRadioItem>
            <MenubarRadioItem value="groups">Fase de Grupos</MenubarRadioItem>
          </MenubarRadioGroup>
        </MenubarContent>
      </MenubarMenu>

      <MenubarMenu>
        <MenubarTrigger>Admin</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>Gestão de atletas</MenubarItem>
          <MenubarItem>Ranking</MenubarItem>
          <MenubarSeparator />
          <MenubarItem className="text-destructive focus:text-destructive">
            Finalizar torneio
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  ),
};
