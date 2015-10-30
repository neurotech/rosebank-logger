'use strict';

var config = require('../config');
var r = require('rethinkdbdash')(config.rethinkdb);

module.exports = r;