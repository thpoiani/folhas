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

  describe('GET /document', function(done) {
    it('should return 200', function (done) {
      request(app.express.app).get('/document').expect(200, done);
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
