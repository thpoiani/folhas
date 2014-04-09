'use strict';

var Sails = require('sails')
  , request = require('supertest')
  , app;

before(function(done) {
  Sails.lift({
    log: {
      level: 'error'
    }
  }, function(err, sails) {
    app = sails;
    done(err, sails);
  });
});

describe('request', function(done) {
  describe('GET /', function(done) {
    it('should return 200', function (done) {
      request(app.express.app).get('/').expect(200, done);
    });
  });

  describe('GET /enter', function(done) {
    it('should return 200', function (done) {
      request(app.express.app).get('/enter').expect(200, done);
    });
  });

  describe('GET /login', function(done) {
    it('should return 200', function (done) {
      request(app.express.app).get('/login').expect(200, done);
    });
  });
  describe('GET /remember', function(done) {
    it('should return 200', function (done) {
      request(app.express.app).get('/remember').expect(200, done);
    });
  });

  describe('GET /exit', function(done) {
    it('should return 200', function (done) {
      request(app.express.app).get('/exit').expect(200, done);
    });
  });

  describe('GET /join', function(done) {
    it('should return 200', function (done) {
      request(app.express.app).get('/join').expect(200, done);
    });
  });

  describe('GET /destroy', function(done) {
    it('should return 200', function (done) {
      request(app.express.app).get('/destroy').expect(200, done);
    });
  });

  describe('GET /me', function(done) {
    it('should return 200', function (done) {
      request(app.express.app).get('/me').expect(200, done);
    });
  });

  describe('GET /:hash', function(done) {
    it('should return 200', function (done) {
      request(app.express.app).get('/276878392403546').expect(200, done);
    });
  });
});

after(function(done) {
  app.lower(done);
});
