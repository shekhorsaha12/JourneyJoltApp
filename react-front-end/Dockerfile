FROM node:16-alpine

# set work directory
WORKDIR /usr/src/app

COPY ./package.json ./

RUN npm i

COPY ./public ./public
COPY ./src ./src
COPY ./index.html ./
COPY ./vite.config.js ./
COPY ./vercel.json ./

RUN npm run build

EXPOSE 3000

CMD ["npx", "vite", "preview", "--port", "3000", "--host"]
