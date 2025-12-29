FROM node:20-bullseye

RUN apt-get update && apt-get install -y \
    graphicsmagick \
    ghostscript \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 5000
CMD ["npm", "start"]
