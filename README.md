# 🎵 wMusicSort - Spotify AI Playlist Sorter

<div align="center">

**Classifiez automatiquement votre bibliothèque musicale Spotify par genres avec l'intelligence artificielle**

[![AdonisJS](https://img.shields.io/badge/Backend-AdonisJS-5A45FF?style=flat&logo=adonisjs)](https://adonisjs.com/)
[![Nuxt](https://img.shields.io/badge/Frontend-Nuxt%203-00DC82?style=flat&logo=nuxt.js)](https://nuxt.com/)
[![Spotify](https://img.shields.io/badge/API-Spotify-1DB954?style=flat&logo=spotify)](https://developer.spotify.com/)
[![Google AI](https://img.shields.io/badge/AI-Gemini-4285F4?style=flat&logo=google)](https://ai.google.dev/)

</div>

---

## 📖 Description

**wMusicSort** est une application web full-stack qui permet aux utilisateurs de Spotify de classifier automatiquement leurs morceaux musicaux en utilisant l'intelligence artificielle de Google Gemini. L'application analyse vos playlists et organise vos morceaux en créant de nouvelles playlists par genre musical.

### ✨ Fonctionnalités principales

- 🔐 **Authentification sécurisée** : Système d'inscription/connexion avec gestion des sessions
- 🎧 **Intégration Spotify** : Connexion OAuth avec votre compte Spotify
- 📚 **Gestion des playlists** : Visualisation de vos playlists et morceaux
- 🤖 **Classification IA** : Analyse automatique des genres musicaux via Google Gemini
- 🎨 **Interface moderne** : UI réactive et intuitive avec Nuxt UI

---

## 🏗️ Architecture

Le projet est structuré en monorepo avec deux applications principales :

```
wMusicSortWebSite/
├── backend/          # API REST (AdonisJS v6)
├── frontend/         # Interface utilisateur (Nuxt 4)
├── bruno_test/       # Collection de tests API (Bruno)
└── .dev/             # Scripts pour setup l'environnement de dev

```

### 🔧 Stack Technique

#### Backend (AdonisJS)

- **Framework** : AdonisJS v6
- **Authentification** : @adonisjs/auth + @adonisjs/ally (OAuth Spotify)
- **Base de données** : PostgreSQL avec Lucid ORM
- **Cache** : Redis
- **IA** : Google Generative AI (Gemini)
- **APIs externes** : Spotify Web API
- **Validation** : VineJS

#### Frontend (Nuxt)

- **Framework** : Nuxt 4 avec TypeScript
- **UI** : Nuxt UI (basé sur Tailwind CSS)
- **State Management** : Pinia
- **Validation** : Zod
- **Icônes** : Lucide Icons

---

## 🚀 Installation

### Prérequis

- Node.js >= 20.x
- PostgreSQL >= 14
- Redis
- npm ou pnpm
- Un compte [Spotify Developer](https://developer.spotify.com/)
- Une clé API [Google AI Studio](https://ai.google.dev/)

### 1. Cloner le repository

```bash
git clone <repository-url>
cd wMusicSortWebSite
```

### 2. Configuration des variables d'environnement

#### Backend

Créez un fichier `.env` dans le dossier `backend/` :

```env
# Application
PORT=3333
HOST=127.0.0.1
NODE_ENV=development
APP_KEY=<générer-avec-node-ace-generate:key>
SESSION_DRIVER=cookie

# Database
DB_HOST=127.0.0.1
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=
DB_DATABASE=wmusicsort

# Redis
REDIS_HOST=127.0.0.1
REDIS_PORT=6379
REDIS_PASSWORD=

# Spotify OAuth
SPOTIFY_CLIENT_ID=<votre-client-id>
SPOTIFY_CLIENT_SECRET=<votre-client-secret>
SPOTIFY_CALLBACK_URL=http://localhost:3333/spotify/callback

# Google Gemini
GEMINI_API_KEY=<votre-clé-api-gemini>
```

### 3. Installation des dépendances

```bash
# Installation globale
npm install

# Installation backend
cd backend
npm install

# Installation frontend
cd ../frontend
npm install
```

### 4. Configuration de la base de données

```bash
cd backend
node ace migration:run
```

### 5. Lancement du projet

#### Option A : Lancement automatique (développement)

```bash
# À la racine du projet
npm run dev
```

Cette commande lancera simultanément le backend et le frontend.

#### Option B : Lancement séparé

```bash
# Terminal 1 - Backend
npm run dev:backend

# Terminal 2 - Frontend
npm run dev:frontend
```

L'application sera accessible sur :

- **Frontend** : http://localhost:3000
- **Backend API** : http://localhost:3333

---

## 📚 Documentation API

### Authentification

#### Endpoints publics

- `POST /auth/register` - Créer un compte
- `POST /auth/login` - Se connecter

#### Endpoints protégés

- `GET /auth/user_data` - Récupérer les données de l'utilisateur
- `POST /auth/logout` - Se déconnecter
- `DELETE /auth/delete_user` - Supprimer son compte

### Intégration Spotify

Tous les endpoints nécessitent une authentification :

- `GET /spotify/link` - Initier la connexion OAuth Spotify
- `GET /spotify/callback` - Callback OAuth Spotify
- `GET /spotify/status` - Vérifier le statut de la connexion
- `POST /spotify/logout` - Déconnecter Spotify
- `GET /spotify/playlists` - Récupérer les playlists de l'utilisateur
- `GET /spotify/tracks/:playlistId` - Récupérer les morceaux d'une playlist

### Intelligence Artificielle

- `GET /ai/test` - Tester l'intégration avec Gemini

---

## 🧪 Tests

Le projet inclut une collection de tests API avec Bruno :

```bash
# Les tests sont disponibles dans le dossier bruno_test/
# Utilisez Bruno CLI ou l'application Bruno pour les exécuter
```

Collections disponibles :

- Authentication (Register, Login, Logout, User data)
- Spotify (Link, Callback, Status, Playlists, Tracks)
- AI (Test Gemini)

---

## 🔐 Sécurité

- Les mots de passe sont hachés avec Argon2
- Les sessions sont sécurisées avec des cookies HTTP-only
- Les tokens OAuth Spotify sont stockés de manière sécurisée
- CORS configuré pour autoriser uniquement le frontend
- Middleware d'authentification sur toutes les routes sensibles

---

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à :

1. Fork le projet
2. Créer une branche (`git checkout -b feature/AmazingFeature`)
3. Commit vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

---

## 📝 Scripts disponibles

### Racine du projet

```bash
npm run setup          # Configuration initiale du projet
npm run dev            # Lancer backend + frontend en parallèle
npm run dev:backend    # Lancer uniquement le backend
npm run dev:frontend   # Lancer uniquement le frontend
npm run db:refresh     # Réinitialiser la base de données
```

### Backend

```bash
npm run dev           # Mode développement avec HMR
npm run build         # Build pour production
npm start             # Démarrer en production
npm test              # Lancer les tests
npm run lint          # Vérifier le code
npm run format        # Formatter le code
npm run typecheck     # Vérifier les types TypeScript
```

### Frontend

```bash
pnpm dev              # Mode développement
pnpm build            # Build pour production
pnpm preview          # Prévisualiser le build
pnpm lint             # Vérifier le code
pnpm typecheck        # Vérifier les types TypeScript
```

---

## 📄 Licence

Ce projet est un projet personnel éducatif.

---

## 👤 Auteur

**Werenn**

---

## 🙏 Remerciements

- [AdonisJS](https://adonisjs.com/) pour le framework backend
- [Nuxt](https://nuxt.com/) pour le framework frontend
- [Spotify](https://developer.spotify.com/) pour leur API Web
- [Google](https://ai.google.dev/) pour l'API Gemini
- [Nuxt UI](https://ui.nuxt.com/) pour les composants UI

---

<div align="center">

**Fait avec ❤️ pour organiser votre musique**

</div>
