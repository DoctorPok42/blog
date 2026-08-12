FROM node:24-alpine

WORKDIR /opt/app

RUN apk add --no-cache python3 make g++ pkgconfig libc6-compat

COPY package*.json ./
RUN npm install --legacy-peer-deps

COPY . .

RUN npm run build && mkdir -p public/uploads && chmod -R 755 public

EXPOSE 1337

CMD ["npm", "run", "start"]
