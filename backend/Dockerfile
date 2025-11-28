FROM node:22-alpine

# Permet d'avoir quelques outils de base (optionnel)
RUN apk add --no-cache bash

WORKDIR /usr/src/app

# Installer les deps en utilisant uniquement les fichiers de dépendances
COPY package*.json ./
RUN npm install

# Copier le reste du code source
COPY . .

# Port par défaut d'Adonis en dev
EXPOSE 3333

# Commande de dev (hot reload)
CMD ["npm", "run", "dev"]