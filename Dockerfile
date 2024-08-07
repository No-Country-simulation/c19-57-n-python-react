FROM node:18

WORKDIR /app

COPY package.json .

ARG NODE_ENV=production

ENV NODE_ENV=$NODE_ENV
ENV VITE_IMG_FOLDER_URL=/imagenes
ENV VITE_API_URL=http://127.0.0.1:8000

RUN npm install

RUN npm i -g serve

COPY . .

RUN npm run build

EXPOSE 3000

CMD [ "serve", "-s", "dist" ]