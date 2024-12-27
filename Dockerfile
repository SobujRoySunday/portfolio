# Stage 1: Build the Next.js application
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock) files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire project to the container
COPY . .

# Build the Next.js application
RUN npm run build

# Stage 2: Serve the Next.js application with a lightweight image
FROM node:18-alpine AS runner

# Set working directory
WORKDIR /app

# Install only production dependencies
COPY package*.json ./
RUN npm install --production

# Copy built application from the builder stage
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/package.json ./

# Expose the port Next.js will run on
EXPOSE 3000

# Start the application
CMD ["npm", "run", "start"]
