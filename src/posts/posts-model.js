const postsDao = require('./posts-dao');
const validations = require('../common-validations');

class Post {
  constructor(post) {
    this.title = post.title;
    this.content = post.content;
    this.validate();
  }

  add() {
    return postsDao.add(this);
  }

  validate() {
    validations.stringFieldNotNull(this.title, 'title');
    validations.fieldMinimumSize(this.title, 'title', 5);

    validations.stringFieldNotNull(this.content, 'content');
    validations.fieldMaximumSize(this.content, 'content', 140);
  }

  static getAll() {
    return postsDao.getAll();
  }
}

module.exports = Post;
