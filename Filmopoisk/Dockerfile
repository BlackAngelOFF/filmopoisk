FROM node:alpine AS development
ENV NODE_ENV development

WORKDIR .

COPY ./app/package*.json .

RUN npm install

COPY ./app .

CMD ["npm","start"]

EXPOSE 3000