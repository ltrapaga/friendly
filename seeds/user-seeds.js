const { User } = require('../models');

const userData = [
  {
    first_name: 'Sam',
    last_name: 'Smith',
    email: 'samsmith@email.com',
    password: 'password1',
    bio: 'I listen to all kinds of music every day',
    gender: 'non-binary',
    pronouns: 'they/them',
  },
  {
    first_name: 'Laura',
    last_name: 'Lee',
    email: 'lauralee@email.com',
    password: 'password1',
    bio: 'I have over 50 plants',
    gender: 'female',
    pronouns: 'she/her',
  },
  {
    first_name: 'Frankie',
    last_name: 'Gray',
    email: 'frankie@email.com',
    password: 'password1',
    bio: 'I love hiking and travelling',
    gender: 'male',
    pronouns: 'he/they',
  },
];

const seedUsers = () => User.bulkCreate(userData, { individualHooks: true });

module.exports = seedUsers;
