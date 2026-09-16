# disable_yolo_startup.ps1 — Disable ReJivan YOLO Sentinel auto-start on Windows boot
$startup = [System.Environment]::GetFolderPath('Startup')
$lnkPath = Join-Path $startup "ReJivan YOLO Sentinel.lnk"
if (Test-Path $lnkPath) {
    Remove-Item -LiteralPath $lnkPath -Force
    Write-Host "ReJivan YOLO Sentinel auto-start disabled." -ForegroundColor Yellow
} else {
    Write-Host "ReJivan YOLO Sentinel auto-start was not enabled." -ForegroundColor Cyan
}
