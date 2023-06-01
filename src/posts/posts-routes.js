const postsController = require('./posts-controller');

module.exports = app => {
  app
    .route('/post')
    .get(postsController.getAll)
    .post(postsController.add);
};
