FROM ubuntu
RUN apt-get update
RUN apt-get install curl -y
RUN curl -sL https://deb.nodesource.com/setup_15.x | bash -
RUN apt-get install nodejs -y
WORKDIR /usr/src/app
COPY src/package*.json ./
RUN npm install
COPY src/. ./
EXPOSE 3000
CMD ["node", "index.js"]