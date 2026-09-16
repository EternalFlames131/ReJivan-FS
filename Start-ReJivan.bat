@echo off
title ReJivan - Personal Nurse for Every Family
echo ======================================================================
echo   ReJivan - Launching Complete Multimodal Elderly Safety System
echo ======================================================================
cd /d "%~dp0"

echo [1/3] Starting YOLO Edge Sentinel (Port 5050)...
wscript.exe tools\start_yolo_silent.vbs

echo [2/3] Starting ReJivan Web Server (Port 8080)...
start /b node prototype\server.js > nul 2>&1

echo [3/3] Opening ReJivan Dashboard in browser...
timeout /t 2 /nobreak > nul
start http://localhost:8080

echo ======================================================================
echo   ReJivan is LIVE!
echo   * Web Dashboard:  http://localhost:8080
echo   * YOLO AI Daemon: http://127.0.0.1:5050 (Hardware Accelerated)
echo   * Demo Logins:    asharma@demo.in / demo123 (Family)
echo                     wardnurse@demo.in / demo123 (Virtual Ward)
echo ======================================================================
echo Note: When running locally at http://localhost:8080, your browser
echo connects directly to the local hardware YOLO sentinel on port 5050.
echo.
echo Press any key to stop the local servers when finished...
pause > nul

echo Stopping ReJivan services...
call tools\stop_yolo.bat > nul 2>&1
for /f "tokens=5" %%a in ('netstat -aon ^| findstr ":8080" ^| findstr "LISTENING"') do (
    taskkill /F /PID %%a >nul 2>&1
)
echo All services stopped cleanly.
timeout /t 1 /nobreak > nul
