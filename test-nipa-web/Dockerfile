# Use an official Node runtime as a parent image
FROM node:13.12.0-alpine

# Set the working directory in the container
WORKDIR /

# Bundle app source including the public and src directories
COPY . .

# install dependencies
RUN npm install
RUN npm install --save-dev ajv@^7

# Make port 3000 available to the world outside this container
EXPOSE 3000

# Run npm start when the container launches
CMD ["npm", "run" ,"start"]