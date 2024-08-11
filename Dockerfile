FROM node:18-alpine AS production
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

RUN npm run build
EXPOSE 3000

ENV PORT 3000
CMD ["npm","run", "dev"]
