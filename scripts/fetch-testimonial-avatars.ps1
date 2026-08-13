<#
  Downloads the three testimonial avatars out of Figma into public/testimonials/.

  Why this script exists and not an entry in fetch-figma-assets.ps1: those URLs
  are short-lived Figma MCP asset links that a Claude session generated. The
  avatars were never on that list, and the Figma MCP is rate-capped on the
  Starter plan, so this goes through the REST API instead - separate quota,
  works on Starter, and it discovers the node IDs itself (nobody recorded them).

  The token never needs to enter a chat or this file. Set it in your own shell:

      $env:FIGMA_TOKEN = '<your token>'
      powershell -ExecutionPolicy Bypass -File .\scripts\fetch-testimonial-avatars.ps1

  Create the token at figma.com -> Settings -> Security -> Personal access
  tokens, with the "File content" scope set to Read. A View seat is enough.

  If the three names below turn out not to exist in the design, the script says
  so and exports every avatar-shaped image it did find into
  public/testimonials/_candidates/ so you can pick by eye instead.
#>

param(
    [string] $Token   = $env:FIGMA_TOKEN,
    [string] $FileKey = 'zv56OBDDFBsS4nulpNeWUc',
    [int]    $Scale   = 2
)

$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent $PSScriptRoot
$outDir = Join-Path $root 'public\testimonials'

if (-not $Token) {
    Write-Host "No token." -ForegroundColor Red
    Write-Host "Set it first, in this same terminal:" -ForegroundColor Yellow
    Write-Host "    `$env:FIGMA_TOKEN = '<your token>'" -ForegroundColor Yellow
    Write-Host "Create one at figma.com -> Settings -> Security -> Personal access tokens (File content: Read)." -ForegroundColor Yellow
    exit 1
}

