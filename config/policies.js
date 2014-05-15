/**
 * Policy mappings (ACL)
 *
 * Policies are simply Express middleware functions which run **before** your controllers.
 * You can apply one or more policies to a given controller, or protect just one of its actions.
 *
 * Any policy file (e.g. `authenticated.js`) can be dropped into the `/policies` folder,
 * at which point it can be accessed below by its filename, minus the extension, (e.g. `authenticated`)
 *
 * For more information on policies, check out:
 * http://sailsjs.org/#documentation
 */


module.exports.policies = {

  '*': false,

  UserController: {
    create: true,
    update: true,
    destroy: true,
    auth: true,
    validate: true,
    remember: true,
    recovery: true
  },

  HomeController: {
    index: true
  },

  JoinController: {
    index: 'isNotAuthenticated'
  },

  EnterController: {
    index: 'isNotAuthenticated',
    facebook: 'isNotAuthenticated'
  },

  ExitController: {
    index: 'isAuthenticated'
  },

  DashboardController: {
    index: 'isAuthenticated',
  },

  ProfileController: {
    index: 'isAuthenticated',
  },

  RememberController: {
    index: 'isNotAuthenticated'
  },

  RecoveryController: {
    index: 'isNotAuthenticated'
  },

  DocumentController: {
    index: true,
    create: true,
    destroy: 'isAuthenticated',
    connect: true,
    change: true
  }
}
