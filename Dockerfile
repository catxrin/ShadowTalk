FROM node:22

WORKDIR /app

# COPY package*.json ./
COPY . .

RUN npm run install-all


ENV PORT=3000

EXPOSE 5173

CMD ["npm", "run", "dev"]