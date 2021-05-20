FROM node:14.17.0-alpine as builder
ENV NODE_ENV=development
WORKDIR /app
COPY package.json yarn.loc* ts*.json *.js /app/
RUN yarn install && \
    yarn cache clean
COPY . .
RUN yarn build
### --- End of Builder ---
FROM node:14.17.0-alpine
ENV NODE_ENV=production \
    TZ=Asia/Bangkok
WORKDIR /app
COPY package.json yarn.loc* ts*.json *.js /app/
RUN yarn install && \
    yarn cache clean && \
    rm -rf /var/lib/apt/lists/*
COPY --from=builder /app/dist /app/dist
CMD ["yarn", "start"]