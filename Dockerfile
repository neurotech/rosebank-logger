FROM nodesource/jessie:4.2.0
MAINTAINER Tim Douglas <neurotech@gmail.com>

# Set timezone
RUN echo "Australia/Sydney" > /etc/timezone
ENV TZ="Australia/Sydney"

# Expose ports
EXPOSE 10001

# Clone repo and install dependencies
WORKDIR /src
RUN git clone https://github.com/neurotech/rosebank-logger.git .
RUN npm install --unsafe-perm

# Cleanup
RUN rm -rf /var/lib/apt/lists/* /tmp/* /root/.npm /root/.node-gyp

# Run the application
CMD [ "node", "app.js" ]