FROM node:14

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=production

# Copy all  files into the docker image
COPY . .

# Listen to port 3000
EXPOSE 3000

ENV NODE_ENV=production

# Start the script (see package.json)
CMD [ "npm", "start" ]