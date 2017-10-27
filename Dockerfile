FROM node:8
WORKDIR /usr/discordbot/clashofcode

COPY package.json package-lock.json ./
RUN npm install -D

COPY . .

CMD [ "npm", "start" ]