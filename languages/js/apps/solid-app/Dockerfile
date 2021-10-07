FROM node:16.10.0 as build
# RUN apk add --no-cache python g++ make

WORKDIR /app
COPY app .

RUN npm i && npm install -g sass && npm run build

CMD ["npm", "run", "start"]