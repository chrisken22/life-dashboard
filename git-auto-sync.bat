@echo off
:: Git Auto-Sync Script for life-dashboard
:: Runs continuously, syncing every 2 minutes

set REPO_PATH=C:\Users\User\OneDrive\Python\ClaudeCode_test\life-dashboard
set SYNC_INTERVAL=120

echo ========================================
echo   Git Auto-Sync Started
echo   Folder: %REPO_PATH%
echo   Interval: %SYNC_INTERVAL% seconds
echo   Press Ctrl+C to stop
echo ========================================
echo.

cd /d %REPO_PATH%

:loop
echo [%date% %time%] Checking for changes...

:: Pull remote changes first
git pull origin master --quiet 2>nul
if %errorlevel%==0 (
    echo [%date% %time%] Pull: OK
) else (
    echo [%date% %time%] Pull: No changes or error
)

:: Check for local changes
git diff --quiet 2>nul
set DIFF_RESULT=%errorlevel%

git diff --cached --quiet 2>nul
set CACHED_RESULT=%errorlevel%

:: Count untracked files
for /f %%i in ('git ls-files --others --exclude-standard ^| find /c /v ""') do set UNTRACKED=%%i

if %DIFF_RESULT% neq 0 (
    goto :docommit
)
if %CACHED_RESULT% neq 0 (
    goto :docommit
)
if %UNTRACKED% gtr 0 (
    goto :docommit
)

echo [%date% %time%] No local changes to push
goto :wait

:docommit
echo [%date% %time%] Local changes detected, pushing...
git add .
git commit -m "Auto-sync %date% %time%"
git push origin master
echo [%date% %time%] Push: Complete

:wait
echo [%date% %time%] Next sync in %SYNC_INTERVAL% seconds...
echo.
timeout /t %SYNC_INTERVAL% /nobreak >nul
goto :loop
