#!/usr/bin/env node
var debug = require('debug')('lottery-analyses');
var app = require('../app');

app.set('port', process.env.PORT || 9001);

var server = app.listen(app.get('port'), function() {
  debug('Express server listening on port ' + server.address().port);
});
