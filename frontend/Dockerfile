# Use the official Node.js image as the base image
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and lock file to the container
COPY package.json pnpm-lock.yaml ./

# Install dependencies using pnpm
RUN npm install -g pnpm && pnpm install

# Copy the rest of the application files to the container
COPY . .

# Expose the port on which the Vite dev server runs
EXPOSE 5173

# Command to start the Vite development server
CMD ["pnpm", "run", "dev", "--host"]