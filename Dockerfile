# Use Node LTS
FROM node:18-alpine
WORKDIR /usr/src/app

# Install
COPY package.json package-lock.json* ./
RUN npm install --production

# Copy source
COPY . .

EXPOSE 3000
ENV PORT=3000
CMD ["node", "src/index.js"]
