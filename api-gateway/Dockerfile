FROM node:13

WORKDIR /usr/src/app
COPY package.json ./
COPY package-lock.json ./
RUN npm ci --only=production 
COPY . .
EXPOSE 3001

CMD [ "npm", "start" ]   