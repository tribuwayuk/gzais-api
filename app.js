/**
 * Module dependencies.
 */

var express = require('express'),
    mongoose = require('mongoose'),
    routes = require('./routes'),
    user = require('./routes/user'),
    item = require('./routes/item'),
    http = require('http'),
    path = require('path');

mongoose.connect('mongodb://localhost/ams');

var app = express();
module.exports = app;

app.configure(function() {
    app.set('port', process.env.PORT || 3000);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.cookieParser('your secret here'));
    app.use(express.session());
    app.use(app.router);
    app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function() {
    app.use(express.errorHandler());
});

app.get('/', routes.index);
app.get('/users', user.ulist);
app.post('/users/add', user.uadd);

app.get('/items', item.ilist);
app.get('/items/:id', item.iview);
app.post('/items/add', item.iadd);
app.put('/items/:id', item.iedit);
app.delete('/items/:id', item.idelete);

http.createServer(app).listen(app.get('port'), function() {
    console.log("Express server listening on port " + app.get('port'));
});
