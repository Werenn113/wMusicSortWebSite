#!/bin/bash

if [ -f "./.dev/docker-compose.dev.yml" ]; then
    docker compose --env-file ./backend/.env -f ./.dev/docker-compose.dev.yml up -d
fi

cmd.exe /C "wt.exe -w 0 split-pane -V wsl.exe -d Ubuntu bash -c \"cd ./wMusicSortWebSite && npm run dev:frontend\""

npm run dev:backend