#!/bin/bash

# Este é o script principal que o workflow vai executar
# Ele usa nossa configuração corrigida do vite.config.ts

# Preparar arquivo de configuração Vite
echo "🛠️ Corrigindo configuração Vite..."
if [ -f vite.config.ts ]; then
  cp vite.config.ts vite.config.ts.original
  cp vite.config.fix.ts vite.config.ts
fi

# Iniciar o servidor
echo "🚀 Iniciando o servidor..."
exec NODE_ENV=development npx tsx server/index.ts