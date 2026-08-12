FROM node:26-alpine

WORKDIR /opt/app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build && mkdir -p public/uploads && chmod -R 755 public

EXPOSE 1337

CMD ["npm", "run", "start"]
