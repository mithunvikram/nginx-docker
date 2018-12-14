### STAGE 1: Build ###

# We label our stage as 'builder'
FROM node:8.11.3 as builder

# WORKDIR /application

# RUN pwd

# RUN ls

COPY application/package.json application/package-lock.json ./

# COPY application/. ./

# RUN ls
# RUN PWD 

RUN npm set progress=false && npm config set depth 0 && npm cache clean --force

## Storing node modules on a separate layer will prevent unnecessary npm installs at each build

RUN pwd && npm i --loglevel info && npm install node-sass && mkdir /ng-app && pwd && cp -R ./node_modules ./ng-app

WORKDIR /ng-app

# RUN pwd

RUN ls

RUN pwd

COPY  application/. /ng-app/

RUN ls -a

# RUN ls node_modules/.bin -a

# WORKDIR /ng-app

RUN pwd

## Build the angular app in production mode and store the artifacts in dist folder
RUN $(npm bin)/ng build --prod


### STAGE 2: Setup ###

FROM nginx:1.13.3-alpine

## Copy our default nginx config
COPY nginx/default.conf /etc/nginx/conf.d/

## Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

## From 'builder' stage copy over the artifacts in dist folder to default nginx public folder
COPY --from=builder /ng-app/dist /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]
