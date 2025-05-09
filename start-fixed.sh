#!/bin/bash

# Preparar arquivo de configuração Vite
echo "Preparando configuração Vite corrigida..."
if [ -f vite.config.ts ]; then
  mv vite.config.ts vite.config.ts.original
  cp vite.config.fix.ts vite.config.ts
fi

# Iniciar o servidor
echo "Iniciando o servidor..."
NODE_ENV=development npx tsx server/index.ts

# Restaurar arquivo original ao finalizar
trap 'echo "Restaurando configuração original..."; if [ -f vite.config.ts.original ]; then mv vite.config.ts.original vite.config.ts; fi' EXIT