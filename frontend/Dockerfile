FROM node:26-alpine

WORKDIR /opt/app

COPY package*.json ./
RUN npm install

COPY . .

ARG API_URL=http://localhost:1337
ENV API_URL=$API_URL

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]
