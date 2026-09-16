# disable_system_startup.ps1 — Disable ReJivan from launching on Windows boot
$startup = [System.Environment]::GetFolderPath('Startup')
$lnkPath = Join-Path $startup "ReJivan System Autostart.lnk"
$oldLnk = Join-Path $startup "ReJivan YOLO Sentinel.lnk"

if (Test-Path $lnkPath) {
    Remove-Item $lnkPath -Force
    Write-Host "ReJivan System Autostart shortcut removed from Startup folder." -ForegroundColor Yellow
}
if (Test-Path $oldLnk) {
    Remove-Item $oldLnk -Force
}
