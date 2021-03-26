FROM node
WORKDIR /usr/src/app
COPY src/package*.json ./
RUN npm install
COPY src/. ./
EXPOSE 3000
CMD ["node", "--inspect=0.0.0.0", "index.js"]