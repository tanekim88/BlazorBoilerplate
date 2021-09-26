FROM node:alpine as node

WORKDIR /src
COPY app ./app

RUN cd app && npm install && npm run build

FROM nginx:alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=node /wwwroot /usr/share/nginx/html/app