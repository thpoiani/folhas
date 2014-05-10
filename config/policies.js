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
    validate: true,
    create: true,
    auth: true
  },

  HomeController: {
    index: true
  },

  EnterController: {
    index: 'isNotAuthenticated'
  },

  ExitController: {
    index: 'isAuthenticated'
  },

  ///////////////////////////

  RememberController: {
    index: 'isNotAuthenticated',
    remember: 'isNotAuthenticated',
    recovery: 'isNotAuthenticated',
    update: 'isNotAuthenticated'
  },

  JoinController: {
    index: 'isNotAuthenticated',
    create: 'isNotAuthenticated',
    destroy: 'isAuthenticated'
  },

  DashboardController: {
    index: 'isAuthenticated',
    edit: 'isAuthenticated',
    update: 'isAuthenticated',
    change_password: 'isAuthenticated',
    destroy: 'isAuthenticated'
  },

  DocumentController: {
    index: true,
    create: true,
    destroy: 'isAuthenticated',
    connect: true,
    change: true
  }
}
