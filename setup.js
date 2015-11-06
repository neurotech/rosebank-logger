'use strict';

var config = require('./config');
var r = require('./lib/db');
require('rethinkdb-init')(r);

var async = require('async');
var moment = require('moment');
var chalk = require('chalk');

var now = moment().format();

var schema = ['fatal', 'error', 'warn', 'info'];

async.series([
  function skeleton (callback) {
    r.init({
        host: config.rethinkdb.servers[0].host,
        port: config.rethinkdb.servers[0].port,
        db: config.rethinkdb.db
      }, schema)
      .then(function (conn) {
        console.log(chalk.magenta('[rethinkdb] ') + 'Created db: ' + chalk.green(config.rethinkdb.db) + ' with tables: ' + schema);
        callback(null, 'skeleton');
      }
    );
  },
  function complete (callback) {
    r.getPoolMaster().drain();
    console.log(chalk.magenta('[rethinkdb] ') + 'Complete - drained connection pool.');
    setTimeout(process.exit(), 1000);
    callback(null, 'complete')
  }
]);