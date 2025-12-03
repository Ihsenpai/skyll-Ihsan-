# Simple K6 Test Runner with Database
# This script runs K6 tests with proper Laravel testing environment

Write-Host "🚀 Running K6 Tests with Database Environment..." -ForegroundColor Green

# Check if Laravel server is running
$serverRunning = $false
try {
    $response = Invoke-WebRequest -Uri "http://localhost:8000" -TimeoutSec 5 -ErrorAction SilentlyContinue
    if ($response.StatusCode -eq 200) {
        $serverRunning = $true
        Write-Host "✅ Laravel server already running" -ForegroundColor Green
    }
} catch {
    Write-Host "🌐 Laravel server not running, will start it..." -ForegroundColor Yellow
}

# Start Laravel server if not running
$serverProcess = $null
if (-not $serverRunning) {
    try {
        Set-Location "../../"
        Write-Host "🚀 Starting Laravel server..." -ForegroundColor Yellow
        $serverProcess = Start-Process -FilePath "php" -ArgumentList "artisan", "serve", "--port=8000" -PassThru -WindowStyle Hidden
        
        # Wait for server to start
        Start-Sleep -Seconds 5
        
        # Test if server started successfully
        $response = Invoke-WebRequest -Uri "http://localhost:8000" -TimeoutSec 10 -ErrorAction SilentlyContinue
        if ($response.StatusCode -eq 200) {
            Write-Host "✅ Laravel server started successfully" -ForegroundColor Green
        } else {
            throw "Server failed to respond"
        }
        
        Set-Location "tests/k6"
    } catch {
        Write-Host "❌ Failed to start Laravel server: $($_.Exception.Message)" -ForegroundColor Red
        exit 1
    }
}

# Run K6 test
$testFile = $args[0]
if (-not $testFile) {
    $testFile = "demo-test.js"
}

Write-Host "🧪 Running K6 test: $testFile" -ForegroundColor Cyan

try {
    k6 run $testFile
    Write-Host "✅ K6 test completed!" -ForegroundColor Green
} catch {
    Write-Host "❌ K6 test failed: $($_.Exception.Message)" -ForegroundColor Red
}

# Cleanup - stop server if we started it
if ($serverProcess -and -not $serverProcess.HasExited) {
    Write-Host "🛑 Stopping Laravel server..." -ForegroundColor Yellow
    Stop-Process -Id $serverProcess.Id -Force
    Write-Host "✅ Server stopped" -ForegroundColor Green
}

Write-Host "🎉 Test session completed!" -ForegroundColor Green