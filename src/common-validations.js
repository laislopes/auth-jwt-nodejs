const { InvalidArgumentError } = require('./errors');


module.exports = {
  stringFieldNotNull: (value, name) => {
    if (typeof value !== 'string' || value === 0)
      throw new InvalidArgumentError(`It's necessary fill the field ${name}!`);
  },

  fieldMinimumSize: (value, name, minimum) => {
    if (value.length < minimum)
      throw new InvalidArgumentError(
        `The field ${name} needs to be bigger than ${minimum} caracters!`
      );
  },

  fieldMaximumSize: (value, name, maximum) => {
    if (value.length > maximum)
      throw new InvalidArgumentError(
        `The field ${name} needs to be less than ${maximum} caracters!`
      );
  }
};
