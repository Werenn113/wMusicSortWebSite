#!/bin/bash

# Fonction pour afficher des messages
log() { echo -e "\n🔹 \033[1;36m$1\033[0m"; }
warn() { echo -e "\n🔸 \033[1;33m$1\033[0m"; }

log "🚀 DÉMARRAGE DE L'INSTALLATION..."
sudo -v

# 1. GIT
if ! command -v git &> /dev/null; then
    log "📦 Installation de Git..."
    sudo apt-get update && sudo apt-get install -y git
fi

# 2. NODE.JS (Version Système sans NVM)
if ! command -v node &> /dev/null; then
    log "📦 Installation de Node.js 20..."
    sudo apt-get install -y curl
    curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
    sudo apt-get install -y nodejs
fi

# 3. DOCKER
if ! command -v docker &> /dev/null; then
    log "🐳 Installation de Docker..."
    sudo apt-get update
    sudo apt-get install -y ca-certificates curl gnupg
    sudo install -m 0755 -d /etc/apt/keyrings
    [ -f /etc/apt/keyrings/docker.gpg ] && sudo rm /etc/apt/keyrings/docker.gpg
    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
    sudo chmod a+r /etc/apt/keyrings/docker.gpg
    echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
    sudo apt-get update
    sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
    sudo usermod -aG docker $USER
fi

# Démarrage service Docker
if ! docker info > /dev/null 2>&1; then
    sudo service docker start
fi

log "📦 Installation des dépendances..."
npm install
cd backend && npm install && cd ..
cd frontend && npm install && cd ..

log "🚀 Lancement des bases de données..."
if docker compose -f docker-compose.dev.yml up -d; then
    log "✅ TOUT EST PRÊT ! Tapez : npm run dev"
else
    warn "❌ Docker nécessite un redémarrage de session (fermez/rouvrez le terminal)."
fi