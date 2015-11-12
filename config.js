'use strict';

var config = {};

config.rethinkdb = {
  db: process.env.ROSEBANK_LOGGER_DB,
  servers: [
    {
      host: process.env.ROSEBANK_DATASTORE_HOST,
      port: process.env.ROSEBANK_DATASTORE_PORT
    }
  ],
  silent: false
};

config.http = {
  host: '0.0.0.0',
  port: process.env.ROSEBANK_LOGGER_HTTPPORT
};

module.exports = config;