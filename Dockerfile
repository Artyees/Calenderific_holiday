FROM node:18.14.0

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose port 5000 for the backend service
EXPOSE 5000

# Start the backend server
CMD ["npm", "start"]
