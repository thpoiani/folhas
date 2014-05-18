'use strict';

var Sails = require('sails')
  , request = require('supertest')
  , app
  , user
  , document;

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

describe('Waterline models tests', function(done) {

  before(function(done) {
    user = {
      name: "user",
      email: "user@folhas.com",
      password: "password"
    };

    document = {
      author: user.email,
      hash: 'ABCDEFGH'
    };

    User.destroy({email: user.email}, function() {
      Document.destroy({author: user.email}, function() {
        done();
      });
    });
  });

  describe('User model', function(done) {

    it('should create a User record', function(done) {
      User.create(user).done(function(err, model) {
        if (err) throw err;
        done();
      });
    });

    it('should find Users', function(done) {
      User.find().done(function(err, models) {
        if (err) throw err;
        done();
      });
    });

    it('should find User by Email', function(done) {
      User.findByEmail(user.email).done(function(err, model) {
        if (err) throw err;
        model[0].should.have.property('email', user.email);
        done();
      });
    });

    it('should update a User\'s name', function(done) {
      User.findOne({email: user.email}).done(function(err, model) {
        if (err) throw err;

        var name = 'Poiani';
        model.name = name;

        model.save(function(err){
          if (err) throw err;
          model.name.should.be.exactly(name);
          done();
        });
      });
    });

    it('should remove a User', function(done) {
      User.destroy({email: user.email}).done(function(err, user) {
        if (err) throw err;
        done();
      });
    });

  });

  describe('Document model', function(done) {

    it('should create a Document record', function(done) {
      Document.create(document).done(function(err, model) {
        if (err) throw err;
        done();
      });
    });

    it('should find Documents', function(done) {
      Document.find().done(function(err, models) {
        if (err) throw err;
        done();
      });
    });

    it('should find Document by Author', function(done) {
      Document.findByAuthor(user.email).done(function(err, model) {
        if (err) throw err;
        model[0].should.have.property('author', user.email);
        done();
      });
    });

    it('should update a Document\'s title', function(done) {
      Document.findOne({author: user.email}).done(function(err, model) {
        if (err) throw err;

        var title = 'Title';
        model.title = title;

        model.save(function(err){
          if (err) throw err;
          model.title.should.be.exactly(title);
          done();
        });
      });
    });

    it('should remove a Document', function(done) {
      Document.destroy({author: user.email}).done(function(err, user) {
        if (err) throw err;
        done();
      });
    });

  });

});

describe('Requests', function(done) {

  before(function(done) {
    user = {
      name: "user",
      email: "user@folhas.com",
      password: "password"
    };

    User.destroy({email: user.email}, function(err, model) {
      User.create(user, function(err, model) {
        done();
      });
    });
  });

  describe('GET /', function(done) {
    it('should return 200', function (done) {
      request(app.express.app)
        .get('/')
        .expect(200, done);
    });
  });

  describe('GET /enter', function(done) {
    it('should return 200 if user isn\'t authenticated', function (done) {
      request(app.express.app)
        .get('/enter')
        .expect(200, done);
    });

    it('should return 302 if user is authenticated', function (done) {
      request(app.express.app)
        .post('/user/auth')
        .send({user: {email: user.email, password: "password"}})
        .expect(200, function(err, res) {
          if (err) done(err);

          // req.body === {}

          request(app.express.app)
            .get('/enter')
            .expect(302, done);
      });
    });
  });
/*
  describe('GET /join', function(done) {
    it('should return 200 if user isn\'t authenticated', function (done) {
      request(app.express.app)
        .get('/join')
        .expect(200, done);
    });

    it('should return 302 if user is authenticated', function (done) {
      throw new Error('Must be implemented');
        // request(app.express.app).get('/join').expect(302, done);
    });
  });

  describe('GET /exit', function(done) {
    it('should return 302 if user isn\'t authenticated', function (done) {
      request(app.express.app)
        .get('/exit')
        .expect(302, done);
    });

    it('should return 200 if user is authenticated', function (done) {
      throw new Error('Must be implemented');
      // request(app.express.app).get('/exit').expect(200, done);
    });
  });

  describe('GET /dashboard', function(done) {
    it('should return 302 if user isn\'t authenticated', function (done) {
      request(app.express.app)
        .get('/dashboard')
        .expect(302, done);
    });

    it('should return 200 if user is authenticated', function (done) {
      throw new Error('Must be implemented');
      // request(app.express.app).get('/dashboard').expect(200, done);
    });
  });

  describe('GET /profile', function(done) {
    it('should return 302 if user isn\'t authenticated', function (done) {
      request(app.express.app)
        .get('/profile')
        .expect(302, done);
    });

    it('should return 200 if user is authenticated', function (done) {
      throw new Error('Must be implemented');
      // request(app.express.app).get('/profile').expect(200, done);
    });
  });

  describe('GET /remember', function(done) {
    it('should return 302 if user isn\'t authenticated', function (done) {
      request(app.express.app)
        .get('/remember')
        .expect(200, done);
    });

    it('should return 200 if user is authenticated', function (done) {
      throw new Error('Must be implemented');
      // request(app.express.app).get('/remember').expect(200, done);
    });
  });
*/
});

after(function(done) {
  app.lower(done);
});
