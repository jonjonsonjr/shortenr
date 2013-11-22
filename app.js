// module dependencies
var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');

// all environments
var app = express();
app.set('port', process.env.PORT || 3000);
app.use(express.logger());
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.static('public'));
app.use(app.router);

// routes
app.post('/', routes.create);
app.get('/:hash', routes.fetch);

http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});
