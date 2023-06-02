const usersController = require('./users-controller');
const passport = require('passport');

module.exports = app => {
  app
  .route('/user/login')
  .post(passport.authenticate('local', { session: false}),usersController.login);

  app
    .route('/user')
    .post(usersController.add)
    .get(usersController.getAll);

  app.route('/user/:id').delete(usersController.delete);
};
