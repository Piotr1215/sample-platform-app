FROM node:14-alpine

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install
COPY . .

EXPOSE 5000
CMD [ "node", "server.js" ]
ADD index.html /usr/share/nginx/html/
ADD azure-blob.js /usr/share/nginx/html/
