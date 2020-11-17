FROM node:12

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./
RUN apt-get update && apt-get -y install vim && apt-get -y install mongodb-clients && apt-get -y install kafkacat
RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 5000

ENV PORT=5000
ENV JWT_SECRET=test
ENV ORIGIN=*
ENV GROUP=glassdoor-api
ENV MOCK_KAFKA=false

RUN printenv

# CMD [ "node", "nodeServer.js" ]
CMD [ "npm", "start" ]
