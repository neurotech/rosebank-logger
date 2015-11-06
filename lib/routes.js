var Joi = require('joi');
var moment = require('moment');
var r = require('./db');

var routeOptions = {
  payload: {
    parse: true
  },
  validate: {
    params: false,
    query: false
  }
};

function _insert (request, reply, table) {
  var now = moment();
  r.table(table)
    .insert(request.payload)
    .then(function (result) {
      reply({ loggedAt: now, level: table, payload: request.payload });
    });
};

var routes = [
  {
    // POST /logger/fatal {Object}
    method: 'POST',
    path: '/logger/fatal',
    config: routeOptions,
    handler: function (request, reply) {
      _insert(request, reply, 'fatal');
    }
  },
  {
    // POST /logger/error {Object}
    method: 'POST',
    path: '/logger/error',
    config: routeOptions,
    handler: function (request, reply) {
      _insert(request, reply, 'error');
    }
  },
  {
    // POST /logger/warn {Object}
    method: 'POST',
    path: '/logger/warn',
    config: routeOptions,
    handler: function (request, reply) {
      _insert(request, reply, 'warn');
    }
  },
  {
    // POST /logger/info {Object}
    method: 'POST',
    path: '/logger/info',
    config: routeOptions,
    handler: function (request, reply) {
      _insert(request, reply, 'info');
    }
  }
];

module.exports = routes;
