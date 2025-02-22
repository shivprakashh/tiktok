FROM ghcr.io/puppeteer/puppeteer:24.2.1

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome-stable

WORKDIR /usr/src/app

COPY package*.json ./
COPY . .
CMD ["node","index.js"]