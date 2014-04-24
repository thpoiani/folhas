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

  describe('POST /enter', function(done) {
    it('should return 200', function (done) {
      var param = {
        user : {
          email: 'test@test.com',
          password: 'test'
        }
      };

      request(app.express.app).post('/enter').send(param).expect(200, done);
    });
  });

  describe('GET /remember', function(done) {
    it('should return 200', function (done) {
      request(app.express.app).get('/remember').expect(200, done);
    });
  });

  describe('POST /remember', function(done) {
    it('should return 200', function (done) {
      var param = {
        user : {
          email: 'test@test.com'
        }
      };

      request(app.express.app).post('/remember').send(param).expect(200, done);
    });
  });

  describe('GET /recovery/:unique_id', function(done) {
    it('should return 200', function (done) {
      request(app.express.app).get('/recovery/test').expect(200, done);
    });
  });

  describe('POST /recovery/:unique_id', function(done) {
    it('should return 200', function (done) {
      var param = {
        user : {
          password: 'test'
        }
      };

      request(app.express.app).post('/recovery/test').send(param).expect(200, done);
    });
  });

  describe('GET /join', function(done) {
    it('should return 200', function (done) {
      request(app.express.app).get('/join').expect(200, done);
    });
  });

  describe('POST /join', function(done) {
    it('should return 200', function (done) {
      var param = {
        user : {
          name: 'test',
          email: 'test@test.com',
          password: 'test'
        }
      };

      request(app.express.app).post('/login').send(param).expect(200, done);
    });
  });

  describe('GET /exit', function(done) {
    describe('not authenticated', function(done) {
      it('should return 302', function (done) {
        request(app.express.app).get('/exit').expect(302, done);
      });
    })

    describe('authenticated', function(done) {
      it('should return 200', function (done) {
        var param = {
          user : {
            email: 'test@test.com',
            password: 'test'
          }
        };

        request(app.express.app).post('/enter').send(param).end(function(err, res){
          request(app.express.app).get('/exit').expect(200, done);
        });
      });
    })
  });

  describe('GET /me', function(done) {
    describe('not authenticated', function(done) {
      it('should return 302', function (done) {
        request(app.express.app).get('/me').expect(302, done);
      });
    });

    // TODO
    describe('authenticated', function(done) {
      it('should return 200', function (done) {
        request(app.express.app).get('/me').expect(200, done);
      });
    });
  });

  describe('PUT /me', function(done) {
    describe('not authenticated', function(done) {
      it('should return 302', function (done) {
        request(app.express.app).put('/me').expect(302, done);
      });
    });

    // TODO
    describe('authenticated', function(done) {
      it('should return 200', function (done) {
        request(app.express.app).put('/me').expect(200, done);
      });
    });
  });

  describe('DELETE /me', function(done) {
    describe('not authenticated', function(done) {
      it('should return 302', function (done) {
        request(app.express.app).del('/me').expect(302, done);
      });
    });

    // TODO
    describe('authenticated', function(done) {
      it('should return 200', function (done) {
        request(app.express.app).del('/me').expect(200, done);
      });
    });
  });

  describe('GET /me/edit', function(done) {
    describe('not authenticated', function(done) {
      it('should return 302', function (done) {
        request(app.express.app).get('/me/edit').expect(302, done);
      });
    });

    // TODO
    describe('authenticated', function(done) {
      it('should return 200', function (done) {
        request(app.express.app).get('/me/edit').expect(200, done);
      });
    });
  });

  describe('PUT /me/change_password', function(done) {
    describe('not authenticated', function(done) {
      it('should return 302', function (done) {
        request(app.express.app).put('/me/change_password').expect(302, done);
      });
    });

    // TODO
    describe('authenticated', function(done) {
      it('should return 200', function (done) {
        request(app.express.app).put('/me/change_password').expect(200, done);
      });
    });
  });

  describe('GET /:hash', function(done) {
    it('should return 200', function (done) {
      request(app.express.app).get('/test').expect(200, done);
    });
  });

});

after(function(done) {
  app.lower(done);
});
