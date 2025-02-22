# Stage 1: Build
FROM node:20 as build
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm i --frozen-lockfile
COPY . .
RUN npm run build

# Stage 2: Run
FROM node:20
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm i --production --frozen-lockfile
COPY --from=build /usr/src/app/dist ./dist
EXPOSE 3000
CMD ["node", "dist/src/index.js", "--watch"]
