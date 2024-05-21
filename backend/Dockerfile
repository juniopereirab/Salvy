FROM node:16.20.0-alpine

#Define the work directory path
WORKDIR /backend

#Copy configuration files to work directory
COPY package*.json ./
COPY tsconfig.json ./
#Copy the source code to work directory
COPY src/ /backend/src/

#Installing the dependencies inside the Docker
RUN npm install --silent

EXPOSE 5050