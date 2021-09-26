FROM node:16.0.0 as build
# RUN apk add --no-cache python g++ make

WORKDIR /app
COPY app .

RUN npm install -g npm && npm i

CMD ["npm", "run", "start"]