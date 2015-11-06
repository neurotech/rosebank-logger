'use strict';

var config = {};

config.rethinkdb = {
  db: process.env.ROSEBANK_LOGGER_DB,
  servers: [
    {
      host: process.env.ROSEBANK_LOGGER_DBHOST,
      port: process.env.ROSEBANK_LOGGER_DBPORT
    }
  ],
  silent: true
};

config.http = {
  host: process.env.ROSEBANK_LOGGER_HTTPHOST,
  port: process.env.ROSEBANK_LOGGER_HTTPPORT
};

module.exports = config;