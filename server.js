var express = require('express')
  , app = express()
  , server = require('http').createServer(app);

app.use(app.router);

app.get('/', function(req, res){
    res.send('home');
});

app.get('/signup', function(req, res){
    res.send('signup');
});

app.get('/login', function(req, res){
    res.send('login');
});

app.get('/me', function(req, res){
    res.send('me');
});

app.get('/api', function(req, res){
    res.send('api');
});

server.listen(3000, function(){
    console.log('Server running at localhost:3000');
});

module.exports = app;