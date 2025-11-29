@echo off
echo ========================================
echo    SERFIBANC - INSTALACION RAPIDA
echo ========================================
echo.

REM Verificar si Node.js esta instalado
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] Node.js no esta instalado.
    echo Por favor descarga e instala Node.js desde: https://nodejs.org/
    echo.
    pause
    exit /b 1
)

echo [OK] Node.js detectado: 
node --version
echo.

REM Verificar si node_modules existe
if not exist "node_modules\" (
    echo Instalando dependencias por primera vez...
    echo Esto puede tomar 5-10 minutos...
    echo.
    call npm install
    if %errorlevel% neq 0 (
        echo [ERROR] Fallo la instalacion de dependencias
        pause
        exit /b 1
    )
    echo.
    echo [OK] Dependencias instaladas correctamente!
    echo.
) else (
    echo [OK] Dependencias ya instaladas
    echo.
)

echo ========================================
echo   INICIANDO SERVIDOR DE DESARROLLO
echo ========================================
echo.
echo El sitio se abrira automaticamente en tu navegador
echo en http://localhost:3000
echo.
echo Para DETENER el servidor, presiona Ctrl+C
echo.
pause

call npm run dev

pause

