const router = require('express').Router();
const { Message, User } = require('../models');

router.get('/chat', async (req, res) => {
  try {
    const messageData = await Message.findAll({
      attributes: ['id', 'sender_id', 'recipient_id', 'text_message'],
    });
    // Get all projects and JOIN with user data
    const userData = await User.findAll({
      attributes: ['id', 'first_name', 'last_name'],
    });

    const messages = messageData.map((message) => message.get({ plain: true }));
    const users = userData.map((user) => user.get({ plain: true }));
    console.log(users);
    console.log(messages);

    res.render('chat', {
      users,
      messages,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
