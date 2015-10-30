'use strict';

var config = {};

config.rethinkdb = {
  db: 'rosebank_logger',
  servers: [{ host: 'localhost', port: 28015}],
  silent: false
};

config.http = {
  host: 'localhost',
  port: 10001
};

module.exports = config;