FROM node:20-bookworm-slim

# Empêche Puppeteer de télécharger Chromium
ENV PUPPETEER_SKIP_DOWNLOAD=true

# Installer Chromium + dépendances système
RUN apt-get update && apt-get install -y \
  chromium \
  ca-certificates \
  fonts-dejavu \
  fonts-noto-core \
  fonts-noto-color-emoji \
  libasound2 \
  libatk-bridge2.0-0 \
  libatk1.0-0 \
  libcups2 \
  libdrm2 \
  libgbm1 \
  libgtk-3-0 \
  libnss3 \
  libx11-xcb1 \
  libxcomposite1 \
  libxdamage1 \
  libxfixes3 \
  libxrandr2 \
  libxshmfence1 \
  libxss1 \
  libxtst6 \
  xdg-utils \
  && rm -rf /var/lib/apt/lists/*

# Variable utilisée par le script Puppeteer
ENV CHROMIUM_PATH=/usr/bin/chromium

WORKDIR /app

# Installer les dépendances Node
COPY package*.json ./
RUN npm install --production

# Copier le script
COPY generate.js .

# Dossier de sortie du PDF
RUN mkdir -p /output

CMD ["node", "generate.js"]
