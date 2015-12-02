'use strict';

var hapi = require('hapi');
var config = require('../config');
var routes = require('./routes');

var server = new hapi.Server();

server.connection({
  host: config.http.host,
  port: config.http.loggerPort,
  router: { stripTrailingSlash: true },
  labels: ['logger']
});

server.connection({
  host: config.http.host,
  port: config.http.triagePort,
  router: { stripTrailingSlash: true },
  routes: { cors: true },
  labels: ['triage']
});

server.route(routes);

module.exports = server;
