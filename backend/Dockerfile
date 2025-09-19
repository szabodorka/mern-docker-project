FROM node:20-alpine
WORKDIR /app
RUN apk add --no-cache ca-certificates && update-ca-certificates
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3005
ENTRYPOINT [ "node" ]
CMD [ "server.js" ]