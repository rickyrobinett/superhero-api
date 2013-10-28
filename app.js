
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');

var app = express();
var heroes = [ { id : 0, name : 'Spider-Man' }, { id : 1, name : 'Nightcrawler' }, { id : 2, name : 'Wonder Woman' } ]; 

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/heroes', function( req, res ) {
  res.json( heroes );
});
app.get('/heroes/:id', function( req, res ) {
  res.json( heroes[ req.params.id ] );
});
app.post('/heroes', function( req, res ) {
  heroes.push( { id : heroes.length, name : req.body.name } );
  res.send(200);
});
app.put('/heroes/:id', function( req, res ) {
  heroes[ req.params.id ] = { id : req.params.id, name : req.body.name };
  res.send(200);
});
app.del('/heroes/:id', function( req, res ) {
  delete heroes[ req.params.id ];
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
