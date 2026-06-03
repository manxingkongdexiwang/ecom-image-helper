@echo off
chcp 65001 >nul
title 抖音电商素材工作台
echo ============================================
echo   抖音电商素材工作台 - 启动中...
echo ============================================
echo.
cd /d "D:\TRAE\AI智能体课程作业"
node "D:\NODEJS\node_modules\npm\bin\npm-cli.js" run dev
echo.
echo ============================================
echo   服务已停止，按任意键退出
echo ============================================
pause >nul
