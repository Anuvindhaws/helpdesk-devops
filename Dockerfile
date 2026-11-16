FROM node:22-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --omit=dev
COPY app.js ./
COPY public ./public
RUN mkdir -p /app/data && chown -R node:node /app
ENV NODE_ENV=production PORT=3000 DATA_DIR=/app/data
USER node
EXPOSE 3000
CMD ["node","app.js"]
