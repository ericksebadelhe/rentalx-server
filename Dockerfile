FROM node

WORKDIR /usr/app

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 3333

# Rodar 'npm run den'
CMD ["npm","run","dev"]
