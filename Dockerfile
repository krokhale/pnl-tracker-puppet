# --- Build stage ---
FROM node:20-alpine AS builder

RUN apk add --no-cache libc6-compat curl unzip aws-cli udev ttf-freefont nss chromium
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium

WORKDIR /usr/src/app

# Install all deps (dev + prod) for build
COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

## --- Runtime stage ---
#FROM node:20-alpine
#
##RUN apk add --no-cache libc6-compat curl unzip aws-cli udev ttf-freefont nss chromium
#RUN apk add --no-cache \
#  libc6-compat \
#  curl \
#  unzip \
#  aws-cli \
#  udev \
#  ttf-freefont \
#  nss \
#  chromium \
#  xvfb \
#  x11vnc
#
#
#ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium
#
#WORKDIR /usr/src/app
#
## Copy only built JS + prod deps
#COPY package*.json ./
#RUN npm install --omit=dev
#
#COPY --from=builder /usr/src/app/dist ./dist
#
#EXPOSE 3000
#EXPOSE 5900
#
#RUN chmod +x /usr/local/bin/docker-entrypoint.sh
#ENTRYPOINT ["/usr/local/bin/docker-entrypoint.sh"]
##CMD ["npm", "start"]


# --- Runtime stage ---
FROM node:20-alpine

RUN apk add --no-cache \
  libc6-compat curl unzip aws-cli udev ttf-freefont nss chromium \
  xvfb x11vnc

ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install --omit=dev

COPY --from=builder /usr/src/app/dist ./dist
COPY docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

#EXPOSE 3000
#EXPOSE 5900
CMD ["npm", "start"]
#ENTRYPOINT ["/usr/local/bin/docker-entrypoint.sh"]









#FROM node:20-alpine
#
## system deps
#RUN apk add --no-cache \
#  libc6-compat \
#  curl \
#  unzip \
#  aws-cli \
#  udev \
#  ttf-freefont \
#  chromium
#
#ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium
#
#WORKDIR /usr/src/app
#
## Copy manifests and install (with dev deps for tsc)
#COPY package*.json ./
#RUN npm install
#RUN npm run build
#
## Copy source
#COPY . .
#
## Build TypeScript → dist/
#RUN npm run build
#
## Run without dev deps if you want smaller image
## RUN npm prune --omit=dev
#
#CMD ["npm", "start"]
#
#
##docker build -t puppeteer-app:latest .
##docker run --rm -it -p 3000:3000 puppeteer-app:latest
