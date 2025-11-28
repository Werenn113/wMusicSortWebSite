FROM node:22-alpine

RUN apk add --no-cache bash

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

# Port dev de Nuxt (par défaut 3000)
EXPOSE 3000

# Lancer Nuxt en mode dev, accessible depuis l'extérieur
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "3000"]