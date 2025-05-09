#!/bin/bash

# Criar um backup do package.json original
cp package.json package.json.bak

# Substituir package.json com a versão CommonJS
cp package.cjs.json package.json

# Iniciar servidor
echo "Iniciando servidor com configuração CommonJS..."
NODE_ENV=development npx tsx server/index.ts

# Restaurar package.json original ao sair
trap 'echo "Restaurando configuração original..."; cp package.json.bak package.json; rm package.json.bak' EXIT