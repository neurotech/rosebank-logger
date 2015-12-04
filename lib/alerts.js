'use strict';

var config = require('../config');
var r = require('./db');

var prettyjson = require('prettyjson');
var mailgun = require('mailgun-js')({
  apiKey: config.mailgun.key,
  domain: config.mailgun.domain
});

var _sendAlert = function (item) {
  mailgun.messages().send({
    from: 'Rosebank Logger <tdouglas@rosebank.nsw.edu.au>',
    to: config.mailgun.to,
    subject: '[' + config.rethinkdb.db + '] Event reported by application: ' + item.name,
    html: '<strong>Testing HTML</strong> ' + item.name + ' has reported an error at ' + item.time + '. The error object is as follows: <br><br><code>' + prettyjson.render(item, {noColor: true}) + '</code>'
    // text: item.name + ' has reported an error at ' + item.time + '. The error object is as follows: \n\n' + prettyjson.render(item, {noColor: true})
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
