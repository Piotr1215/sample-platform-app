FROM node:20-slim  

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .

ENV AZURE_STORAGE_CONNECTION_STRING=
EXPOSE 3000
CMD [ "node", "server.js" ]
