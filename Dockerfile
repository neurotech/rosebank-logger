FROM nodesource/jessie:4.2.0
MAINTAINER Tim Douglas <neurotech@gmail.com>

# Set timezone
RUN echo "Australia/Sydney" > /etc/timezone
ENV TZ="Australia/Sydney"

COPY package.json package.json
RUN npm install

COPY . .

# Cleanup
RUN rm -rf /root/.npm

# Expose ports
EXPOSE 10001
EXPOSE 10002

# Run the application
CMD [ "node", "app.js" ]
