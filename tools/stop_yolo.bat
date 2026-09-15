@echo off
REM ReJivan — Stop YOLO Edge Sentinel
echo Stopping ReJivan YOLO Sentinel on port 5050...
for /f "tokens=5" %%a in ('netstat -aon ^| findstr ":5050" ^| findstr "LISTENING"') do (
    taskkill /F /PID %%a >nul 2>&1
    echo Process %%a terminated.
)
echo ReJivan YOLO Sentinel is stopped.
