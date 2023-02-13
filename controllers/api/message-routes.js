const router = require('express').Router();
const { User, Message } = require('../../models');
const { Op } = require('sequelize');
const { recentUserchat } = require('../../utils/filters');

// Get request to receive all messages once logged in
router.get('/', (req, res) => {
  // If not logged in, redirect to login page
  if (!req.session.loggedIn) {
    res.redirect('/login');
    return;
  }
  var sessionId = req.session.user_id;
  Message.findAll({
    where: {
      // If receiver id OR sender id = session id
      [Op.or]: [{ recipient_id: sessionId }, { sender_id: sessionId }]
    },
    attributes: ['id', 'text_messages', 'createdAt'],
    include: [
      {
        // Includes message sender
        model: User,
        as: 'sender',
        attributes: ['id', 'first_name', 'last_name']
      },
      {
        // Includes message receiver
        model: User,
        as: 'receiver',
        attributes: ['id', 'first_name', 'last_name']
      }
    ]
  })
    .then((dbMessageData) => res.json(dbMessageData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Get recent messages
router.get('/recent', (req, res) => {
  // If not logged in, redirect to login page
  if (!req.session.loggedIn) {
    res.redirect('/login');
    return;
  }
  var sessionId = req.session.user_id;
  Message.findAll({
    where: {
      // If receiver id OR sender id = session id
      [Op.or]: [{ recipient_id: sessionId }, { sender_id: sessionId }]
    },
    order: [['createdAt', 'DESC']]
  })
    .then((dbMessageData) => {
      // Find all users
      User.findAll({
        attributes: ['id', 'first_name', 'last_name']
      })
        .then((dbUserData) => {
          // Map users for plain javascript of data
          const user = dbUserData.map((user) => user.get({ plain: true }));

          // Map messages for plain javascript of data
          const messages = dbMessageData.map((message) =>
            message.get({ plain: true })
          );

          // Gets latest chat message for every conversation user has
          let recentUser = recentUserchat(messages, user, sessionId);

          res.json(recentUser.arrayRecentChat);
        })
        // Error catch for User.findAll
        .catch((err) => {
          console.log(err);
          res.status(500).json(err);
        });
    })
    // Error catch for Message.findAll
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Post new message
router.post('/', (req, res) => {
  // Creates new message with information sent from public/assets/message.js
  Message.create({
    sender_id: req.body.sender_id,
    recipient_id: req.body.recipient_id,
    text_messages: req.body.text_messages
  })
    .then((dbMessageData) => res.json(dbMessageData))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

module.exports = router;