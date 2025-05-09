#!/bin/bash

# Aplicar o fix na configuração do Vite
echo "Aplicando correção na configuração do Vite..."
node fixViteConfig.mjs

# Iniciar o servidor
echo "Iniciando o servidor..."
NODE_ENV=development tsx server/index.ts

# Restaurar a configuração original ao sair
trap 'echo "Restaurando configuração original..."; if [ -f vite.config.ts.bak ]; then mv vite.config.ts.bak vite.config.ts; fi' EXIT