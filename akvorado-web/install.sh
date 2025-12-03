#!/bin/bash

echo "============================================"
echo "Instalador Akvorado NetFlow Frontend"
echo "============================================"
echo ""

# Cores
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Verificar se Node.js está instalado
if ! command -v node &> /dev/null; then
    echo -e "${RED}[ERRO]${NC} Node.js não encontrado!"
    echo "Por favor, instale o Node.js 18+ de https://nodejs.org"
    exit 1
fi

echo -e "${GREEN}[OK]${NC} Node.js encontrado: $(node --version)"
echo ""

# Verificar se pnpm está instalado
if ! command -v pnpm &> /dev/null; then
    echo -e "${YELLOW}[INFO]${NC} pnpm não encontrado. Instalando..."
    npm install -g pnpm
    if [ $? -ne 0 ]; then
        echo -e "${RED}[ERRO]${NC} Falha ao instalar pnpm"
        exit 1
    fi
fi

echo -e "${GREEN}[OK]${NC} pnpm encontrado: $(pnpm --version)"
echo ""

# Instalar dependências
echo -e "${YELLOW}[INSTALANDO]${NC} Dependências do projeto..."
pnpm install
if [ $? -ne 0 ]; then
    echo -e "${RED}[ERRO]${NC} Falha ao instalar dependências"
    exit 1
fi

echo ""
echo -e "${GREEN}[OK]${NC} Dependências instaladas com sucesso!"
echo ""

# Criar .env.local se não existir
if [ ! -f ".env.local" ]; then
    echo -e "${YELLOW}[CRIANDO]${NC} Arquivo de configuração .env.local..."
    cat > .env.local << 'EOF'
# Configuração da API do Akvorado
NEXT_PUBLIC_AKVORADO_API_URL=http://168.194.167.146:8881

# Headers de autenticação (usados pelo proxy)
AKVORADO_REMOTE_USER=admin
AKVORADO_REMOTE_NAME=Administrator
AKVORADO_REMOTE_EMAIL=admin@akvorado.local
EOF
    echo -e "${GREEN}[OK]${NC} Arquivo .env.local criado"
    echo ""
    echo -e "${YELLOW}[ATENÇÃO]${NC} Edite o arquivo .env.local para configurar o endereço do seu Akvorado"
    echo ""
fi

echo "============================================"
echo -e "${GREEN}Instalação concluída com sucesso!${NC}"
echo "============================================"
echo ""
echo "Para iniciar o servidor de desenvolvimento:"
echo "  pnpm dev"
echo ""
echo "Acesse: http://localhost:3000"
echo ""
echo "Login padrão:"
echo "  Usuário: admin"
echo "  Senha: admin"
echo ""
echo "============================================"
