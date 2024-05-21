FROM node:18-alpine

WORKDIR /frontend

COPY package*.json ./
COPY tsconfig.json ./

COPY app/ /frontend/app/
COPY components/ /frontend/components/
COPY constants/ /frontend/constants/
COPY interfaces/ /frontend/interfaces/
COPY services/ /frontend/services/
COPY theme/ /frontend/theme/
COPY utils/ /frontend/utils/
COPY public/ /frontend/public/
COPY .next/ /frontend/.next/

RUN npm install --silent

EXPOSE 3000