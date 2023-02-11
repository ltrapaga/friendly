const { Message } = require('../models');

const messageData = [
  {
    sender_id: 1,
    recipient_id: 2,
    text_message: 'Hi, how are you?',
  },
  {
    sender_id: 2,
    recipient_id: 1,
    text_message:
      'Hi there - good, how about you? What kind of music do you like?',
  },
];

const seedMessages = () => Message.bulkCreate(messageData);

module.exports = seedMessages;
