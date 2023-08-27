FROM node:16.20.2

RUN apt-get update && apt-get install -y build-essential gcc autoconf automake zlib1g-dev libpng-dev nasm bash libvips-dev

ARG NODE_ENV=development

ENV NODE_ENV=${NODE_ENV}

RUN mkdir /strapi

ENV APP_DIR=/strapi

WORKDIR ${APP_DIR}

COPY package.json /strapi/

RUN npm config set fetch-retry-maxtimeout 600000 -g && npm install

ENV PATH /strapi/node_modules/.bin:$PATH

COPY . /strapi/

RUN ["npm", "run", "build"]

EXPOSE 1337

CMD ["npm", "run", "develop"]
