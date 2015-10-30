'use strict';

var hapi = require('hapi');
var config = require('../config');
var routes = require('./routes');

var server = new hapi.Server();

server.connection({
  host: config.http.host,
  port: config.http.port,
  router: { stripTrailingSlash: true },
  routes: { cors: true }
});

server.route(routes);

module.exports = server;