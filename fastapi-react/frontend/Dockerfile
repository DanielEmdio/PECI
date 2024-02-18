# bun docker image
# FROM oven/bun:1.0.27
FROM node:21.6.2

# set frontend directory as working dir
WORKDIR /frontend

# copy code and assets to target dir
COPY . ./

# install dependencies
RUN npm install

# build for production
RUN npm run build

# start production server on port 3000
# CMD ["serve", "-s", "build", "-p", "3000"]
CMD ["npx", "serve", "-s", "build", "-p", "3000"]
