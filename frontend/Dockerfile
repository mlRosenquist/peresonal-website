FROM node:20-alpine AS build

WORKDIR /app
COPY . .
RUN yarn
RUN yarn build


FROM node:20-alpine AS deploy
 
WORKDIR /app
RUN rm -rf ./*
COPY --from=build /app/package.json .
COPY --from=build /app/build .
RUN yarn --prod
CMD ["node", "index.js"]