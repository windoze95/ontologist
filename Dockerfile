# --- Build stage ---
FROM node:22-alpine AS build

WORKDIR /app

# Install root dependencies
COPY package.json package-lock.json ./
RUN npm ci --ignore-scripts

# Install client dependencies and build
COPY client/package.json client/package-lock.json ./client/
RUN cd client && npm ci
COPY client/ ./client/
RUN cd client && npx vite build

# --- Production stage ---
FROM node:22-alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --omit=dev --ignore-scripts && \
    # Rebuild native modules (better-sqlite3) for this image
    npm rebuild better-sqlite3

COPY server/ ./server/
COPY --from=build /app/client/dist ./client/dist

RUN mkdir -p data

ENV NODE_ENV=production
ENV PORT=3001
ENV DATABASE_PATH=./data/progress.db

EXPOSE 3001

CMD ["node", "server/index.js"]
