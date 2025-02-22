# Use the official Puppeteer base image
FROM ghcr.io/puppeteer/puppeteer:24.2.1

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
    && rm -rf /var/lib/apt/lists/*

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
