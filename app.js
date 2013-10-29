// module dependencies
var express = require('express');
var routes = require('./routes');
var http = require('http');
var dust = require('dustjs-linkedin');
var cons = require('consolidate');
var path = require('path');

// all environments
var app = express();
app.engine('dust', cons.dust);
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'dustjs-linkedin');
app.use(express.compress());
app.use(express.logger());
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public'), { maxAge: 1000*60*60*24*14 }));

// routes
app.post('/', routes.create);
app.get('/:hash', routes.fetch);

http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});
