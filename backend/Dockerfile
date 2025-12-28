FROM node:18-bullseye

#Install system dependencies
RUN apt-get update && apt-get install -y \
    libreoffice \
    poppler-utils \
    fonts-dejavu \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 5000
CMD ["npm", "start"]