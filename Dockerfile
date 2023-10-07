FROM node:20-alpine
RUN npm install
RUN ng build
