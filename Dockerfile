ARG IMAGE
ARG TAG

# Primera etapa
FROM ${IMAGE}:${TAG} as BUILD

RUN apk update && apk add --no-cache \
    build-base gcc autoconf automake zlib-dev \
    libpng-dev nasm bash vips-dev

ARG ENVIROMENT
ENV NODE_ENV=${ENVIROMENT}

WORKDIR /opt/

COPY package.json ./

RUN yarn install

ENV PATH /opt/node_modules/.bin:$PATH

WORKDIR /opt/app

COPY . .

RUN chown -R node:node /opt/app

USER node

RUN ["yarn", "build"]

#Segunda etapa
FROM ${IMAGE}:${TAG} as development

WORKDIR /opt/app

COPY package*.json ./

RUN yarn install --only=development

COPY --from=BUILD /opt/app/ /opt/app/

EXPOSE 1337

CMD ["yarn", "develop"]
