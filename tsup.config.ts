import { defineConfig } from 'tsup';

export default defineConfig([
  // Componentes React + utils
  {
    entry: {
      index: 'src/index.ts',
      icons: 'src/icons.ts',
    },
    format: ['cjs', 'esm'],
    dts: true,
    splitting: false,
    sourcemap: true,
    // A limpeza do dist fica no script `build` (package.json): com dois alvos
    // em paralelo, `clean: true` aqui apagava o tokens.d.ts do outro alvo.
    clean: false,
    external: ['react', 'react-dom', 'tailwindcss', 'lucide-react'],
    // Sem `treeshake: true`: esse flag passa o bundle pelo Rollup, que descarta
    // a diretiva "use client" do banner. O esbuild ja faz tree shaking.
    banner: {
      js: '"use client";',
    },
  },
  // Preset do Tailwind: roda no Node (tailwind.config), nunca "use client".
  {
    entry: {
      'tailwind-preset': 'src/tokens/tailwind-preset.ts',
    },
    format: ['cjs', 'esm'],
    dts: true,
    splitting: false,
    sourcemap: true,
    clean: false,
    external: ['tailwindcss'],
  },
  // Tokens como objeto JS (sem React, sem "use client"): consumido por
  // tailwind.config do React Native, scripts, etc.
  {
    entry: {
      tokens: 'src/tokens/tokens.ts',
    },
    format: ['cjs', 'esm'],
    dts: true,
    splitting: false,
    sourcemap: false,
    clean: false,
    treeshake: true,
  },
]);
