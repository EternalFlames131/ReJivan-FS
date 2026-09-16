@echo off
title ReJivan YOLO-Pose Edge Sentinel Daemon
echo ======================================================================
echo   Starting ReJivan Edge Sentinel (Ultralytics YOLO11-Pose)
echo   Hardware Acceleration: NVIDIA GeForce GTX 1650 / System CPU
echo   Edge API Port: 5050
echo   Web Portal:    http://localhost:8080 (for local hardware AI acceleration)
echo   Cloud Portal:  https://rejivan2.vercel.app (runs Universal in-browser AI)
echo ======================================================================
cd /d "%~dp0\.."
python -u tools\yolo_edge_sentinel.py
pause
