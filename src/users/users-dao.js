const db = require('../../database');
const { InternalServerError } = require('../errors');

module.exports = {
  add: user => {
    return new Promise((resolve, reject) => {
      db.run(
        `
          INSERT INTO users (
            name,
            email,
            passwordHash
          ) VALUES (?, ?, ?)
        `,
        [user.name, user.email, user.passwordHash],
        error => {
          if (error) {
            reject(new InternalServerError('Error to add the user!'));
          }

          return resolve();
        }
      );
    });
  },

  getById: id => {
    return new Promise((resolve, reject) => {
      db.get(
        `
          SELECT *
          FROM users
          WHERE id = ?
        `,
        [id],
        (error, user) => {
          if (error) {
            return reject('Was not possible to find the user!');
          }

          return resolve(user);
        }
      );
    });
  },

  getByEmail: email => {
    return new Promise((resolve, reject) => {
      db.get(
        `
          SELECT *
          FROM users
          WHERE email = ?
        `,
        [email],
        (error, user) => {
          if (error) {
            return reject('Was not possible to find the user!');
          }

          return resolve(user);
        }
      );
    });
  },

  getAll: () => {
    return new Promise((resolve, reject) => {
      db.all(
        `
          SELECT * FROM users
        `,
        (error, users) => {
          if (error) {
            return reject('Error to list the users!');
          }
          return resolve(users);
        }
      );
    });
  },

  delete: user => {
    return new Promise((resolve, reject) => {
      db.run(
        `
          DELETE FROM users
          WHERE id = ?
        `,
        [user.id],
        error => {
          if (error) {
            return reject('Error to delete the user!');
          }
          return resolve();
        }
      );
    });
  }
};
