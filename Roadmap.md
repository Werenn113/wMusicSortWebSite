# 🗺️ Roadmap : Spotify AI Sorter

**Projet :** Classificateur de Playlist via IA
**Stack :** AdonisJS (Backend) + Nuxt 3 (Frontend)
**APIs :** Spotify Web API + Google Gemini API

---

## 📅 Phase 1 : Configuration & Socle
- [X] **Spotify Dev** : Créer l'app sur le dashboard, récupérer `CLIENT_ID` et `CLIENT_SECRET`.
- [X] **Google AI** : Récupérer la clé API Gemini.
- [X] **Setup Backend** : Initialiser le projet AdonisJS (`npm init adonisjs@latest api-spotify`).
- [X] **Setup Frontend** : Initialiser le projet Nuxt (`npx nuxi@latest init client-spotify`).
- [X] **Git** : Initialiser le repository et faire le premier commit.

## 🔐 Phase 2 : Authentification (AdonisJS)
- [X] Installer le package `@adonisjs/ally`.
- [X] Configurer `config/ally.ts` avec les crédentials Spotify.
- [X] Définir les scopes :
    - `user-library-read`
    - `playlist-read-private`
    - `playlist-modify-public`
    - `playlist-modify-private`
- [X] Créer la route `GET /auth/spotify/redirect`.
- [X] Créer la route `GET /auth/spotify/callback`.
- [X] Gérer la persistance du Token (Cookie sécurisé ou Base de données).

## 🎵 Phase 3 : Service Spotify (Backend)
- [X] Créer `app/services/SpotifyService.ts`.
- [X] Implémenter `getUserPlaylists(token)` : Récupérer la liste des playlists.
- [X] Implémenter `getPlaylistTracks(token, playlistId)` : Récupérer les morceaux.
- [X] **Important** : Nettoyer la donnée (garder uniquement : ID, Artiste, Titre) pour alléger le payload vers l'IA.

## 🧠 Phase 4 : Intelligence Artificielle (Backend)
- [X] Installer le SDK Google Generative AI (`npm install @google/generative-ai`).
- [X] Créer `app/services/GeminiService.ts`.
- [ ] Définir le Prompt système (contexte + format JSON strict attendu).
- [ ] Implémenter le système de **Batching** (paquets de 50 morceaux max pour éviter le timeout).
- [ ] Implémenter le parsing de la réponse JSON de Gemini.

## 💾 Phase 5 : Création des Playlists (Backend)
- [ ] Dans `SpotifyService`, ajouter `createPlaylist(token, userId, name)`.
- [ ] Ajouter `addTracksToPlaylist(token, playlistId, trackUris)`.
- [ ] Créer le contrôleur final qui orchestre tout :
    1. Reçoit les genres désirés.
    2. Interroge Gemini.
    3. Crée les playlists sur Spotify.

## 🎨 Phase 6 : Interface Utilisateur (Nuxt)
- [ ] **Page Login** : Bouton de redirection vers le backend.
- [ ] **Middleware** : Gérer le retour du login et stocker l'état "connecté".
- [ ] **Dashboard** :
    - [ ] Afficher les playlists de l'user.
    - [ ] Input pour saisir les genres (tags).
    - [ ] Bouton d'action "Trier ma musique".
- [ ] **UX** : Ajouter un loader/spinner (l'opération IA peut être longue).
- [ ] **Page Résultat** : Afficher les liens vers les nouvelles playlists créées.

---

## 🔄 Flux de données (Rappel)

| Source | Action | Destination |
| :--- | :--- | :--- |
| **Nuxt** | Auth Request | **Adonis** |
| **Adonis** | Fetch Tracks | **Spotify** |
| **Adonis** | Classify (Batch) | **Gemini** |
| **Gemini** | JSON Response | **Adonis** |
| **Adonis** | Create Playlist | **Spotify** |