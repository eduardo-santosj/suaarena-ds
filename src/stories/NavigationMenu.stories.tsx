import type { Meta, StoryObj } from '@storybook/react';
import { Trophy, Users, BarChart2, Home } from 'lucide-react';
import {
  NavigationMenu, NavigationMenuContent, NavigationMenuItem,
  NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '../components/ui/navigation-menu';

const meta: Meta<typeof NavigationMenu> = {
  title: 'UI/NavigationMenu',
  component: NavigationMenu,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
};

export default meta;
type Story = StoryObj<typeof NavigationMenu>;

const ListItem = ({ title, children }: { title: string; children: string }) => (
  <li>
    <NavigationMenuLink asChild>
      <a className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
        <div className="text-sm font-medium leading-none">{title}</div>
        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
      </a>
    </NavigationMenuLink>
  </li>
);

export const Default: Story = {
  render: () => (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink className={navigationMenuTriggerStyle()}>
            <Home className="mr-1 h-4 w-4" />Início
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>
            <Trophy className="mr-1 h-4 w-4" />Torneios
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 w-[380px] grid-cols-2">
              <ListItem title="Beach Tennis">
                Torneios de beach tennis com ranking nacional e estadual.
              </ListItem>
              <ListItem title="Futevôlei">
                Competições de futevôlei em todas as categorias.
              </ListItem>
              <ListItem title="Eliminação Dupla">
                Sistema competitivo com bracket winner e loser.
              </ListItem>
              <ListItem title="Fase de Grupos">
                Formato round-robin com classificação para mata-mata.
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>
            <Users className="mr-1 h-4 w-4" />Atletas
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 w-[280px]">
              <ListItem title="Perfil do atleta">Ver estatísticas, histórico e ranking.</ListItem>
              <ListItem title="Inscrições">Gerencie suas inscrições nos torneios.</ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink className={navigationMenuTriggerStyle()}>
            <BarChart2 className="mr-1 h-4 w-4" />Ranking
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  ),
};
