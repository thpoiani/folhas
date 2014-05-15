'use strict';

var Sails = require('sails')
  , request = require('supertest')
  , app
  , user;

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

    done();
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

});

describe('request', function(done) {

  describe('GET /', function(done) {
    it('should return 200', function (done) {
      request(app.express.app).get('/').expect(200, done);
    });
  });

  describe('GET /join', function(done) {
    describe('not authenticated', function(done) {
      it('should return 200', function (done) {
        request(app.express.app).get('/join').expect(200, done);
      });
    });

    describe('authenticated', function(done) {
      // TODO
    });
  });

  describe('GET /enter', function(done) {
    describe('not authenticated', function(done) {
      it('should return 200', function (done) {
        request(app.express.app).get('/enter').expect(200, done);
      });
    });

    describe('authenticated', function(done) {
      // TODO
    });
  });

  describe('GET /exit', function(done) {
    describe('not authenticated', function(done) {
      it('should return 302', function (done) {
        request(app.express.app).get('/exit').expect(302, done);
      });
    });

    describe('authenticated', function(done) {
      // TODO
    });
  });

  describe('GET /dashboard', function(done) {
    describe('not authenticated', function(done) {
      it('should return 302', function (done) {
        request(app.express.app).get('/dashboard').expect(302, done);
      });
    });

    describe('authenticated', function(done) {
      // TODO
    });
  });

  describe('GET /profile', function(done) {
    describe('not authenticated', function(done) {
      it('should return 302', function (done) {
        request(app.express.app).get('/profile').expect(302, done);
      });
    });

    describe('authenticated', function(done) {
      // TODO
    });
  });

  describe('GET /remember', function(done) {
    describe('not authenticated', function(done) {
      it('should return 200', function (done) {
        request(app.express.app).get('/remember').expect(200, done);
      });
    });

    describe('authenticated', function(done) {
      // TODO
    });
  });

  // describe('POST /enter', function(done) {
  //   it('should return 200', function (done) {
  //     var param = {
  //       user : {
  //         email: 'test@test.com',
  //         password: 'test'
  //       }
  //     };

  //     request(app.express.app).post('/enter').send(param).expect(200, done);
  //   });
  // });

  // describe('GET /remember', function(done) {
  //   it('should return 200', function (done) {
  //     request(app.express.app).get('/remember').expect(200, done);
  //   });
  // });

  // describe('POST /remember', function(done) {
  //   it('should return 200', function (done) {
  //     var param = {
  //       user : {
  //         email: 'test@test.com'
  //       }
  //     };

  //     request(app.express.app).post('/remember').send(param).expect(200, done);
  //   });
  // });

  // describe('GET /recovery/:unique_id', function(done) {
  //   it('should return 200', function (done) {
  //     request(app.express.app).get('/recovery/test').expect(200, done);
  //   });
  // });

  // describe('POST /recovery/:unique_id', function(done) {
  //   it('should return 200', function (done) {
  //     var param = {
  //       user : {
  //         password: 'test'
  //       }
  //     };

  //     request(app.express.app).post('/recovery/test').send(param).expect(200, done);
  //   });
  // });

  

  // describe('POST /join', function(done) {
  //   it('should return 200', function (done) {
  //     var param = {
  //       user : {
  //         name: 'test',
  //         email: 'test@test.com',
  //         password: 'test'
  //       }
  //     };

  //     // TODO
  //     request(app.express.app).post('/join').send(param).expect(200, done);
  //   });
  // });

  // describe('GET /exit', function(done) {
  //   describe('not authenticated', function(done) {
  //     it('should return 302', function (done) {
  //       request(app.express.app).get('/exit').expect(302, done);
  //     });
  //   })

  //   describe('authenticated', function(done) {
  //     it('should return 200', function (done) {
  //       var param = {
  //         user : {
  //           email: 'test@test.com',
  //           password: 'test'
  //         }
  //       };

  //       request(app.express.app).post('/enter').send(param).end(function(err, res){
  //         request(app.express.app).get('/exit').expect(200, done);
  //       });
  //     });
  //   })
  // });

  // describe('GET /me', function(done) {
  //   describe('not authenticated', function(done) {
  //     it('should return 302', function (done) {
  //       request(app.express.app).get('/me').expect(302, done);
  //     });
  //   });

  //   // TODO
  //   describe('authenticated', function(done) {
  //     it('should return 200', function (done) {
  //       request(app.express.app).get('/me').expect(200, done);
  //     });
  //   });
  // });

  // describe('PUT /me', function(done) {
  //   describe('not authenticated', function(done) {
  //     it('should return 302', function (done) {
  //       request(app.express.app).put('/me').expect(302, done);
  //     });
  //   });

  //   // TODO
  //   describe('authenticated', function(done) {
  //     it('should return 200', function (done) {
  //       request(app.express.app).put('/me').expect(200, done);
  //     });
  //   });
  // });

  // describe('DELETE /me', function(done) {
  //   describe('not authenticated', function(done) {
  //     it('should return 302', function (done) {
  //       request(app.express.app).del('/me').expect(302, done);
  //     });
  //   });

  //   // TODO
  //   describe('authenticated', function(done) {
  //     it('should return 200', function (done) {
  //       request(app.express.app).del('/me').expect(200, done);
  //     });
  //   });
  // });

  // describe('GET /me/edit', function(done) {
  //   describe('not authenticated', function(done) {
  //     it('should return 302', function (done) {
  //       request(app.express.app).get('/me/edit').expect(302, done);
  //     });
  //   });

  //   // TODO
  //   describe('authenticated', function(done) {
  //     it('should return 200', function (done) {
  //       request(app.express.app).get('/me/edit').expect(200, done);
  //     });
  //   });
  // });

  // describe('PUT /me/change_password', function(done) {
  //   describe('not authenticated', function(done) {
  //     it('should return 302', function (done) {
  //       request(app.express.app).put('/me/change_password').expect(302, done);
  //     });
  //   });

  //   // TODO
  //   describe('authenticated', function(done) {
  //     it('should return 200', function (done) {
  //       request(app.express.app).put('/me/change_password').expect(200, done);
  //     });
  //   });
  // });

  // describe('GET /:hash', function(done) {
  //   it('should return 200', function (done) {
  //     request(app.express.app).get('/test').expect(200, done);
  //   });
  // });

});

after(function(done) {
  app.lower(done);
});
