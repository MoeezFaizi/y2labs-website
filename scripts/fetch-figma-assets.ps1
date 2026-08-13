<#
  Downloads the Y2 LABS landing-page assets out of Figma into public/.

  Why this script exists: Claude's Linux sandbox reaches the internet through an
  egress proxy with a domain allowlist (npm registry and similar). figma.com
  isn't on it, so the sandbox gets "HTTP 403 from proxy after CONNECT" and can't
  pull the binaries. Your machine has no such restriction, so running this
  locally works.

  Usage — from the project root (F:\apps\Y2Labs):

      powershell -ExecutionPolicy Bypass -File .\scripts\fetch-figma-assets.ps1

  The URLs below are short-lived Figma MCP asset links (roughly 7 days) and act
  as bearer tokens — don't commit this file to a public repo. If they've expired,
  ask Claude to regenerate the script.
#>

$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent $PSScriptRoot

$assets = @(
    @{ Path = 'public\hero\globe.png';        Url = 'https://www.figma.com/api/mcp/asset/62bf875b-18fe-4fbe-a3f5-d07bfc4d2721.png'; Desc = 'Glowing network sphere (node 1394:6454)' }
    @{ Path = 'public\logos\logoipsum.png';   Url = 'https://www.figma.com/api/mcp/asset/d5e44dfe-78a6-425d-aac5-3ca0648dbbad.png'; Desc = 'Customer logo 1 (node 1081:11556)' }
    @{ Path = 'public\logos\logo-2.png';      Url = 'https://www.figma.com/api/mcp/asset/2f26893e-2ad7-4b4b-83b5-35027e7c74db.png'; Desc = 'Customer logo 2 (node 1081:11559)' }
    @{ Path = 'public\logos\logo-3.png';      Url = 'https://www.figma.com/api/mcp/asset/aface16a-1ab2-482e-8c87-46ff4ff11dd6.png'; Desc = 'Customer logo 3 (node 1081:11562)' }
    @{ Path = 'public\icons\video.svg';       Url = 'https://www.figma.com/api/mcp/asset/8829c26b-d1c5-493a-abef-d34b31610ff4.svg'; Desc = 'video-02 icon used in the CTA pill' }
    @{ Path = 'public\logo.svg';              Url = 'https://www.figma.com/api/mcp/asset/05f6ee16-99fb-4410-9013-bebeba1c0dc1.svg'; Desc = 'Y2lab wordmark (node 1681:4524)' }
)

# TLS 1.2 for older PowerShell 5.1 hosts.
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12

$ok = 0
$failed = @()

foreach ($a in $assets) {
    $dest = Join-Path $root $a.Path
    $dir = Split-Path -Parent $dest
    if (-not (Test-Path $dir)) { New-Item -ItemType Directory -Path $dir -Force | Out-Null }

    Write-Host "-> $($a.Path)  " -NoNewline
    try {
        Invoke-WebRequest -Uri $a.Url -OutFile $dest -UseBasicParsing -TimeoutSec 60
        $kb = [math]::Round((Get-Item $dest).Length / 1KB, 1)
        Write-Host "ok ($kb KB)  $($a.Desc)" -ForegroundColor Green
        $ok++
    }
    catch {
        Write-Host "FAILED — $($_.Exception.Message)" -ForegroundColor Red
        $failed += $a.Path
    }
}

Write-Host ""
Write-Host "$ok of $($assets.Count) downloaded." -ForegroundColor Cyan

if ($failed.Count -gt 0) {
    Write-Host "Failed: $($failed -join ', ')" -ForegroundColor Yellow
    Write-Host "If these 403/404, the Figma URLs have expired — ask Claude to regenerate this script." -ForegroundColor Yellow
    exit 1
}

Write-Host "Done. Restart 'npm run dev' so next/image picks up the new files." -ForegroundColor Cyan
