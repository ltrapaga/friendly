const { User } = require('../models');

const userData = [
  {
    first_name: 'sam',
    last_name: 'smith',
  },
  {
    first_name: 'lady',
    last_name: 'gaga',
  },
];

const seedUsers = () => User.bulkCreate(userData, { individualHooks: true });

module.exports = seedUsers;
