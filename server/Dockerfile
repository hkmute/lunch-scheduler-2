FROM node:18 AS builder
RUN apt-get update && apt-get install -y --no-install-recommends dumb-init
ENV YARN_CACHE_FOLDER=/usr/local/yarn-cache
VOLUME /usr/local/yarn-cache
WORKDIR /usr/src/app
COPY ./package.json ./package.json
RUN yarn install --prod --network-timeout 600000
COPY . .
RUN yarn build

FROM node:18-alpine3.16
ENV NODE_ENV production
COPY --from=builder /usr/bin/dumb-init /usr/bin/dumb-init
USER node
WORKDIR /usr/src/app
COPY --from=builder --chown=node:node /usr/src/app/node_modules ./node_modules
COPY --from=builder --chown=node:node /usr/src/app/dist .
EXPOSE 8080
CMD ["node", "main"]