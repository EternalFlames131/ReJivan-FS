# tools/build_features_pdf.ps1
$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $PSScriptRoot
$src = Join-Path $root "docs\source\ReJivan_Features_And_Recommended_Fixes.html"
$out = Join-Path $root "docs\ReJivan_Features_And_Recommended_Fixes.pdf"

$edge = "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
if (-not (Test-Path -LiteralPath $edge)) {
    $edge = "C:\Program Files\Microsoft\Edge\Application\msedge.exe"
}

if (-not (Test-Path -LiteralPath $edge)) {
    Write-Error "Edge not found at $edge"
    exit 1
}

if (Test-Path -LiteralPath $out) {
    Remove-Item -LiteralPath $out -Force
}

$fileUrl = "file:///" + ($src.Replace('\', '/'))
Write-Host "Rendering PDF from $fileUrl..." -ForegroundColor Cyan
& $edge --headless=new --run-all-compositor-stages-before-draw --no-pdf-header-footer --print-to-pdf="$out" "$fileUrl"

# Wait for file flush
Start-Sleep -Seconds 2
$prev = 0
for ($i = 0; $i -lt 15; $i++) {
    if (Test-Path -LiteralPath $out) {
        $cur = (Get-Item -LiteralPath $out).Length
        if ($cur -gt 0 -and $cur -eq $prev) { break }
        $prev = $cur
    }
    Start-Sleep -Milliseconds 500
}

if (Test-Path -LiteralPath $out) {
    $item = Get-Item -LiteralPath $out
    Write-Host ("PDF successfully built: {0} ({1:N0} bytes)" -f $out, $item.Length) -ForegroundColor Green
    python -X utf8 (Join-Path $PSScriptRoot "verify_pdf.py") "$out"
} else {
    Write-Error "Failed to generate PDF at $out"
    exit 1
}
