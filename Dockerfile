FROM node:20 as frontend
LABEL authors="Jordan"
WORKDIR /app

COPY build/ ./
COPY package*.json ./

RUN npm ci --omit dev

CMD ["node", "/app"]
