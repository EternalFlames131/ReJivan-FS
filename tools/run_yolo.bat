@echo off
title ReJivan YOLO-Pose Edge Sentinel Daemon
echo ======================================================================
echo   Starting ReJivan Edge Sentinel (Ultralytics YOLO11-Pose)
echo   Hardware Acceleration: NVIDIA GeForce GTX 1650 / System CPU
echo   Port: 5050 ^| Web Portal: http://localhost:8080 or https://rejivan2.vercel.app
echo ======================================================================
cd /d "%~dp0\.."
python tools\yolo_edge_sentinel.py
pause
