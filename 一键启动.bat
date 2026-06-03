@echo off
chcp 65001 >nul
title 抖音电商素材工作台
echo ============================================
echo   抖音电商素材工作台 - 启动中...
echo ============================================
echo.
cd /d "D:\TRAE\AI智能体课程作业"
start "" node "D:\NODEJS\node_modules\npm\bin\npm-cli.js" run dev
echo.
echo ============================================
echo   服务器已启动！
echo   请在浏览器中打开: http://localhost:5173/
echo ============================================
echo.
echo   按任意键打开浏览器...
pause >nul
start "" http://localhost:5173/
