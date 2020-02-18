FROM node:9.3.0-alpine

ENV APP_HOME /usr/set-node
ENV NPM_CONFIG_LOGLEVEL warn

# Add packages needed to build native dependencies
RUN apk add --no-cache \
    curl \
    git \
    python \
    build-base

RUN mkdir $APP_HOME
WORKDIR $APP_HOME

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install --silent

# Bundle app source

COPY . .

HEALTHCHECK --start-period=5s --interval=10s \
  CMD curl -f http://localhost:3001/healthcheck || exit 1

CMD npm run start-docker
