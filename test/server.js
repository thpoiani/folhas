var server = require('../server')
  , request = require('supertest')
  , should = require('should');

describe('Server', function(){
    it('should return "home" in GET /', function(done){
        request(server).get('/').end(function(err, res) {
            res.text.should.eql('home');
            done();
        })
    });

    it('should return "signup" in GET /signup', function(done){
        request(server).get('/signup').end(function(err, res) {
            res.text.should.eql('signup');
            done();
        })
    });

    it('should return "login" in GET /login', function(done){
        request(server).get('/login').end(function(err, res) {
            res.text.should.eql('login');
            done();
        })
    });

    it('should return "me" in GET /me', function(done){
        request(server).get('/me').end(function(err, res) {
            res.text.should.eql('me');
            done();
        })
    });

    it('should return "api" in GET /api', function(done){
        request(server).get('/api').end(function(err, res) {
            res.text.should.eql('api');
            done();
        })
    });
});

