# tools/run_yolo.ps1
# Starts the ReJivan Ultralytics YOLO-Pose Edge Sentinel
$RepoRoot = Split-Path -Parent $PSScriptRoot
Set-Location $RepoRoot

Write-Host "======================================================================" -ForegroundColor Cyan
Write-Host "  Starting ReJivan Edge Sentinel (Ultralytics YOLO11-Pose)" -ForegroundColor Green
Write-Host "  Port: 5050 | Camera: 0 | Live Stream: http://localhost:5050/api/yolo/video_feed" -ForegroundColor Yellow
Write-Host "======================================================================" -ForegroundColor Cyan

python tools\yolo_edge_sentinel.py
