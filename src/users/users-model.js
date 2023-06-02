const usersDao = require('./users-dao');
const { InvalidArgumentError } = require('../errors');
const validations = require('../common-validations');
const bcrypt = require('bcrypt');

class User {
  constructor(user) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
    this.passwordHash = user.passwordHash;

    this.validate();
  }

  async add() {
    if (await User.getByEmail(this.email)) {
      throw new InvalidArgumentError('The users already exists!');
    }

    return usersDao.add(this);
  }

  async addPassword(password){

    validations.stringFieldNotNull(password, 'password');
    validations.fieldMinimumSize(password, 'password', 8);
    validations.fieldMaximumSize(password, 'password', 64);

    this.passwordHash = await User.generatePasswordHash(password);
  }

  validate() {
    validations.stringFieldNotNull(this.name, 'name');
    validations.stringFieldNotNull(this.email, 'email');
  }

  
  async delete() {
    return usersDao.delete(this);
  }
  
  static async getById(id) {
    const user = await usersDao.getById(id);
    if (!user) {
      return null;
    }
    
    return new User(user);
  }
  
  static async getByEmail(email) {
    const user = await usersDao.getByEmail(email);
    if (!user) {
      return null;
    }
    
    return new User(user);
  }

  static getAll() {
    return usersDao.getAll();
  }

  static generatePasswordHash(password){
    const hashCost = 12;
    return bcrypt.hash(password, hashCost);
  }
}

module.exports = User;
