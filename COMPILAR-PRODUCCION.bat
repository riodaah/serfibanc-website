@echo off
echo ========================================
echo    SERFIBANC - COMPILAR PARA PRODUCCION
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

REM Verificar si node_modules existe
if not exist "node_modules\" (
    echo [ERROR] Primero debes ejecutar INICIO-RAPIDO.bat
    echo para instalar las dependencias
    echo.
    pause
    exit /b 1
)

echo Compilando sitio para produccion...
echo.

call npm run build

if %errorlevel% neq 0 (
    echo.
    echo [ERROR] Fallo la compilacion
    pause
    exit /b 1
)

echo.
echo ========================================
echo   COMPILACION EXITOSA!
echo ========================================
echo.
echo Los archivos listos para subir a tu servidor
echo estan en la carpeta: dist\
echo.
echo Sube TODO el contenido de la carpeta 'dist'
echo a tu hosting.
echo.
echo ¿Quieres previsualizar la version compilada?
echo (se abrira en http://localhost:4173)
echo.
choice /C SN /M "Previsualizar ahora"

if errorlevel 2 (
    echo.
    echo Compilacion completada. Archivos en carpeta 'dist'
    pause
    exit /b 0
)

if errorlevel 1 (
    echo.
    echo Iniciando previsualizacion...
    call npm run preview
)

pause


