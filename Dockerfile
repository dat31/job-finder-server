FROM node:14-alpine3.13

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package.json ./
COPY yarn.lock ./
COPY .env.development ./
COPY .env.production ./

ENV NODE_ENV production
RUN yarn install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY ./dist .

ENV PORT=4000
EXPOSE 4000

CMD [ "node", "src/index.js" ]
USER node
