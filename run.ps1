# xinxicha - 中国游戏厂商海外信息差监控 · 一键运行
#
#   .\run.ps1                巡检一次，然后启动本地预览服务器（端口 8323）
#   .\run.ps1 -UpdateOnly    只巡检，不启动预览服务器
#   .\run.ps1 -Probe         只体检数据源（Trends / Reddit / X），不写任何文件
#   .\run.ps1 -DryRun        完整跑一遍流程，但不写文件
#   .\run.ps1 -Offline       强制离线：不发任何网络请求，全走 P1→P2→P3 回退链
#   .\run.ps1 -NoCache       忽略本地 HTTP 缓存，强制重新请求
#   .\run.ps1 -BudgetSeconds 300 -Port 8323
#
# 本机没有把 python 加进 PATH 时，脚本会自动回退到 %USERPROFILE%\.local\bin\python3.12.exe。
# 若提示「running scripts is disabled on this system」，改用：
#   powershell -ExecutionPolicy Bypass -File run.ps1

param(
    [switch]$UpdateOnly,
    [switch]$Probe,
    [switch]$DryRun,
    [switch]$Offline,
    [switch]$NoCache,
    [int]$BudgetSeconds = 60,
    [int]$Port = 8323
)

$ErrorActionPreference = 'Stop'
Set-Location -LiteralPath (Split-Path -Parent $MyInvocation.MyCommand.Path)

function Resolve-Python {
    $candidates = @()
    foreach ($name in @('python', 'python3', 'py')) {
        $command = Get-Command $name -ErrorAction SilentlyContinue
        if ($command) { $candidates += $command.Source }
    }
    $candidates += @(
        (Join-Path $env:USERPROFILE '.local\bin\python3.12.exe'),
        (Join-Path $env:LOCALAPPDATA 'Programs\Python\Python312\python.exe'),
        (Join-Path $env:USERPROFILE 'miniconda3\python.exe'),
        (Join-Path $env:USERPROFILE 'miniforge3\python.exe')
    )
    foreach ($candidate in $candidates) {
        if (-not $candidate) { continue }
        # 跳过 Microsoft Store 的占位程序，它只会弹出应用商店
        if ($candidate -like '*\WindowsApps\*') { continue }
        if (Test-Path -LiteralPath $candidate) { return $candidate }
    }
    throw '未找到 Python 3.10+。请先安装 Python，或把解释器路径加进 PATH。'
}

$python = Resolve-Python
$env:PYTHONIOENCODING = 'utf-8'
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

Write-Host "使用解释器: $python" -ForegroundColor DarkGray

$updateArgs = @('-m', 'collector.update', '--budget-seconds', $BudgetSeconds)
if ($Probe)   { $updateArgs += '--probe' }
if ($DryRun)  { $updateArgs += '--dry-run' }
if ($Offline) { $updateArgs += '--offline' }
if ($NoCache) { $updateArgs += '--no-cache' }

& $python @updateArgs
if ($LASTEXITCODE -ne 0) { throw "巡检退出码 $LASTEXITCODE" }

if ($Probe -or $DryRun -or $UpdateOnly) { return }

# 本地预览：8323 被占用时提示，避免和 gameqker(8322) / wordseeker 抢端口
$listening = Get-NetTCPConnection -LocalPort $Port -State Listen -ErrorAction SilentlyContinue
if ($listening) {
    Write-Host "端口 $Port 已被占用，换一个端口：.\run.ps1 -UpdateOnly; .\run.ps1 -Port 8333" -ForegroundColor Yellow
    return
}

Write-Host ''
Write-Host "预览地址: http://localhost:$Port/" -ForegroundColor Green
Write-Host '按 Ctrl+C 停止服务器。' -ForegroundColor DarkGray
& $python -m http.server $Port --directory web
