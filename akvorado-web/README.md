# Akvorado NetFlow Frontend

Interface moderna para visualização e análise de dados NetFlow usando o backend Akvorado.

## 🚀 Funcionalidades

- ✅ Dashboard em tempo real com visualizações de tráfego
- ✅ Análise de fluxos com filtros avançados
- ✅ Construtor visual de filtros com selects dinâmicos
- ✅ Tipos de gráfico com ícones (Line, Stacked, Sankey, Grid)
- ✅ Suporte multi-idioma (PT-BR / EN)
- ✅ Exportadores em destaque
- ✅ Login e autenticação
- ✅ Gerenciamento de usuários
- ✅ Customização do sistema (logo, nome, cores)

## 📋 Pré-requisitos

- Node.js 18+ ou superior
- pnpm (recomendado) ou npm
- Backend Akvorado rodando

## ⚡ Instalação Rápida

### Windows
```bash
# Execute o instalador
install.bat
```

### Linux/Mac
```bash
# Execute o instalador
chmod +x install.sh
./install.sh
```

## 🔧 Instalação Manual

```bash
# 1. Instalar dependências
pnpm install

# 2. Configurar variáveis de ambiente
# Edite o arquivo .env.local com o endereço do seu Akvorado
NEXT_PUBLIC_AKVORADO_API_URL=http://SEU_IP:8881
AKVORADO_REMOTE_USER=admin
AKVORADO_REMOTE_NAME=Administrator
AKVORADO_REMOTE_EMAIL=admin@akvorado.local

# 3. Rodar em desenvolvimento
pnpm dev

# 4. Acessar
http://localhost:3000
```

## 🔐 Login Padrão

- **Usuário**: `admin`
- **Senha**: `admin`

⚠️ **Importante**: Altere a senha padrão após o primeiro login!

## 📁 Estrutura do Projeto

```
akvorado-web/
├── src/
│   ├── app/
│   │   ├── api/              # APIs Next.js
│   │   │   ├── auth/         # Autenticação
│   │   │   ├── users/        # Gerenciamento de usuários
│   │   │   └── settings/     # Configurações do sistema
│   │   ├── login/            # Página de login
│   │   ├── page.tsx          # Dashboard principal
│   │   └── layout.tsx        # Layout global
│   └── data/
│       └── users.json        # Banco de dados local (usuários e configurações)
├── .env.local                # Configurações de ambiente
├── next.config.js            # Configuração do Next.js
├── package.json              # Dependências
└── README.md                 # Este arquivo
```

## 🎨 Customização do Sistema

### Alterar Nome e Logo

Edite o arquivo `src/data/users.json`:

```json
{
  "settings": {
    "appName": "Seu Nome Aqui",
    "logoUrl": "/caminho/para/logo.png",
    "colors": {
      "primary": "#2563eb",
      "secondary": "#4f46e5",
      "gradientFrom": "#2563eb",
      "gradientVia": "#4f46e5",
      "gradientTo": "#6366f1"
    }
  }
}
```

### Upload de Logo

1. Coloque sua logo em `public/logo.png`
2. Atualize `logoUrl` nas configurações

### Alterar Cores

Edite as cores no arquivo `users.json` usando códigos hexadecimais.

## 👥 Gerenciamento de Usuários

### Criar Novo Usuário via API

```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "username": "joao",
    "password": "senha123",
    "name": "João Silva",
    "email": "joao@exemplo.com"
  }'
```

### Listar Usuários

```bash
curl http://localhost:3000/api/users
```

### Deletar Usuário

```bash
curl -X DELETE "http://localhost:3000/api/users?id=USER_ID"
```

## 🔨 Build para Produção

```bash
# Build
pnpm build

# Rodar em produção
pnpm start
```

## 📊 Filtros Avançados

### Construtor Visual de Filtros

O sistema possui um construtor visual que permite criar filtros complexos sem digitar código:

1. Vá para **Análise de Fluxos**
2. Clique em **Adicionar Condição**
3. Selecione:
   - Campo (Source AS, Protocol, etc.)
   - Operador (=, !=, >, <, etc.)
   - Valor (com select dinâmico para interfaces e protocolos)
4. Adicione múltiplas condições com AND/OR
5. Veja a expressão gerada em tempo real
6. Clique em **Aplicar Filtros**

### Tipos de Gráfico

- 📈 **Line**: Gráfico de linha simples
- 📊 **Stacked**: Gráfico empilhado
- 📊 **Stacked 100%**: Gráfico empilhado 100%
- 🔀 **Sankey**: Diagrama de fluxo
- 📋 **Grid**: Visualização em tabela

## 🌐 Suporte Multi-idioma

Troque o idioma usando o seletor no cabeçalho:
- 🇧🇷 Português (PT-BR) - Padrão
- 🇺🇸 English (EN)

## 🔗 API do Akvorado

O frontend se conecta aos seguintes endpoints:

- `/api/v0/console/widget/flow-last` - Último fluxo
- `/api/v0/console/widget/flow-rate` - Taxa de fluxo
- `/api/v0/console/widget/exporters` - Lista de exportadores
- `/api/v0/console/widget/graph` - Dados do gráfico
- `/api/v0/console/widget/top/{dimension}` - Top talkers
- `/api/v0/console/graph/line` - Gráfico de linhas (POST)
- `/api/v0/console/graph/sankey` - Diagrama Sankey (POST)
- `/api/v0/console/filter/validate` - Validação de filtros

## 🐛 Troubleshooting

### Erro de Conexão com API

```bash
# Verifique se o Akvorado está rodando
curl http://SEU_IP:8881/api/v0/console/widget/exporters

# Verifique as variáveis de ambiente
cat .env.local
```

### Porta 3000 já em uso

```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Linux/Mac
lsof -ti:3000 | xargs kill -9
```

## 📝 TODO - Próximos Passos

### Implementar Gerenciamento de Usuários na UI
- [ ] Criar página `/admin/users` com lista de usuários
- [ ] Adicionar formulário de criação de usuário
- [ ] Adicionar botão de deletar usuário
- [ ] Proteger rotas com middleware de autenticação

### Implementar Customização na UI
- [ ] Criar página `/admin/settings` com opções de customização
- [ ] Adicionar upload de logo (usando API route com formidable)
- [ ] Adicionar color picker para escolher cores
- [ ] Preview em tempo real das mudanças

### Melhorias
- [ ] Adicionar níveis de usuário (admin, viewer)
- [ ] Implementar refresh token
- [ ] Adicionar logs de auditoria
- [ ] Exportar dados em CSV/JSON
- [ ] Alertas configuráveis

## 📄 Licença

MIT License

## 🤝 Contribuindo

Pull requests são bem-vindos!

## 📧 Suporte

Para dúvidas ou problemas, abra uma issue no repositório.
