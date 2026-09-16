@echo off
REM ReJivan - Stop All Local Services (Port 5050 & Port 8080)
echo Stopping ReJivan YOLO Sentinel on port 5050...
for /f "tokens=5" %%a in ('netstat -aon ^| findstr ":5050" ^| findstr "LISTENING"') do (
    taskkill /F /PID %%a >nul 2>&1
    echo Terminated YOLO Sentinel (PID %%a)
)

echo Stopping ReJivan Web Server on port 8080...
for /f "tokens=5" %%a in ('netstat -aon ^| findstr ":8080" ^| findstr "LISTENING"') do (
    taskkill /F /PID %%a >nul 2>&1
    echo Terminated Web Server (PID %%a)
)

echo All ReJivan background services stopped.
