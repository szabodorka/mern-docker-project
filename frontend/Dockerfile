FROM node:18-alpine AS build
WORKDIR /app
COPY package*json .
RUN npm i
COPY . .
RUN npm run build

FROM nginx:1.29-alpine
COPY ./nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80