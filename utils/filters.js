module.exports = {
  getrecentUserchat: (messages, user, sessionId, paramId) => {
    var thisUser = user.filter((user) => user.id == sessionId);
    thisUser = thisUser[0];

    var chatRightNow = user.filter((user) => user.id == paramId);
    chatRightNow = chatRightNow[0];
    if (!paramId) {
      chatRightNow = null;
    }

    let updatedChat = [];
    if (messages) {
      messages.forEach((message) => {
        user.forEach((user) => {
          if (
            (message.sender_id !== sessionId && user.id === message.sender_id) ||
            (message.recipient_id !== sessionId && user.id === message.recipient_id)
          ) {
            if (!updatedChat.includes(user)) {
              user.latest_message = message.text_messages;
              updatedChat.push(user);
            }
          }
        });
      });
    }

    return { thisUser, chatRightNow, updatedChat };
  }
};