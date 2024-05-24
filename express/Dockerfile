
# Use an official Node.js runtime as the base image
FROM node:14

# Set the working directory in the Docker image
WORKDIR /usr/src/app

# Copy package.json and package-lock.json into the Docker image
COPY package*.json ./

# Install the application dependencies inside the Docker image
RUN npm install

# If you are building your code for production
# RUN npm ci --only=production

# Copy the rest of your application's source code into the Docker image
COPY . .

# Expose port 3004 for the application
EXPOSE 3004

# Define the command to run your application
CMD [ "npm", "start" ]
