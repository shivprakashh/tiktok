# Use the official Puppeteer base image
FROM ghcr.io/puppeteer/puppeteer:24.2.1

# Switch to root user to allow apt-get installation
USER root

# Install system dependencies required for Chromium
RUN apt-get update && apt-get install -y \
    wget \
    ca-certificates \
    fonts-liberation \
    libappindicator3-1 \
    libnspr4 \
    libnss3 \
    libx11-xcb1 \
    libxcomposite1 \
    libxdamage1 \
    libxrandr2 \
    xdg-utils \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Install Google Chrome (for Puppeteer to use)
RUN curl -sSL https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb -o google-chrome-stable_current_amd64.deb \
    && dpkg -i google-chrome-stable_current_amd64.deb \
    && apt-get -f install -y \
    && rm google-chrome-stable_current_amd64.deb

# Set Puppeteer environment variables
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome-stable

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if it exists) into the container
COPY package*.json ./

# Install npm dependencies (including express and any other modules)
RUN npm install --legacy-peer-deps

# Copy the rest of the application files into the container
COPY . .

# Clean npm cache (optional, but useful for avoiding stale dependencies)
RUN npm cache clean --force

# Ensure latest version of npm is installed (Render may use an outdated version)
RUN npm install -g npm@latest

# Command to run your Node.js application
CMD ["node", "index.js"]
