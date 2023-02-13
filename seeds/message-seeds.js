const { Message } = require('../models');

const messageData = [{
        sender_id: 1,
        recipient_id: 2,
        text_messages: 'Hi, how are you?'
    },
    {
        sender_id: 2,
        recipient_id: 1,
        text_messages: 'Hi there - good, how about you? What kind of music do you like?'
    },
    {
        sender_id: 1,
        recipient_id: 2,
        text_messages: 'I love basically everything, been listening to jazz a lot today. What about you?'
    },
    {
        sender_id: 2,
        recipient_id: 1,
        text_messages: 'Nice, I like jazz and hip hop a lot!'
    },
    {
        sender_id: 2,
        recipient_id: 3,
        text_messages: 'Hi, what is your favorite food?'
    },
    {
        sender_id: 3,
        recipient_id: 2,
        text_messages: 'Hi! I love Thai food. What about you?'
    },
    {
        sender_id: 2,
        recipient_id: 3,
        text_messages: 'Ooh I love Thai but my favorite is Italian'
    }
];

const seedMessages = () => Message.bulkCreate(messageData);

module.exports = seedMessages;