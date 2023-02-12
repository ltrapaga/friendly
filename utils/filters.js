module.exports = {
    recentUserchat: (messages, user, sessionId, paramId) => {
      // filtering the recent user with the session ID
      var thisUser = user.filter((user) => user.id == sessionId);
      thisUser = thisUser[0];
  
      // filtering recent chat with parameter ID
      var recentChats = user.filter((user) => user.id == paramId);
      recentChats = recentChats[0];
      if (!paramId) {
        recentChats = null; 
      }
  
      // Filters for an array of most recent chat messages per chatter
      let arrayRecentChat = [];
      if (messages) {
        messages.forEach((message) => {
          user.forEach((user) => {
            if (
              (message.sender_id !== sessionId && user.id === message.sender_id) || (message.receiver_id !== sessionId && user.id === message.receiver_id)
            ) {
              if (!arrayRecentChat.includes(user)) {
                // Set latest message and push to array
                user.recent_message = message.text_messages;
                arrayRecentChat.push(user);
              }
            }
          });
        });
      }
  
      return { thisUser, recentChats, arrayRecentChat };
    }
  };