[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12

# Windows PowerShell 5.1's built-in JSON parser chokes on a file this size:
# JavaScriptSerializer defaults to a ~2MB MaxJsonLength and a recursion limit of
# 100, and a Figma document blows through both. Raise them explicitly.
Add-Type -AssemblyName System.Web.Extensions
function ConvertFrom-JsonBig {
    param([string] $Json)
    $ser = New-Object System.Web.Script.Serialization.JavaScriptSerializer
    $ser.MaxJsonLength = [int]::MaxValue
    $ser.RecursionLimit = 2048
    return $ser.DeserializeObject($Json)
}

function Invoke-Figma {
    param([string] $Url)
    try {
        $resp = Invoke-WebRequest -Uri $Url -Headers @{ 'X-Figma-Token' = $Token } -UseBasicParsing -TimeoutSec 300
    }
    catch {
        $code = $null
        if ($_.Exception.Response) { $code = [int]$_.Exception.Response.StatusCode }
        if ($code -eq 403) { throw "403 from Figma - the token is missing the 'File content: Read' scope, or it can't see this file." }
        if ($code -eq 404) { throw "404 from Figma - file key '$FileKey' not found for this account." }
        if ($code -eq 429) { throw "429 from Figma - REST rate limit hit. Wait a few minutes and re-run." }
        throw
    }
    return ConvertFrom-JsonBig $resp.Content
}

$targets = @(
    @{ Name = 'Sarah Johnson'; File = 'sarah-johnson.png' }
    @{ Name = 'Daniel Okafor'; File = 'daniel-okafor.png' }
    @{ Name = 'Aisha Rahman';  File = 'aisha-rahman.png'  }
)

Write-Host "Fetching document tree (this is the slow part, 10-60s)..." -NoNewline
$doc = Invoke-Figma "https://api.figma.com/v1/files/$FileKey"
Write-Host " ok" -ForegroundColor Green

# Flatten the tree once, remembering each node's bounding box. Everything after
# this is lookups over $flat rather than repeated walks.
$flat = New-Object System.Collections.ArrayList
function Walk {
    param($Node, $Depth)
    if ($null -eq $Node -or $Depth -gt 200) { return }
    $box = $Node['absoluteBoundingBox']
    [void]$flat.Add([pscustomobject]@{
        Id     = [string]$Node['id']
        Name   = [string]$Node['name']
        Type   = [string]$Node['type']
        Chars  = [string]$Node['characters']
        Fills  = $Node['fills']
        X      = if ($box) { [double]$box['x'] } else { $null }
        Y      = if ($box) { [double]$box['y'] } else { $null }
        W      = if ($box) { [double]$box['width'] } else { $null }
        H      = if ($box) { [double]$box['height'] } else { $null }
    })
    $kids = $Node['children']
    if ($kids) { foreach ($k in $kids) { Walk -Node $k -Depth ($Depth + 1) } }
}
Walk -Node $doc['document'] -Depth 0
Write-Host "$($flat.Count) nodes in document."

function Test-HasImageFill {
    param($Node)
    if (-not $Node.Fills) { return $false }
    foreach ($f in $Node.Fills) {
        if ([string]$f['type'] -eq 'IMAGE') { return $true }
    }
    return $false
}

# An avatar is a node painted with an image fill, roughly square, and small.
$imageNodes = @($flat | Where-Object {
    $_.W -and $_.H -and $_.W -ge 16 -and $_.W -le 400 -and
    ($_.W / $_.H) -ge 0.7 -and ($_.W / $_.H) -le 1.4 -and
    (Test-HasImageFill $_)
})
Write-Host "$($imageNodes.Count) avatar-shaped image nodes found."

# Match each name to the image node nearest the text that spells it out - the
# avatar always sits beside its own quote, so proximity is a reliable link.
$resolved = @()
$unmatched = @()
foreach ($t in $targets) {
    $text = $flat | Where-Object { $_.Type -eq 'TEXT' -and $_.Chars -and $_.Chars.Trim() -eq $t.Name } | Select-Object -First 1
    if (-not $text) {
        $text = $flat | Where-Object { $_.Type -eq 'TEXT' -and $_.Chars -and $_.Chars -match [regex]::Escape($t.Name) } | Select-Object -First 1
    }
    if (-not $text -or -not $text.X) { $unmatched += $t; continue }

    $near = $imageNodes | Sort-Object {
        [Math]::Sqrt([Math]::Pow($_.X - $text.X, 2) + [Math]::Pow($_.Y - $text.Y, 2))
    } | Select-Object -First 1

    if ($near) {
        $resolved += [pscustomobject]@{ File = $t.File; Id = $near.Id; Label = "$($t.Name) -> node $($near.Id) '$($near.Name)'" }
    } else {
        $unmatched += $t
    }
}

foreach ($r in $resolved) { Write-Host "  matched  $($r.Label)" -ForegroundColor Green }
foreach ($u in $unmatched) { Write-Host "  no match for '$($u.Name)'" -ForegroundColor Yellow }

$toExport = @{}
foreach ($r in $resolved) { $toExport[$r.Id] = Join-Path $outDir $r.File }

$candidateMode = $false
if ($resolved.Count -eq 0) {
    if ($imageNodes.Count -eq 0) {
        Write-Host ""
        Write-Host "No avatar-shaped images in this file at all - the three names in lib/site.ts are almost certainly sample copy, not design content. Nothing to fetch." -ForegroundColor Yellow
        exit 1
    }
    $candidateMode = $true
    Write-Host ""
    Write-Host "None of the names appear in the design. Exporting all $($imageNodes.Count) candidates for you to pick from instead." -ForegroundColor Yellow
    $candDir = Join-Path $outDir '_candidates'
    $i = 0
    foreach ($n in $imageNodes) {
        $i++
        $safe = ($n.Name -replace '[^\w\-]', '-')
        $toExport[$n.Id] = Join-Path $candDir ("{0:D2}-{1}-{2}x{3}.png" -f $i, $safe, [int]$n.W, [int]$n.H)
    }
}

# /v1/images renders the nodes and hands back short-lived URLs.
$ids = ($toExport.Keys) -join ','
Write-Host ""
Write-Host "Requesting $($toExport.Count) render(s) at ${Scale}x..." -NoNewline
$imgs = Invoke-Figma "https://api.figma.com/v1/images/$FileKey`?ids=$([uri]::EscapeDataString($ids))&format=png&scale=$Scale"
Write-Host " ok" -ForegroundColor Green

if ($imgs['err']) { throw "Figma render failed: $($imgs['err'])" }

$ok = 0
$failed = @()
foreach ($id in $toExport.Keys) {
    $dest = $toExport[$id]
    $dir = Split-Path -Parent $dest
    if (-not (Test-Path $dir)) { New-Item -ItemType Directory -Path $dir -Force | Out-Null }

    $url = $imgs['images'][$id]
    $rel = $dest.Replace($root + '\', '')
    Write-Host "-> $rel  " -NoNewline
    if (-not $url) { Write-Host "FAILED - Figma returned no render for node $id" -ForegroundColor Red; $failed += $rel; continue }

    try {
        Invoke-WebRequest -Uri $url -OutFile $dest -UseBasicParsing -TimeoutSec 120
        $kb = [math]::Round((Get-Item $dest).Length / 1KB, 1)
        Write-Host "ok ($kb KB)" -ForegroundColor Green
        $ok++
    }
    catch {
        Write-Host "FAILED - $($_.Exception.Message)" -ForegroundColor Red
        $failed += $rel
    }
}

Write-Host ""
Write-Host "$ok of $($toExport.Count) downloaded." -ForegroundColor Cyan
if ($failed.Count -gt 0) { Write-Host "Failed: $($failed -join ', ')" -ForegroundColor Yellow }

if ($candidateMode) {
    Write-Host "Candidates are in public/testimonials/_candidates/. Rename the three you want to" -ForegroundColor Cyan
    Write-Host "sarah-johnson.png, daniel-okafor.png, aisha-rahman.png in public/testimonials/, then delete _candidates." -ForegroundColor Cyan
} else {
    Write-Host "Rebuild the container so the runner picks them up:  docker compose up -d --build" -ForegroundColor Cyan
}
