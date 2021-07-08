FROM node:14

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=production

# Copy all  files into the docker image
COPY . .

# Listen to port 3002
EXPOSE 3002

ENV NODE_ENV=production

# Start the server via 'node server.js' (see package.json)
CMD [ "npm", "start" ]