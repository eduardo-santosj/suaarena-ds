import { defineConfig } from 'tsup';

export default defineConfig([
  // Componentes React + utils
  {
    entry: {
      index: 'src/index.ts',
      icons: 'src/icons.ts',
      'tailwind-preset': 'src/tokens/tailwind-preset.ts',
    },
    format: ['cjs', 'esm'],
    dts: true,
    splitting: false,
    sourcemap: true,
    clean: true,
    external: ['react', 'react-dom', 'tailwindcss', 'lucide-react'],
    treeshake: true,
    banner: {
      js: '"use client";',
    },
  },
]);
