/**
 * Re-export de lucide-react.
 *
 * Importe ícones diretamente do DS para não depender da versão do lucide
 * em cada projeto:
 *
 *   import { Plus, Trash2, Search } from '@sua-arena/ui/icons';
 *
 * Ou importe do barrel principal (tree-shaking garante que só os usados
 * são incluídos no bundle):
 *
 *   import { icons } from '@sua-arena/ui';
 */
export * from 'lucide-react';
