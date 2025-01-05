# -----------------------
# 1. BUILD STAGE
# -----------------------
  FROM node:20-alpine AS builder

  # Create a working directory inside the container
  WORKDIR /app
  
  # Copy the root package files (for npm workspaces)
  COPY package.json package-lock.json ./
  
  # Copy the server package.json
  COPY packages/user-server/package.json packages/user-server/
  
  # Install dependencies (workspace-aware since npm v7+)
  RUN npm install
  
  # Now copy all source code into the container (the rest of the monorepo)
  COPY . .
  
  # Build just the server workspace
  RUN npm run build --workspace=@real-one-chess-king/user-server
  
  # -----------------------
  # 2. RUNTIME STAGE
  # -----------------------
  FROM node:20-alpine AS runner
  
  WORKDIR /app
  
  # Copy only the built server code from the builder
  COPY --from=builder /app/packages/user-server/dist ./dist
  
  # Copy node_modules from builder
  COPY --from=builder /app/node_modules ./node_modules
  
  # Expose NestJS port
  EXPOSE 3000
  
  # Set default command (assuming "main.js" is your NestJS entrypoint)
  CMD ["node", "dist/main.js"]
  