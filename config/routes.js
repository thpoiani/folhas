/**
 * Routes
 *
 * Sails uses a number of different strategies to route requests.
 * Here they are top-to-bottom, in order of precedence.
 *
 * For more information on routes, check out:
 * http://sailsjs.org/#documentation
 */

module.exports.routes = {

  // User
  'post /user' : {
    controller: 'user',
    action: 'create'
  },

  'put /user/:email': {
    controller: 'user',
    action: 'update'
  },

  'delete /user/:email': {
    controller: 'user',
    action: 'destroy'
  },

  'post /user/auth' : {
    controller: 'user',
    action: 'auth'
  },

  'post /user/validate' : {
    controller: 'user',
    action: 'validate'
  },

  'post /user/remember/:email': {
    controller: 'user',
    action: 'remember'
  },

  'put /user/remember/:email': {
    controller: 'user',
    action: 'recovery'
  },

  // Home
  'get /': {
    controller: 'home',
    action: 'index'
  },

  // Join
  'get /join': {
    controller: 'join',
    action: 'index'
  },

  // Enter
  'get /enter': {
    controller: 'enter',
    action: 'index'
  },

  // Exit
  'get /exit': {
    controller: 'exit',
    action: 'index'
  },

  // Dashboard
  'get /dashboard': {
    controller: 'dashboard',
    action: 'index'
  },

  // Profile
  'get /profile': {
    controller: 'profile',
    action: 'index'
  },

  // Remember
  'get /remember': {
    controller: 'remember',
    action: 'index'
  },

  // Recovery
  'get /recovery/:unique_id': {
    controller: 'recovery',
    action: 'index'
  },

  // Document
  '/document/connect/:hash': {
    controller: 'document',
    action: 'connect'
  },

  'post /document': {
    controller: 'document',
    action: 'create'
  },

  'delete /document/:hash': {
    controller: 'document',
    action: 'destroy'
  },

  'put /document/:hash': {
    controller: 'document',
    action: 'change'
  },

  'get /document/:hash': {
    controller: 'document',
    action: 'show'
  },

  'get /:hash': {
    controller: 'document',
    action: 'index'
  }

}
