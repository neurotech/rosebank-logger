'use strict';

var _ = require('lodash');
var async = require('async');
var config = require('./config');
var server = require('./lib/hapi');
var r = require('./lib/db');
require('rethinkdb-init')(r);

var schema = ['fatal', 'error', 'warn', 'info'];
var check = _.includes(r.dbList(), config.rethinkdb.db);

if (check === false) {
  async.series([
    function skeleton (callback) {
      r.init({
        host: config.rethinkdb.servers[0].host,
        port: config.rethinkdb.servers[0].port,
        db: config.rethinkdb.db
      }, schema)
        .then(function (conn) {
          console.log('[rethinkdb] ' + 'Created db: ' + config.rethinkdb.db + ' with tables: ' + schema);
          callback(null, 'skeleton');
        }
      );
    },
    function complete (callback) {
      r.getPoolMaster().drain();
      console.log('[rethinkdb] ' + 'Complete - drained connection pool.');
      server.start(function () {
        console.log('rosebank-logger listening at http://' + config.http.host + ':' + config.http.port + '/logger');
        require('./lib/alerts');
      });
      callback(null, 'complete');
    }
  ]);
}

console.log('DB setup. Starting server...');
server.start(function () {
  console.log('rosebank-logger listening at http://' + config.http.host + ':' + config.http.loggerPort + '/logger');
  require('./lib/alerts');
});
