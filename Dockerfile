# build stage
FROM node:lts-alpine as build-stage

ARG VITE_ENTERPRISE_API_URL

WORKDIR /app

COPY ["package.json", "yarn.lock", ".yarnrc.yml", "./"]
COPY [".yarn/releases/", "./.yarn/releases/"]

RUN yarn install

COPY . .

RUN yarn run build



# production stage
FROM nginx:stable-alpine as production-stage

COPY --from=build-stage /app/dist /app
COPY docker/nginx/nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]