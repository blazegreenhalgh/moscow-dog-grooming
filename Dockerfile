FROM node:24-bookworm-slim AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

ARG PUBLIC_KEYSTATIC_GITHUB_APP_SLUG=moscow-dog-grooming-keystatic
ENV PUBLIC_KEYSTATIC_GITHUB_APP_SLUG=$PUBLIC_KEYSTATIC_GITHUB_APP_SLUG

RUN npm run build

FROM node:24-bookworm-slim AS runtime

WORKDIR /app

ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=8080

COPY package.json package-lock.json ./
RUN npm ci --omit=dev && npm cache clean --force

COPY --from=build /app/dist ./dist

RUN chown -R node:node /app
USER node

EXPOSE 8080

CMD ["node", "./dist/server/entry.mjs"]
