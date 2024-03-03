FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install
RUN npm install -g jq
RUN npm install commander

# Copy app code
COPY . .

# Set entrypoint script
CMD [ "sh", "-c", "chmod +x ./script.sh && ./script.sh" ]
