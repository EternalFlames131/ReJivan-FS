# enable_yolo_startup.ps1 — Enable ReJivan YOLO Sentinel to launch silently on Windows boot
$sh = New-Object -ComObject WScript.Shell
$startup = [System.Environment]::GetFolderPath('Startup')
$lnkPath = Join-Path $startup "ReJivan YOLO Sentinel.lnk"
$root = Split-Path -Parent $PSScriptRoot
$vbsPath = Join-Path $root "tools\start_yolo_silent.vbs"

$lnk = $sh.CreateShortcut($lnkPath)
$lnk.TargetPath = "wscript.exe"
$lnk.Arguments = "`"$vbsPath`""
$lnk.WorkingDirectory = $root
$lnk.Description = "ReJivan YOLO Edge Sentinel (Silent Background Service)"
$lnk.Save()
Write-Host "ReJivan YOLO Sentinel auto-start enabled in Startup folder." -ForegroundColor Green
