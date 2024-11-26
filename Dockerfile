# Use the official Node.js image as the base image
FROM node:14

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the React app
RUN npm run build

# Use the official Nginx image to serve the build
FROM nginx:alpine

# Copy the build output to the Nginx html directory
COPY --from=0 /app/build /usr/share/nginx/html

# Expose port 10017
EXPOSE 10017

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]