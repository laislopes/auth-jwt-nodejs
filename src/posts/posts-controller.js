const Post = require('./posts-model');
const { InvalidArgumentError, InternalServerError } = require('../errors');

module.exports = {
  add: async (req, res) => {
    try {
      const post = new Post(req.body);
      await post.add();
      
      res.status(201).send(post);
    } catch (error) {
      if (error instanceof InvalidArgumentError) {
        res.status(422).json({ erro: error.message });
      } else if (error instanceof InternalServerError) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  },

  getAll: async (req, res) => {
    try {
      const posts = await Post.getAll();
      res.send(posts);
    } catch (error) {
      return res.status(500).json({ error: error });
    }
  }
};
