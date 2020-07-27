FROM node:latest as builder

WORKDIR /src

COPY package.json yarn.lock ./

RUN yarn install \
  --prefer-offline \
  --frozen-lockfile \
  --non-interactive \
  --production=false

ARG ELASTIC_SEARCH_SERVER
ARG ELASTIC_SEARCH_CREDENTIALS
ARG CONTACT_MESSAGE_RELAY_URL
ARG RECAPTCHA_KEY
ARG MEDIA_URL
ARG API_URL

ENV NODE_ENV=production
ENV NUXT_TELEMETRY_DISABLED=1

COPY . .

RUN yarn build

RUN rm -rf node_modules && \
  NODE_ENV=production yarn install \
  --prefer-offline \
  --pure-lockfile \
  --non-interactive \
  --production=true

FROM node:alpine

WORKDIR /src

COPY --from=builder /src  .

ENV HOST 0.0.0.0

EXPOSE 3000

USER 33

CMD [ "yarn", "start" ]
