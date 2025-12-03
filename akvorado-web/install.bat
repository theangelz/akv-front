@echo off
echo ============================================
echo Instalador Akvorado NetFlow Frontend
echo ============================================
echo.

REM Verificar se Node.js está instalado
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERRO] Node.js nao encontrado!
    echo Por favor, instale o Node.js 18+ de https://nodejs.org
    pause
    exit /b 1
)

echo [OK] Node.js encontrado
echo.

REM Verificar se pnpm está instalado
pnpm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [INFO] pnpm nao encontrado. Instalando...
    npm install -g pnpm
    if %errorlevel% neq 0 (
        echo [ERRO] Falha ao instalar pnpm
        pause
        exit /b 1
    )
)

echo [OK] pnpm encontrado
echo.

REM Instalar dependências
echo [INSTALANDO] Dependencias do projeto...
call pnpm install
if %errorlevel% neq 0 (
    echo [ERRO] Falha ao instalar dependencias
    pause
    exit /b 1
)

echo.
echo [OK] Dependencias instaladas com sucesso!
echo.

REM Criar .env.local se não existir
if not exist ".env.local" (
    echo [CRIANDO] Arquivo de configuracao .env.local...
    (
        echo # Configuração da API do Akvorado
        echo NEXT_PUBLIC_AKVORADO_API_URL=http://168.194.167.146:8881
        echo.
        echo # Headers de autenticação ^(usados pelo proxy^)
        echo AKVORADO_REMOTE_USER=admin
        echo AKVORADO_REMOTE_NAME=Administrator
        echo AKVORADO_REMOTE_EMAIL=admin@akvorado.local
    ) > .env.local
    echo [OK] Arquivo .env.local criado
    echo.
    echo [ATENCAO] Edite o arquivo .env.local para configurar o endereco do seu Akvorado
    echo.
)

echo ============================================
echo Instalacao concluida com sucesso!
echo ============================================
echo.
echo Para iniciar o servidor de desenvolvimento:
echo   pnpm dev
echo.
echo Acesse: http://localhost:3000
echo.
echo Login padrao:
echo   Usuario: admin
echo   Senha: admin
echo.
echo ============================================
pause
