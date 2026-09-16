# enable_system_startup.ps1 — Enable ReJivan (YOLO + Web Server) on Windows boot
$sh = New-Object -ComObject WScript.Shell
$startup = [System.Environment]::GetFolderPath('Startup')
$lnkPath = Join-Path $startup "ReJivan System Autostart.lnk"
$oldLnk = Join-Path $startup "ReJivan YOLO Sentinel.lnk"
if (Test-Path $oldLnk) { Remove-Item $oldLnk -Force }

$root = Split-Path -Parent $PSScriptRoot
$vbsPath = Join-Path $root "tools\start_all_silent.vbs"

$lnk = $sh.CreateShortcut($lnkPath)
$lnk.TargetPath = "wscript.exe"
$lnk.Arguments = "`"$vbsPath`""
$lnk.WorkingDirectory = $root
$lnk.Description = "ReJivan Full System (Silent Background YOLO + Web Server)"
$lnk.Save()
Write-Host "ReJivan System Autostart enabled: YOLO (5050) + Web (8080) will start silently on boot." -ForegroundColor Green
