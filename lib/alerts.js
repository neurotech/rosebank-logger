'use strict';

var config = require('../config');
var r = require('./db');

var jade = require('jade');
var moment = require('moment');
var path = require('path');

var mailgun = require('mailgun-js')({
  apiKey: config.mailgun.key,
  domain: config.mailgun.domain
});

var alertTemplate = path.join(__dirname + '/' + 'alerts.jade');

var _sendAlert = function (item) {
  var locals = {
    reported_date: moment(item.time).format('dddd, MMMM Do YYYY'),
    reported_time: moment(item.time).format('h:mm:ss a'),
    item: item,
    styles: {
      event_header: 'color: #c0392b',
      info: 'font-size: 1.2em;',
      pre: 'display: inline-block; padding: 10px; font-size: 1.5em; background: #e74c3c; border: 2px solid #c0392b; color: #ffffff;'
    }
  };
  mailgun.messages().send({
    from: 'Rosebank Logger <tdouglas@rosebank.nsw.edu.au>',
    to: config.mailgun.to,
    subject: '[' + config.rethinkdb.db + '] Event reported by application: ' + item.name,
    html: jade.renderFile(alertTemplate, locals)
  },
  function (error, body) {
    if (error) {
      console.error(error);
    } else {
      console.log('Mailgun send complete via ' + body.id + '\nMessage: ' + body.message);
    }
  });
};

// Watch error and fatal tables and send alert
r.db('rosebank_logger')
  .table('error')
  .union(r.db('rosebank_logger').table('fatal'))
  .changes()
  .then(function (feed) {
    feed.each(
      function (err, record) {
        if (err) {
          console.error(err);
        } else {
          _sendAlert(record.new_val);
        }
      }
    );
  })
  .error(function (err) {
    console.error(err);
    throw err;
  });
