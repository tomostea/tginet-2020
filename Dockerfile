FROM node:12.19.0
WORKDIR /app
COPY ["package*.json", "./"]
RUN apt update && \
    apt install sqlite3 && \
    npm install
COPY . .
EXPOSE 3000
CMD npm start