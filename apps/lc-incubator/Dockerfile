# Stage 1: Build
FROM node:20-alpine as build
WORKDIR /app

ARG ENVIRONMENT=test
ENV NODE_ENV=${ENVIRONMENT}

RUN rm -rf node_modules
COPY package*.json ./

RUN npm install --foreground-scripts

COPY . .

WORKDIR /app/apps/lc-incubator

# Use the environment variable in your build command if necessary
RUN npx nx build lc-incubator --configuration=${ENVIRONMENT}
RUN npm prune --production

# Stage 2: Serve with nginx
FROM nginx:alpine
WORKDIR /app

COPY --from=build /app/dist/apps/lc-incubator /usr/share/nginx/html
COPY --from=build /app/apps/lc-incubator/nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
