# syntax=docker/dockerfile:1

FROM node:16.10.0 as build
# RUN apk add --no-cache python g++ make

WORKDIR /app
EXPOSE 80
EXPOSE 443
COPY app .
ENV CHOKIDAR_USEPOLLING=true
RUN npm i && npm install -g sass && npm run build

# CMD ["npm", "run", "start"]

FROM nginx:alpine
COPY /app/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /wwwroot /usr/share/nginx/html/app
# CMD ["tail", "-f", "/dev/null"]