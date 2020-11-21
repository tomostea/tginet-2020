FROM node:12.19.0
WORKDIR /app
COPY ["package*.json", "./"]
COPY . .
EXPOSE 3000
CMD npm start