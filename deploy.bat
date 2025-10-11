@echo off
setlocal enabledelayedexpansion

REM Ruta del proyecto
set APP_DIR=Z:\Desktop\grupo_7_fraterno

cd /d "%APP_DIR%"

echo ==== Iniciando deploy ====
echo %date% %time%

REM Actualizar código
echo --- Actualizando repositorio ---
git fetch --all
git reset --hard origin/main

REM Instalar dependencias si hay package.json
if exist package.json (
    echo --- Instalando dependencias ---
    call npm ci
    call npm run build
)

REM Reiniciar servidor (si usás PM2)
where pm2 >nul 2>nul
if %errorlevel%==0 (
    echo --- Reiniciando con PM2 ---
    pm2 restart mi-app || pm2 start npm --name "mi-app" -- start
) else (
    echo PM2 no encontrado. Reinicia manualmente el servidor.
)

echo === Deploy completado ===
echo.
endlocal